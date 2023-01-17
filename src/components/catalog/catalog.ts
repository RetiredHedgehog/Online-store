import Cart from 'classes/Cart';
import createFilters from './filters/filter';
import createMiniContainer from './miniContainer/miniContainer';
import createSearchButtons from './searchButtons/searchButtons';
import createUtilityButtons from './utilityButtons/utilityButtons';

import productItem from 'interfaces/productsItem';

import resetActive from './resetActive';
import createItem from './miniContainer/item/item';

function createCatalog(cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main');

  const wrapperCatalog = document.createElement('div');
  wrapperCatalog.classList.add('main_container');

  wrapperCatalog.append(
    createUtilityButtons(),
    createSearchButtons(),
    createMiniContainer(cart)
  );

  wrapper.append(createFilters(cart), wrapperCatalog);

  return wrapper;
}

export default function catalog(cart: Cart) {
  document.getElementsByClassName('main')[0].replaceWith(createCatalog(cart));

  const currentURL = new URL(location.href);

  const products: productItem[] = cart.productsFetched;

  let newItemsArray: HTMLElement[] = [];
  let filterBrand = currentURL.searchParams.getAll('brand');
  let filterCategory = currentURL.searchParams.getAll('category');
  const inpTextFilter = currentURL.searchParams.get('inpText');

  type objType = {
    [key: string]: number;
  };
  let obj: objType;
  let objCategory: objType;
  const inpSearchArray = [];
  let inpArrSearch: string[] = [];
  let arrPrice: number[] = [];
  let arrStock: number[] = [];
  const itemBrandArray: string[] = [];
  const itemsArray: productItem[] = [];

  function renderInputsBrand(array: productItem[]) {
    const navContainerItemMain = document.getElementById(
      'nav-container__main-brand'
    );
    navContainerItemMain!.innerHTML = '';

    array.map((item: productItem) => {
      item.name = 1;

      if (itemBrandArray.indexOf(item.brand.toLowerCase()) == -1) {
        itemBrandArray.push(item.brand.toLowerCase());
        itemsArray.push(item);
      } else {
        itemsArray[itemBrandArray.indexOf(item.brand.toLowerCase())].name!++;
      }
    });

    newProd(products, newItemsArray);
    itemBrandArrayGenerator(obj);
  }

  function renderInputsCategory(array: productItem[]) {
    const navContainerItemMainCategory = document.getElementById(
      'nav-container__main-category'
    );

    navContainerItemMainCategory!.innerHTML = '';
    const itemCategoryArray: string[] = [];

    array.map((item: productItem) => {
      if (itemCategoryArray.indexOf(item.category) == -1) {
        itemCategoryArray.push(item.category);
      }
    });

    newProd(products, newItemsArray);
    itemCategoryArrayGenerator(objCategory);
  }

  function renderItems(array: productItem[] = []) {
    const mainContainerMini = document.getElementById('main_container_mini');

    mainContainerMini!.replaceChildren(
      ...array.map((item: productItem) => createItem(item))
    );

    const mainContainerItemArray = Array.from(
      document.getElementsByClassName('main_container_item')
    ) as HTMLElement[];
    mainContainerItemArray.forEach((item) => {
      newItemsArray.push(item);
    });

    filterBrandfunc(products);
  }

  // === SLIDERS ===
  inputRangeArrayfuncStart(products);
  inputRangeArrayStockfuncStart(products);

  renderItems(products);

  renderInputsBrand(products);
  renderInputsCategory(products);
  textInp();
  filterRenderSearch();

  (function filterRenderSearchRowCol() {
    const url = new URL(location.href);

    const flexDirection = url.searchParams.get('flexDirection') || 'row';
    const mainContainerMini = document.getElementById('main_container_mini');

    mainContainerMini!.classList.remove('main_container_mini-column');
    mainContainerMini!.classList.remove('main_container_mini-row');

    mainContainerMini!.classList.add(`main_container_mini-${flexDirection}`);

    document.getElementById(flexDirection)!.classList.add('active');
  })();

  (function renderRowColumn() {
    const mainContainerMini = document.getElementById('main_container_mini');
    const url = new URL(location.href);

    const direction = url.searchParams.get('flexDirection');

    mainContainerMini!.classList.remove('main_container_mini-row');
    mainContainerMini!.classList.remove('main_container_mini-column');

    mainContainerMini!.classList.add(`main_container_mini-${direction}`);
  })();

  (function resetButton() {
    const resetFilt = document.getElementById('resetFilt');

    resetFilt!.addEventListener('click', () => {
      filterBrand = [];
      filterCategory = [];
      arrPrice = [];
      arrStock = [];
      inpArrSearch = [];

      renderItems(products);
      filterBrandfunc(products);
    });
  })();

  function sliderAddListeners(
    className: 'Price' | 'Stock',
    gap = 10,
    cart: Cart
  ) {
    const arrayInputs = Array.from(
      document.getElementsByClassName(`inputs${className}`)
    ) as HTMLInputElement[];

    arrayInputs.forEach((input, index, array) => {
      const inputMin = document.getElementById(
        `inputMin${className}`
      ) as HTMLInputElement;
      const inputMax = document.getElementById(
        `inputMax${className}`
      ) as HTMLInputElement;
      const progress = document.getElementById(
        `progress${className}`
      ) as HTMLElement;

      input.addEventListener('input', (event: Event) => {
        const min = parseInt(array[0].value);
        const max = parseInt(array[1].value);

        inputMin.value = min.toString();
        inputMax.value = max.toString();

        if (max - min < gap) {
          if (
            (<HTMLElement>event.target).matches(`.range-min.inputs${className}`)
          ) {
            const value = (max - gap).toString();

            array[0].value = value;
            inputMin.value = value;
          } else {
            const value = (min + gap).toString();

            array[1].value = value;
            inputMax.value = value;
          }
        } else {
          progress.style.left = `${(min / parseInt(array[0].max)) * 100}%`;
          progress.style.right = `${
            100 - (max / parseInt(array[1].max)) * 100
          }%`;
          progress.style.width = `${Math.abs(
            parseFloat(progress.style.left) -
              (100 - parseFloat(progress.style.right))
          )}%`;
        }
      });

      input.addEventListener('change', () => {
        currentURL.searchParams.delete('price');
        currentURL.searchParams.append('price', inputMin.value);
        currentURL.searchParams.append('price', inputMax.value);
        window.history.replaceState(null, '', currentURL);

        className === 'Price'
          ? inputRangeArrayfunc(cart.productsFetched)
          : inputRangeStockArrayfunc(cart.productsFetched);

        filterBrandfunc(cart.productsFetched);
      });
    });
  }

  function inputRangeArrayfunc(array: productItem[]) {
    arrPrice = [];

    const inputMin = document.getElementById(
      'inputMinPrice'
    ) as HTMLInputElement;
    const inputMax = document.getElementById(
      'inputMaxPrice'
    ) as HTMLInputElement;

    array.map((item: productItem) => {
      if (item.price <= +inputMax.value && item.price >= +inputMin.value) {
        arrPrice.push(item.price);
      }
    });
    arrPrice.sort((a: number, b: number) => (a > b ? 1 : -1));
  }

  function inputRangeStockArrayfunc(array: productItem[]) {
    arrStock = [];
    array.map((item: productItem) => {
      if (
        item.stock <= +inputMaxStock.value &&
        item.stock >= +inputMinStock.value
      ) {
        arrStock.push(item.stock);
      }
    });
    arrStock.sort((a: number, b: number) => (a > b ? 1 : -1));
  }

  sliderAddListeners('Price', 100, cart);
  sliderAddListeners('Stock', 10, cart);

  const rangeInputPrice = Array.from(
    document.getElementsByClassName(`inputsPrice`)
  ) as HTMLInputElement[];

  RangeWidth(arrPrice);
  RangeWidthStock(arrStock);

  function RangeWidth(arrPrice: number[]) {
    const url = new URL(location.href);
    const price = url.searchParams.getAll('price');

    const progress = document.getElementById('progressPrice');

    if (!progress) {
      return;
    }

    if (price.length !== 0) {
      progress.style.left = (+price[0] / +rangeInputPrice[0].max) * 100 + '%';
      progress.style.right = (+price[1] / 1749) * 100 + '%';
      progress.style.width = (+price[1] - +price[0]) / 17.49 + '%';
    } else {
      progress.style.left = (arrPrice[0] / +rangeInputPrice[0].max) * 100 + '%';
      progress.style.right = (arrPrice[arrPrice.length - 1] / 1749) * 100 + '%';
      progress.style.width =
        (arrPrice[arrPrice.length - 1] - arrPrice[0]) / 17.49 + '%';
    }
  }

  function RangeWidthStock(arrPrice: number[]) {
    const url = new URL(location.href);
    const stock = url.searchParams.getAll('stock');

    const progressStock = document.getElementById('progressStock');

    if (!progressStock) {
      return;
    }

    if (stock.length !== 0) {
      progressStock.style.left = (+stock[0] / 150) * 100 + '%';
      progressStock.style.right = (1 - +stock[1] / 150) * 100 + '%';
      progressStock.style.width = (+stock[1] - +stock[0]) / 1.5 + '%';
    } else {
      progressStock.style.left = (arrPrice[0] / 150) * 100 + '%';
      progressStock.style.right =
        (1 - arrPrice[arrPrice.length - 1] / 150) * 100 + '%';
      progressStock.style.width =
        (arrPrice[arrPrice.length - 1] - arrPrice[0]) / 1.5 + '%';
    }
  }

  let inpSearchText: string;
  const inpSearch = document.getElementById('search') as HTMLInputElement;

  inpSearch.oninput = function () {
    inpArrSearch = [];
    inpSearchText = inpSearch.value;
    inpSearchText = inpSearchText.toLowerCase();

    currentURL.searchParams.delete('inpText');
    currentURL.searchParams.append('inpText', inpSearchText);

    window.history.replaceState(null, '', currentURL);

    search(inpSearchText, products);
    searchFilter();
  };

  function search(text: string, arr: productItem[]) {
    arr.map((item) => {
      if (
        item.brand.toLowerCase().indexOf(text) > -1 ||
        item.category.toLowerCase().indexOf(text) > -1 ||
        item.title.toLowerCase().indexOf(text) > -1 ||
        item.price.toString().indexOf(text) > -1 ||
        item.stock.toString().indexOf(text) > -1
      ) {
        inpArrSearch.push(item.title.toLowerCase());
        inpSearchArray.push(item);
      }
    });
  }

  function inputRangeArrayfuncStart(array: productItem[]) {
    array.map((item) => {
      arrPrice.push(item.price);
    });
    arrPrice.sort((a: number, b: number) => (a > b ? 1 : -1));
  }

  function inputRangeArrayStockfuncStart(array: productItem[]) {
    array.map((item) => {
      arrStock.push(item.stock);
    });
    arrStock.sort((a: number, b: number) => (a > b ? 1 : -1));
  }

  const inputMinStock = document.getElementById(
    'inputMinStock'
  ) as HTMLInputElement;
  const inputMaxStock = document.getElementById(
    'inputMaxStock'
  ) as HTMLInputElement;

  const arrInputBrand = Array.from(
    document.getElementsByClassName('inputBrand')
  ) as HTMLInputElement[];

  arrInputBrand.map((item: HTMLInputElement) =>
    item.addEventListener('click', () => {
      if (item.checked === true) {
        filterBrand.push(item.defaultValue.toLowerCase());
      } else {
        filterBrand.splice(filterBrand.indexOf(item.defaultValue), 1);

        if (filterBrand.length === 0) {
          renderItems(products);
        }
      }

      currentURL.searchParams.delete('brand');

      for (const brand of filterBrand) {
        currentURL.searchParams.append('brand', brand);
      }

      window.history.replaceState(null, '', currentURL);

      filterBrandfunc(products);

      currentURL.searchParams.delete('stock');
      currentURL.searchParams.append('stock', inputMinStock.value);
      currentURL.searchParams.append('stock', inputMaxStock.value);
      window.history.replaceState(null, '', currentURL);
    })
  );

  const arrCategory = Array.from(
    document.getElementsByClassName('inputCategory')
  ) as HTMLInputElement[];

  arrCategory.map((item) =>
    item.addEventListener('click', () => {
      if (item.checked === true) {
        filterCategory.push(item.defaultValue);
      } else {
        filterCategory.splice(filterCategory.indexOf(item.defaultValue), 1);

        if (filterCategory.length === 0) {
          renderItems(products);
        }
      }

      currentURL.searchParams.delete('category');

      for (const category of filterCategory) {
        currentURL.searchParams.append('category', category);
      }

      window.history.replaceState(null, '', currentURL);

      filterBrandfunc(products);
    })
  );

  function filterBrandfunc(array: object[]) {
    newItemsArray = [];

    const mainContainerItemArray = Array.from(
      document.getElementsByClassName('main_container_item')
    ) as HTMLElement[];

    mainContainerItemArray.forEach((item) => {
      const arr = item.attributes[1].nodeValue!.split(';');

      if (
        (filterBrand.indexOf(arr[0]) > -1 || filterBrand.length === 0) &&
        (filterCategory.indexOf(arr[1]) > -1 || filterCategory.length === 0) &&
        (arrPrice.indexOf(+arr[2]) > -1 || arrPrice.length === 0) &&
        (arrStock.indexOf(+arr[3]) > -1 || arrStock.length === 0) &&
        (inpArrSearch.indexOf(arr[4]) > -1 || inpArrSearch.length === 0)
      ) {
        newItemsArray.push(item);
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });

    newProd(products, newItemsArray);
  }

  function searchFilter() {
    newItemsArray = [];

    const mainContainerItemArray = Array.from(
      document.getElementsByClassName('main_container_item')
    ) as HTMLElement[];

    mainContainerItemArray.forEach((item) => {
      item.style.display = 'none';

      const arr = item.attributes[1].nodeValue!.split(';');

      inpArrSearch.forEach((item1) => {
        if (item1.toLowerCase() == arr[4].toLowerCase()) {
          item.style.display = '';
          newItemsArray.push(item);
        }
      });
    });

    newProd(products, newItemsArray);
  }

  function newProd(arr: productItem[], arr2: HTMLElement[]) {
    obj = {};
    objCategory = {};

    arr.forEach((item) => {
      const key = item.brand.toLowerCase();
      const keyCat = item.category.toLowerCase();

      obj[key] = obj[key] || 0;
      objCategory[keyCat] = objCategory[keyCat] || 0;

      arr2.forEach((item2) => {
        const value = item2.attributes[1].value.split(';');

        if (item.title.toLowerCase() === value[4].toLowerCase()) {
          obj[key] += 1;
          objCategory[keyCat] += 1;
        }
      });
    });

    console.log(obj, objCategory);
    const found = document.getElementById('found');

    if (found) {
      found.innerHTML = `Found : ${newItemsArray.length}`;
    }

    inputBrandCurrentValueInnerHTML(obj);
    inputCategoryCurrentValueInnerHTML(objCategory);
    inputNumberCurrentValueGenerator(newItemsArray);
    inputNumberCurrentStockValueGenerator(newItemsArray);
  }

  function amount(key: string) {
    type objType = {
      [key: string]: number;
    };

    const obj: objType = {};

    products.forEach((item: productItem) => {
      obj[`${item[key as keyof productItem]}`.toLowerCase()] =
        obj[`${item[key as keyof productItem]}`.toLowerCase()] + 1 || 1;
    });

    return obj;
  }

  function itemBrandArrayGenerator(obj: objType) {
    const url = new URL(location.href);
    const brand = url.searchParams.getAll('brand');
    const navContainerItemMain = document.getElementById(
      'nav-container__main-brand'
    );

    navContainerItemMain!.innerHTML = '';

    const amountBrand = amount('brand');

    for (const k in obj) {
      navContainerItemMain!.innerHTML += `
      <div class='inputCheckbox'>
        <input class='inputBrand inputCheckbox__checkbox' type='checkbox' name=''  value='${k}' ${
        brand.includes(k) ? 'checked' : ''
      }>
        <label  for='inputBrand'>
          ${k}
          <label class='inputBrandCurrentValue'>
            ${obj[k as keyof productItem]}
          </label>
          /${amountBrand[k]}
        </label>
      </div>`;
    }

    inputBrandCurrentValueInnerHTML(obj);
  }

  function itemCategoryArrayGenerator(obj: objType) {
    console.log(obj);
    const url = new URL(location.href);
    const categories = url.searchParams.getAll('category');

    const navContainerItemMainCategory = document.getElementById(
      'nav-container__main-category'
    );

    const amountCategory = amount('category');

    for (const k in obj) {
      navContainerItemMainCategory!.innerHTML += `
        <div class='inputCheckbox'>
          <input  class='inputCategory inputCheckbox__checkbox' type='checkbox' name='Category'  value='${k}' ${
        categories.includes(k) ? 'checked' : ''
      }>
          <label for='inputCategory'>
            ${k}
            <label class='inputCategoryCurrentValue'>
              ${obj[k as keyof productItem]}
            </label>
            /${amountCategory[k]}
          </label>
        </div>`;
    }

    inputCategoryCurrentValueInnerHTML(objCategory);
  }

  function inputBrandCurrentValueInnerHTML(obj: objType) {
    const inputBrandCurrentValue = Array.from(
      document.getElementsByClassName('inputBrandCurrentValue')
    );

    for (const k in obj) {
      inputBrandCurrentValue.map((item) => {
        const val = item.parentNode!.parentNode!
          .childNodes[1] as HTMLInputElement;

        if (val.value === k) {
          item.innerHTML = `${obj[k as keyof productItem]}`;
        }
      });
    }
  }

  function inputCategoryCurrentValueInnerHTML(obj: objType) {
    const inputCategoryCurrentValue = Array.from(
      document.getElementsByClassName('inputCategoryCurrentValue')
    );

    for (const k in obj) {
      inputCategoryCurrentValue.map((item) => {
        const val = item.parentNode!.parentNode!
          .childNodes[1] as HTMLInputElement;

        if (val.value === k) {
          item.innerHTML = `${obj[k as keyof productItem]}`;
        }
      });
    }
  }

  function inputNumberCurrentValueGenerator(arr: HTMLElement[]) {
    const priceArr: number[] = arr.map(
      (item) => +item.attributes[1].value.split(';')[2]
    );

    priceArr.sort((a: number, b: number) => (a > b ? 1 : -1));

    const inputMin = document.getElementById(
      'inputMinPrice'
    ) as HTMLInputElement;
    const inputMax = document.getElementById(
      'inputMaxPrice'
    ) as HTMLInputElement;
    const inputRangeMin = document.getElementById(
      'inputRangeMinPrice'
    ) as HTMLInputElement;
    const inputRangeMax = document.getElementById(
      'inputRangeMaxPrice'
    ) as HTMLInputElement;

    inputMin.value = `${priceArr[0]}`;
    inputMax.value = `${priceArr[priceArr.length - 1]}`;
    inputRangeMin.value = `${priceArr[0]}`;
    inputRangeMax.value = `${priceArr[priceArr.length - 1]}`;

    currentURL.searchParams.delete('price');
    currentURL.searchParams.append('price', inputMin.value);
    currentURL.searchParams.append('price', inputMax.value);

    window.history.replaceState(null, '', currentURL);

    const url = new URL(location.href);
    const price = url.searchParams.getAll('price');

    const progress = document.getElementById('progressPrice');

    if (!progress) {
      return;
    }

    if (price.length !== 0) {
      progress.style.left = (+price[0] / 1749) * 100 + '%';
      progress.style.right = (1 - +price[1] / 1749) * 100 + '%';
      progress.style.width = (+price[1] - +price[0]) / 17.49 + '%';
    } else {
      progress.style.left = (priceArr[0] / 1749) * 100 + '%';
      progress.style.right =
        (1 - priceArr[priceArr.length - 1] / 1749) * 100 + '%';
      progress.style.width =
        (priceArr[priceArr.length - 1] - priceArr[0]) / 17.49 + '%';
    }
  }

  function inputNumberCurrentStockValueGenerator(arr: HTMLElement[]) {
    const priceArr: number[] = arr.map(
      (item) => +item.attributes[1].value.split(';')[3]
    );

    priceArr.sort((a: number, b: number) => (a > b ? 1 : -1));

    const inputMinStock = document.getElementById(
      'inputMinStock'
    ) as HTMLInputElement;
    const inputMaxStock = document.getElementById(
      'inputMaxStock'
    ) as HTMLInputElement;
    const inputsRangeStockmin = document.getElementById(
      'inputRangeMinStock'
    ) as HTMLInputElement;
    const inputsRangeStockmax = document.getElementById(
      'inputRangeMaxStock'
    ) as HTMLInputElement;

    inputMinStock.value = `${priceArr[0]}`;
    inputMaxStock.value = `${priceArr[priceArr.length - 1]}`;
    inputsRangeStockmin.value = `${priceArr[0]}`;
    inputsRangeStockmax.value = `${priceArr[priceArr.length - 1]}`;

    currentURL.searchParams.delete('stock');
    currentURL.searchParams.append('stock', inputMinStock.value);
    currentURL.searchParams.append('stock', inputMaxStock.value);

    window.history.replaceState(null, '', currentURL);

    const url = new URL(location.href);
    const stock = url.searchParams.getAll('stock');

    const progressStock = document.getElementById('progressStock');

    if (!progressStock) {
      return;
    }

    if (stock.length !== 0) {
      progressStock.style.left = (+stock[0] / 150) * 100 + '%';
      progressStock.style.right = (1 - +stock[1] / 150) * 100 + '%';
      progressStock.style.width = (+stock[1] - +stock[0]) / 1.5 + '%';
    } else {
      progressStock.style.left = (priceArr[0] / 150) * 100 + '%';
      progressStock.style.right =
        (1 - priceArr[priceArr.length - 1] / 150) * 100 + '%';
      progressStock.style.width =
        (priceArr[priceArr.length - 1] - priceArr[0]) / 1.5 + '%';
    }
  }

  function mainContainerItemArraySort(
    arr: HTMLElement[],
    index: number,
    type: 'number' | 'string',
    reverse = false
  ) {
    const split = (element: HTMLElement) => element.dataset.value!.split(';');

    arr.sort((a: HTMLElement, b: HTMLElement) => {
      let answer = 0;

      type === 'number'
        ? (answer = +split(a)[index] > +split(b)[index] ? -1 : 1)
        : (answer = split(a)[index] > split(b)[index] ? -1 : 1);

      return reverse ? 0 - answer : answer;
    });
  }

  function filterSearchPrice(): void {
    const arrayRend: productItem[] = [];
    const mainContainerItemArray = Array.from(
      document.getElementsByClassName('main_container_item')
    ) as HTMLElement[];

    mainContainerItemArraySort(mainContainerItemArray, 2, 'number');

    mainContainerItemArray.forEach((item2) =>
      products.forEach((item) => {
        const value = item2.attributes[1].value.split(';');

        if (item.title.toLowerCase() === value[4].toLowerCase()) {
          arrayRend.push(item);
        }
      })
    );

    resetActive();

    document.getElementById('price')!.classList.toggle('active');

    currentURL.searchParams.delete('priceSort');
    currentURL.searchParams.append('priceSort', 'up');

    window.history.replaceState(null, '', currentURL);

    renderItems(arrayRend);
    filterBrandfunc(products);
  }

  document
    .getElementById('price')!
    .addEventListener('click', filterSearchPrice);

  function filterSearchPriceDown(): void {
    const arrayRend: productItem[] = [];

    const mainContainerItemArray = Array.from(
      document.getElementsByClassName('main_container_item')
    ) as HTMLElement[];
    mainContainerItemArraySort(mainContainerItemArray, 2, 'number', true);

    mainContainerItemArray.forEach((item2) =>
      products.forEach((item) => {
        const value = item2.attributes[1].value.split(';');

        if (item.title.toLowerCase() === value[4].toLowerCase()) {
          arrayRend.push(item);
        }
      })
    );

    resetActive();

    document.getElementById('priceDown')!.classList.toggle('active');

    currentURL.searchParams.delete('priceSort');
    currentURL.searchParams.delete('brandSort');
    currentURL.searchParams.delete('stockSort');
    currentURL.searchParams.append('priceSort', 'down');

    window.history.replaceState(null, '', currentURL);

    renderItems(arrayRend);
    filterBrandfunc(products);
  }

  document
    .getElementById('priceDown')!
    .addEventListener('click', filterSearchPriceDown);

  function filterSearchStock(): void {
    const arrayRend: productItem[] = [];

    const mainContainerItemArray = Array.from(
      document.getElementsByClassName('main_container_item')
    ) as HTMLElement[];
    mainContainerItemArraySort(mainContainerItemArray, 3, 'number');

    mainContainerItemArray.forEach((item2) =>
      products.forEach((item) => {
        const value = item2.attributes[1].value.split(';');

        if (item.title.toLowerCase() === value[4].toLowerCase()) {
          arrayRend.push(item);
        }
      })
    );

    resetActive();

    document.getElementById('stock')!.classList.toggle('active');

    currentURL.searchParams.delete('priceSort');
    currentURL.searchParams.delete('brandSort');
    currentURL.searchParams.delete('stockSort');
    currentURL.searchParams.append('stockSort', 'up');

    window.history.replaceState(null, '', currentURL);

    renderItems(arrayRend);
    filterBrandfunc(products);
  }

  document
    .getElementById('stock')!
    .addEventListener('click', filterSearchStock);

  function filterSearchBrand(): void {
    const arrayRend: productItem[] = [];

    const mainContainerItemArray = Array.from(
      document.getElementsByClassName('main_container_item')
    ) as HTMLElement[];
    mainContainerItemArraySort(mainContainerItemArray, 0, 'string', true);

    mainContainerItemArray.forEach((item2) =>
      products.forEach((item) => {
        const value = item2.attributes[1].value.split(';');
        if (item.title.toLowerCase() === value[4].toLowerCase()) {
          arrayRend.push(item);
        }
      })
    );

    resetActive();

    document.getElementById('brand')!.classList.toggle('active');

    currentURL.searchParams.delete('priceSort');
    currentURL.searchParams.delete('brandSort');
    currentURL.searchParams.delete('stockSort');
    currentURL.searchParams.append('brandSort', 'up');

    window.history.replaceState(null, '', currentURL);

    renderItems(arrayRend);
    filterBrandfunc(products);
  }

  document
    .getElementById('brand')!
    .addEventListener('click', filterSearchBrand);

  function filterRenderSearch() {
    const url = new URL(location.href);

    const priceSort = url.searchParams.get('priceSort');
    const stock = url.searchParams.get('stockSort');
    const brand = url.searchParams.get('brandSort');

    if (priceSort === 'up') {
      filterSearchPrice();
    } else if (priceSort === 'down') {
      filterSearchPriceDown();
    }

    if (stock === 'up') {
      filterSearchStock();
    }

    if (brand === 'up') {
      filterSearchBrand();
    }
  }

  function textInp() {
    if (inpTextFilter) {
      search(inpTextFilter, products);
      searchFilter();
    }

    filterBrandfunc(products);
  }
}
