import productItem from "interfaces/productsItem";
const json = require('./products.json');
const products: productItem[] = json.products;

import Cart from "classes/Cart";
import createProduct from './components/product/product';
import createHeader from './components/header/header';
import createCart from "./components/cart/cart";
import createCatalog from "./components/catalog/catalog";
import './styles/Main.css';
import resetActive from "./components/catalog/resetActive";
import createItem from "./components/catalog/miniContainer/item/item";

;(async () => {
  const cart = new Cart();
  await cart.fetchItems();
  cart.moveFromStorageToCart();

  const currentURL = new URL(location.href);
  currentURL.pathname = '/';

  // === HEADER ===
  document.getElementsByTagName('body')[0].prepend(createHeader(cart));

  // === ROUTER ===
  const routes = {
    'cart': createCart,
    'products': createProduct,
    '': catalog,
  };

  function changeRoute(routes: object) {
    const hash = (new URL(location.href)).hash.slice(2);

    const route = Object.entries(routes).find(([key, value]) => {
      console.log(hash,key,hash.includes(key))
      if (hash.match(new RegExp(key))) {
        return value;
      }

      return false;
    });

    if (route) {
      document.getElementsByClassName('main')[0].replaceChildren(route[1](cart));

      return;
    }
  }

  window.addEventListener('popstate', function() {
    changeRoute(routes);
  });

  window.addEventListener('hashchange', function() {
    changeRoute(routes);
  });

  changeRoute(routes);

  function catalog() {
    document.getElementsByClassName('main')[0].replaceWith(createCatalog(cart));

    let newItemsArray: any = [];
    let filterBrand: any = currentURL.searchParams.getAll('brand');
    let filterCategory: any = currentURL.searchParams.getAll('category');
    const inpTextFilter: any = currentURL.searchParams.get('inpText')

    let obj: any = {};
    let objCategory: any = {};
    let inpSearchArray: any = []
    let inpArrSearch: any = [];
    let input: any;
    let arr: any;
    let inputCategory: any;
    let arrCategory: any;
    let arrPrice: any = [];
    let arrStock: any = [];
    let mainContainerItem:any
    let mainContainerItemArray: any
    const itemBrandArray: any = [];
    const itemsArray: any = [];

    function renderInputsBrand(array : any[]) {
      const navContainerItemMain = document.getElementById('nav-container__main-brand');
      navContainerItemMain.innerHTML = '';

      array.map((item: any) => {
        item.name = 1;

        if(itemBrandArray.indexOf(item.brand.toLowerCase()) == -1){
          itemBrandArray.push(item.brand.toLowerCase());
          itemsArray.push(item);
        } else {
          itemsArray[itemBrandArray.indexOf(item.brand.toLowerCase())].name++;
        }
      });

      newProd(products, newItemsArray);
      itemBrandArrayGenerator(obj);

      input = document.getElementsByClassName('inputBrand');

      arr = Array.from(input);
    }

    function renderInputsCategory(array : object[]) {
      const navContainerItemMainCategory = document.getElementById('nav-container__main-category');

      navContainerItemMainCategory.innerHTML = '';
      const itemCategoryArray: any = [];

      array.map((item: any) => {
        if(itemCategoryArray.indexOf(item.category) == -1) {
          itemCategoryArray.push(item.category);
        }
      })

      newProd(products, newItemsArray);
      itemCategoryArrayGenerator(objCategory);

      inputCategory = document.getElementsByClassName('inputCategory');
      arrCategory = Array.from(inputCategory);
    }

    function renderItems(array : productItem[] = []) {
      const mainContainerMini = document.getElementById('main_container_mini');

      mainContainerMini.replaceChildren(
        ...array.map((item: productItem) => createItem(item))
      );

      mainContainerItem = document.getElementsByClassName('main_container_item');
      mainContainerItemArray = Array.from(mainContainerItem);
      mainContainerItemArray.map((item: any) => {
        newItemsArray.push(item);
      })

      filterBrandfunc(products);
    }

    // === SLIDERS ===
    inputRangeArrayfuncStart(products);
    inputRangeArrayStockfuncStart(products);

    const inputsRangeStockmin: any = document.getElementById('inputRangeMinStock');
    const inputsRangeStockmax: any = document.getElementById('inputRangeMaxStock');
    const inputRangeMin: any = document.getElementById('inputRangeMinPrice');
    const inputRangeMax: any = document.getElementById('inputRangeMaxPrice');
    const inputMin: any = document.getElementById('inputMinPrice');
    const inputMax: any = document.getElementById('inputMaxPrice');
    const inputMinStock: any = document.getElementById('inputMinStock');
    const inputMaxStock: any = document.getElementById('inputMaxStock');
    const progress = document.getElementById('progressPrice');
    const progressStock = document.getElementById('progressStock');

    renderItems(products);

    renderInputsBrand(products);
    renderInputsCategory(products);
    textInp();
    filterRenderSearch();

    ;(function filterRenderSearchRowCol() {
      const url = new URL(location.href)

      const flexDirection = url.searchParams.get('flexDirection') || 'row';
      const mainContainerMini = document.getElementById('main_container_mini');

      mainContainerMini.classList.remove('main_container_mini-column');
      mainContainerMini.classList.remove('main_container_mini-row');
    
      mainContainerMini.classList.add(`main_container_mini-${flexDirection}`);

      document.getElementById(flexDirection).classList.add('active');
    })();

    ;(function renderRowColumn() {
      const mainContainerMini = document.getElementById('main_container_mini');
      const url = new URL(location.href);

      const direction = url.searchParams.get('flexDirection');

      mainContainerMini.classList.remove('main_container_mini-row');
      mainContainerMini.classList.remove('main_container_mini-column');

      mainContainerMini.classList.add(`main_container_mini-${direction}`);
    })();

    ;(function resetButton() { 
      const resetFilt = document.getElementById('resetFilt');

      resetFilt.addEventListener('click', () => {

        filterBrand = [];
        filterCategory = [];
        arrPrice = [];
        arrStock = [];
        inpArrSearch = [];

        renderItems(products);
        filterBrandfunc(products);
      });
    })();

    function sliderAddListeners(className: 'Price' | 'Stock', gap: number = 10, cart: Cart) {
      const arrayInputs = Array.from(document.getElementsByClassName(`inputs${className}`)) as HTMLInputElement[];

      arrayInputs.forEach((input, index, array) => {
        const inputMin = document.getElementById(`inputMin${className}`) as HTMLInputElement;
        const inputMax = document.getElementById(`inputMax${className}`) as HTMLInputElement;
        const progress = document.getElementById(`progress${className}`) as HTMLElement;

        input.addEventListener('input', (event: Event) => {
          const min = parseInt(array[0].value);
          const max = parseInt(array[1].value);

          inputMin.value = min.toString();
          inputMax.value = max.toString();

          if(max - min < gap) {
            if ((<HTMLElement>event.target).matches(`.range-min.inputs${className}`)) {
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
            progress.style.right = `${100 - (max / parseInt(array[1].max)) * 100}%`;
            progress.style.width =`${Math.abs(parseFloat(progress.style.left) - (100 - parseFloat(progress.style.right)))}%`;
          }
        });

        input.addEventListener('change', (event: Event) => {
          currentURL.searchParams.delete('price');
          currentURL.searchParams.append('price' , inputMin.value);
          currentURL.searchParams.append('price' , inputMax.value);
          window.history.replaceState(null, null, currentURL);

          (className === 'Price')
            ? inputRangeArrayfunc(cart.productsFetched)
            : inputRangeStockArrayfunc(cart.productsFetched);

          filterBrandfunc(cart.productsFetched);
        });
      });
    }

    function inputRangeArrayfunc(array: any) {
      arrPrice = [];
      array.map((item: any) => {
        if(item.price <= +inputMax.value && item.price >= +inputMin.value){
          arrPrice.push(item.price);
        }
      })
      arrPrice.sort((a: number, b: number) => (a > b) ? 1 : -1);
    }

    function inputRangeStockArrayfunc(array: any) {
      arrStock = [];
      array.map((item: any) => {
        if(item.stock <= +inputMaxStock.value && item.stock >= +inputMinStock.value){
          arrStock.push(item.stock);
        }
      })
      arrStock.sort((a: number, b: number) => (a > b) ? 1 : -1);
    }

    sliderAddListeners('Price', 100, cart);
    sliderAddListeners('Stock', 10, cart);

    const rangeInputPrice = Array.from(document.getElementsByClassName(`inputsPrice`)) as HTMLInputElement[];

    RangeWidth(arrPrice);
    RangeWidthStock(arrStock);

    function RangeWidth(arrPrice: any) {
      const url = new URL(location.href);
      const price = url.searchParams.getAll('price');

      if (price.length !== 0) {
        progress.style.left =(+price[0] / +rangeInputPrice[0].max) * 100 + '%';
        progress.style.right =(+price[1] / 1749) * 100 + '%' ;
        progress.style.width =(+price[1] - +price[0]) / 17.49 + '%';
      } else {
        progress.style.left = (arrPrice[0] / +rangeInputPrice[0].max) * 100 + '%';
        progress.style.right =(arrPrice[arrPrice.length - 1] / 1749) * 100 + '%';
        progress.style.width =(arrPrice[arrPrice.length - 1] - arrPrice[0])/ 17.49 + '%';
      }
    }

    function RangeWidthStock(arrPrice: any) {
      const url = new URL(location.href)
      const stock = url.searchParams.getAll('stock');

      if (stock.length !== 0) {
        progressStock.style.left =(+stock[0] / 150) * 100 + '%';
        progressStock.style.right =(1 - (+stock[1] / 150)) * 100 + '%';
        progressStock.style.width = (+stock[1] - +stock[0]) / 1.5 + '%';
      } else {
        progressStock.style.left =(arrPrice[0] / 150) * 100 + '%';
        progressStock.style.right =(1 - (arrPrice[arrPrice.length - 1] / 150)) * 100 + '%';
        progressStock.style.width =(arrPrice[arrPrice.length - 1] - arrPrice[0])/ 1.5 + '%';
      }
    }

    let inpSearchText: string;
    const inpSearch: any  = document.getElementById('search');

    inpSearch.oninput = function() {
      inpArrSearch = [];
      inpSearchText = inpSearch.value;
      inpSearchText = inpSearchText.toLowerCase();

      currentURL.searchParams.delete('inpText');
      currentURL.searchParams.append('inpText', inpSearchText);

      window.history.replaceState(null, null, currentURL);

      search(inpSearchText,products);
      searchFilter();
    };

    function search(text: string, arr: any) {
      arr.map((item: any) => {
        if (
          item.brand.toLowerCase().indexOf(text) > -1
          || item.category.toLowerCase().indexOf(text) > -1
          || item.title.toLowerCase().indexOf(text) > -1
          || item.price.toString().indexOf(text) > -1
          || item.stock.toString().indexOf(text) > -1
        ) {
          inpArrSearch.push(item.title.toLowerCase());
          inpSearchArray.push(item);
        }
      });
    }

    function inputRangeArrayfuncStart(array: any) {
      array.map((item: any) => {
        arrPrice.push(item.price);
      })
      arrPrice.sort((a: number, b: number) => (a > b) ? 1 : -1);
    }

    function inputRangeArrayStockfuncStart(array: any) {
      array.map((item: any) => {
        arrStock.push(item.stock);
      })
      arrStock.sort((a: number, b: number) => (a > b) ? 1 : -1);
    }

    arr.map((item: any) => 
      item.addEventListener('click', () => {
        if (item.checked === true){
          filterBrand.push(item.defaultValue.toLowerCase());
        } else {
          filterBrand.splice(filterBrand.indexOf(item.defaultValue), 1);

          if(filterBrand.length === 0) {
            renderItems(products);
          }
        }

        currentURL.searchParams.delete('brand');

        for (const brand of filterBrand) {
          currentURL.searchParams.append('brand' , brand);
        }

        window.history.replaceState(null, null, currentURL);

        filterBrandfunc(products);

        currentURL.searchParams.delete('stock');
        currentURL.searchParams.append('stock' , inputMinStock.value);
        currentURL.searchParams.append('stock' , inputMaxStock.value);
        window.history.replaceState(null, null, currentURL);
      })
    );

    arrCategory.map((item: any) => 
      item.addEventListener('click', () => {
        if (item.checked === true){
          filterCategory.push(item.defaultValue);
        } else {
          filterCategory.splice(filterCategory.indexOf(item.defaultValue), 1);

          if (filterCategory.length === 0) {
            renderItems(products);
          }
        }

        currentURL.searchParams.delete('category');

        for (const category of filterCategory) {
          currentURL.searchParams.append('category' , category);
        }

        window.history.replaceState(null, null, currentURL);

        filterBrandfunc(products);
      })
    );

    function filterBrandfunc(array : object[])  {
      newItemsArray = [];

      mainContainerItemArray.forEach((item: any) => {
        let arr = item.attributes[1].nodeValue.split(';');

        if (
          (filterBrand.indexOf(arr[0]) > -1 || filterBrand.length === 0)
          && (filterCategory.indexOf(arr[1]) > -1 || filterCategory.length === 0)
          && (arrPrice.indexOf(+arr[2]) > -1 || arrPrice.length === 0)
          && (arrStock.indexOf(+arr[3]) > -1 || arrStock.length === 0)
          && (inpArrSearch.indexOf(arr[4]) > -1 || inpArrSearch.length ===0)
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

      mainContainerItemArray.forEach((item: any) => {
        item.style.display = 'none';

        const arr = item.attributes[1].nodeValue.split(';');

        inpArrSearch.forEach((item1: any) => {
          if (item1.toLowerCase() == arr[4].toLowerCase()) {
            item.style.display = '';
            newItemsArray.push(item);
          }
        });
      });

      newProd(products, newItemsArray);
    }


    function newProd (arr: any , arr2: any) {
      obj = {};
      objCategory = {};

      arr.map((item: any) => {
        let key = item.brand.toLowerCase();
        let keyCat = item.category.toLowerCase();

        obj[key] = obj[key] || 0;
        objCategory[keyCat] = objCategory[keyCat] || 0;

        arr2.map((item2: any) => {
          let value = item2.attributes[1].value.split(';');

          if (item.title.toLowerCase() === value[4].toLowerCase()) {
            obj[key] += 1;
            objCategory[keyCat] += 1;
          }
        });
      });

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
        [key: string]: number
      }

      const obj: objType = {};

      products.forEach((item: any) => {
        obj[item[key].toLowerCase()] = obj[item[key].toLowerCase()] + 1 || 1;
      });

      return obj;
    }

    function itemBrandArrayGenerator(obj: any) {
      const url = new URL(location.href);
      const brand = url.searchParams.getAll('brand');
      const navContainerItemMain = document.getElementById('nav-container__main-brand');

      navContainerItemMain.innerHTML = '';

      const amountBrand = amount('brand');

      for (const k in obj) {
        navContainerItemMain.innerHTML += `
        <div class="inputCheckbox">
          <input class="inputBrand inputCheckbox__checkbox" type="checkbox" name=""  value="${k}" ${brand.includes(k) ? 'checked' : ''}>
          <label  for="inputBrand">
            ${k}
            <label class="inputBrandCurrentValue">
              ${obj[k]}
            </label>
            /${amountBrand[k]}
          </label>
        </div>`;
      }

      inputBrandCurrentValueInnerHTML(obj);
    }

    function itemCategoryArrayGenerator(obj: any) {
        const url = new URL(location.href)
        const categories = url.searchParams.getAll('category');

        const navContainerItemMainCategory = document.getElementById('nav-container__main-category');

        const amountCategory = amount('category');

        for(const k in obj) {
          navContainerItemMainCategory.innerHTML += `
          <div class="inputCheckbox">
            <input  class="inputCategory inputCheckbox__checkbox" type="checkbox" name="Category"  value="${k}" ${categories.includes(k) ? 'checked' : ''}>
            <label for="inputCategory">
              ${k}
              <label class="inputCategoryCurrentValue">
                ${obj[k]}
              </label>
              /${amountCategory[k]}
            </label>
          </div>`;
        }

        inputCategoryCurrentValueInnerHTML(objCategory);
    }

    function inputBrandCurrentValueInnerHTML(obj: any,) {
      let inputBrandCurrentValue: any = document.getElementsByClassName('inputBrandCurrentValue');

      inputBrandCurrentValue = Array.from(inputBrandCurrentValue);

      for (const k in obj) {
        inputBrandCurrentValue.map((item: any) => {
          let val = item.parentNode.parentNode.childNodes[1];

          if (val.value === k) {
            item.innerHTML = obj[k];
          }
        });
      }
    }

    function inputCategoryCurrentValueInnerHTML(obj: any) {
      let inputCategoryCurrentValue: any = document.getElementsByClassName('inputCategoryCurrentValue');

      inputCategoryCurrentValue = Array.from(inputCategoryCurrentValue);

      for (const k in obj) {
        inputCategoryCurrentValue.map((item: any) => {
          let val = item.parentNode.parentNode.childNodes[1];

          if (val.value === k) {
            item.innerHTML = obj[k];
          }
        });
      }
    }

    function inputNumberCurrentValueGenerator(arr: any) {
      let priceArr: any = [];

      arr.map((item: any) => {
        let value = item.attributes[1].value.split(';');

        priceArr.push(+value[2]);
      });

      priceArr.sort((a: number ,b: number ) => a > b ? 1 : -1);

      inputMin.value = priceArr[0];
      inputMax.value = priceArr[priceArr.length - 1];
      inputRangeMin.value = priceArr[0];;
      inputRangeMax.value = priceArr[priceArr.length - 1];

      currentURL.searchParams.delete('price');
      currentURL.searchParams.append('price' , inputMin.value);
      currentURL.searchParams.append('price' , inputMax.value);

      window.history.replaceState(null, null, currentURL);

      const url = new URL(location.href)
      const price = url.searchParams.getAll('price');

      if ( price.length !== 0) {
        progress.style.left =(+price[0] / 1749) * 100 + '%';
        progress.style.right =(1 - (+price[1] / 1749)) * 100 + '%' ;
        progress.style.width =(+price[1] - +price[0]) / 17.49 + '%';
      } else {
        progress.style.left = (priceArr[0] / 1749) * 100 + '%';
        progress.style.right =(1 - (priceArr[priceArr.length - 1] / 1749)) * 100 + '%';
        progress.style.width =(priceArr[priceArr.length - 1] - priceArr[0])/ 17.49 + '%';
      }
    }

    function inputNumberCurrentStockValueGenerator(arr: any) {
      let priceArr: any = [];

      arr.map((item: any) => {
        let value = item.attributes[1].value.split(';');
        priceArr.push(+value[3]);
      });

      priceArr.sort((a: number ,b: number ) => a > b ? 1 : -1);

      inputMinStock.value =priceArr[0];
      inputMaxStock.value =priceArr[priceArr.length - 1];
      inputsRangeStockmin.value = priceArr[0];
      inputsRangeStockmax.value =priceArr[priceArr.length - 1];

      currentURL.searchParams.delete('stock');
      currentURL.searchParams.append('stock' , inputMinStock.value);
      currentURL.searchParams.append('stock' , inputMaxStock.value);

      window.history.replaceState(null, null, currentURL);

      const url = new URL(location.href);
      const stock = url.searchParams.getAll('stock');

      if ( stock.length !== 0) {
        progressStock.style.left =(+stock[0] / 150) * 100 + '%';
        progressStock.style.right =(1 - (+stock[1] / 150)) * 100 + '%';
        progressStock.style.width = (+stock[1] - +stock[0]) / 1.5 + '%';
      } else {
        progressStock.style.left =(priceArr[0] / 150) * 100 + '%';
        progressStock.style.right =(1 - (priceArr[priceArr.length - 1] / 150)) * 100 + '%';
        progressStock.style.width =(priceArr[priceArr.length - 1] - priceArr[0])/ 1.5 + '%';
      }
    }

    function mainContainerItemArraySort(arr: HTMLElement[], index: number, type: 'number' | 'string' , reverse: boolean = false) {
      const split = (element: HTMLElement) => element.dataset.value.split(';');

      arr.sort((a: HTMLElement, b: HTMLElement) => {
        const aValue = split(a)[index];
        const bValue = split(b)[index];
        let answer = 0;

        (type === 'number')
          ? answer = (+split(a)[index] > +split(b)[index]) ? -1 : 1
          : answer = (split(a)[index] > split(b)[index]) ? -1 : 1;
        
        return reverse ? 0 - answer : answer;
        }
      );
    }

    function filterSearchPrice(): void {
      let arrayRend: any[] = [];

      mainContainerItemArraySort(mainContainerItemArray, 2, 'number');

      mainContainerItemArray.forEach((item2: any) =>
        products.forEach((item: any) => {
          let value = item2.attributes[1].value.split(';');

          if (item.title.toLowerCase() === value[4].toLowerCase()) {
            arrayRend.push(item);
          }
        })
      );

      resetActive();

      document.getElementById('price').classList.toggle('active');

      currentURL.searchParams.delete('priceSort');
      currentURL.searchParams.append('priceSort', 'up');

      window.history.replaceState(null, null, currentURL);

      renderItems(arrayRend);
      filterBrandfunc(products);
    }

    document.getElementById('price').addEventListener('click', filterSearchPrice);


    function filterSearchPriceDown(): void {
      let arrayRend: any[] = [];

      mainContainerItemArraySort(mainContainerItemArray, 2, 'number', true);

      mainContainerItemArray.forEach((item2: any) =>
        products.forEach((item: any) => {
          let value = item2.attributes[1].value.split(';');

          if (item.title.toLowerCase() === value[4].toLowerCase()) {
            arrayRend.push(item);
          }
        })
      );

      resetActive();

      document.getElementById('priceDown').classList.toggle('active');

      currentURL.searchParams.delete('priceSort');
      currentURL.searchParams.delete('brandSort');
      currentURL.searchParams.delete('stockSort');
      currentURL.searchParams.append('priceSort' , 'down');

      window.history.replaceState(null, null, currentURL);

      renderItems(arrayRend);
      filterBrandfunc(products);
    }

    document.getElementById('priceDown').addEventListener('click', filterSearchPriceDown);

    function filterSearchStock(): void {
      let arrayRend: any[] = [];

      mainContainerItemArraySort(mainContainerItemArray, 3, 'number');

      mainContainerItemArray.forEach((item2: any) =>
          products.forEach((item: any) => {
            let value = item2.attributes[1].value.split(';');

            if (item.title.toLowerCase() === value[4].toLowerCase()) {
              arrayRend.push(item);
            }
          })
        );

        resetActive();

        document.getElementById('stock').classList.toggle('active');

        currentURL.searchParams.delete('priceSort');
        currentURL.searchParams.delete('brandSort');
        currentURL.searchParams.delete('stockSort');
        currentURL.searchParams.append('stockSort' , 'up');

        window.history.replaceState(null, null, currentURL);

        renderItems(arrayRend);
        filterBrandfunc(products);
    }

    document.getElementById('stock').addEventListener('click', filterSearchStock);

    function filterSearchBrand(): void {
      let arrayRend: any[] = [];

      mainContainerItemArraySort(mainContainerItemArray, 0, 'string', true);

      mainContainerItemArray.forEach((item2: any) =>
        products.forEach((item: any) => {
          let value = item2.attributes[1].value.split(';')
          if (item.title.toLowerCase() === value[4].toLowerCase()) {
            arrayRend.push(item);
          }
        })
      )

      resetActive();

      document.getElementById('brand').classList.toggle('active');

      currentURL.searchParams.delete('priceSort');
      currentURL.searchParams.delete('brandSort');
      currentURL.searchParams.delete('stockSort');
      currentURL.searchParams.append('brandSort' , 'up');

      window.history.replaceState(null, null, currentURL);

      renderItems(arrayRend);
      filterBrandfunc(products);
    }

    document.getElementById('brand').addEventListener('click', filterSearchBrand);

    function filterRenderSearch() {
      const url = new URL(location.href);

      const priceSort = url.searchParams.get('priceSort');
      const stock = url.searchParams.get('stockSort');
      const brand = url.searchParams.get('brandSort');

      if(priceSort === 'up'){
        filterSearchPrice();
      } else if(priceSort === 'down') {
        filterSearchPriceDown();
      }

      if (stock === 'up') {
        filterSearchStock();
      }

      if (brand === 'up'){
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
})();
