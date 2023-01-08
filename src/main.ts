const json = require('./products.json');
import Cart from "classes/Cart";
import createProduct from './components/product/product';
import createHeader from './components/header/header';
import createDoubleSlider from "./components/catalog/filters/doubleSlider/doubleSlider";
import createCart from "./components/cart/cart";
import './styles/Main.css';
import createFilters from "./components/catalog/filters/filter";

;(async () => {

const cart = new Cart();
await cart.fetchItems();
cart.moveFromStorageToCart();

const currentURL = new URL(location.href);
currentURL.pathname = '/';

// === HEADER ===
document.getElementsByTagName('body')[0].prepend(createHeader(cart));

console.log(currentURL)
const routes = {
  'cart': createCart,
  'products': createProduct,
  '': catalog,
}

function changeRoute(routes: object) {
  const hash = (new URL(location.href)).hash.slice(2);
  console.log(Date.now())
console.log('hash: ',hash)
  const route = Object.entries(routes).find(([key, value]) => {
    console.log(hash,key,hash.includes(key))
    if (hash.includes(key)) {
      return value;
    }

    return false;
  });
console.log(route)
  if (route) {
    // TODO: FIX THIS
    if (route[0] === '') {
      catalog();
      return;
    }
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
document.getElementsByClassName('main')[0].prepend(createFilters(cart));
const found = document.getElementById('found');
const price = document.getElementById('price');
const priceDown = document.getElementById('priceDown');
const stock = document.getElementById('stock');
const brand = document.getElementById('brand');
const mainContainerMini = document.getElementById('main_container_mini');
let renderBrandValueArray: any = [];
const navContainerItemMain = document.getElementById('nav-container__main');
const navContainerItemMainCategory = document.getElementById('nav-container__main_category') || document.createElement('div');
const navContainerItemMainPrice = document.getElementById('nav-container__main_price');
const navContainerItemMainStock = document.getElementById('nav-container__main_stock');
const navContaiterBurgerSearch = document.getElementById('nav_contaiter_burgerSearch');
let amountBrand : any
let amountCategory : any
let newItemsArray: any = [];
let filterBrand: any = currentURL.searchParams.getAll('brand');
let filterCategory: any = currentURL.searchParams.getAll('category');
const inpTextFilter: any = currentURL.searchParams.get('inpText')
const column = document.getElementById('column')
const row = document.getElementById('row')
const resetFilt = document.getElementById('resetFilt')
const Copy = document.getElementById('Copy')





const filterPrice: any =[];
let obj: any = {};
let objCategory: any = {};
let inpSearchArray: any = []
let stateObj = { foo: "bar" } ;//asdasda
let inpArrSearch: any = [];
let input: any;
let arr: any;
let inputCategory: any;
let inputPrice: any;
let arrCategory: any;
let arrPrice: any = [];
let arrStock: any = [];
let mainContainerItem:any
let mainContainerItemArray: any
const itemBrandArray: any = [];
const itemsArray: any = [];


amount()

function renderInputsBrand(array : any[]){
    navContainerItemMain.innerHTML = '';
        array.map((item: any) => {
        item.name = 1;
        
        if(itemBrandArray.indexOf(item.brand.toLowerCase()) == -1){
            itemBrandArray.push(item.brand.toLowerCase())
            itemsArray.push(item)
        } else {
            itemsArray[itemBrandArray.indexOf(item.brand.toLowerCase())].name++
            
        }
        

    })
    newProd(json.products, newItemsArray)
    itemBrandArrayGenerator(obj,itemsArray)
    const amountBr = document.getElementById('amountBr')
    input = document.getElementsByClassName('inputBrand');
    arr = Array.from(input);
}

function renderInputsCategory(array : object[]){
    
    navContainerItemMainCategory.innerHTML = '';
    const itemCategoryArray: any = [];
    array.map((item: any) => {
        if(itemCategoryArray.indexOf(item.category) == -1){
            itemCategoryArray.push(item.category)
        }
    })
   
   
    newProd(json.products, newItemsArray)
    itemCategoryArrayGenerator(objCategory, itemsArray)
    
    inputCategory = document.getElementsByClassName('inputCategory');
    arrCategory = Array.from(inputCategory);
}

function renderItems(array : object[] = []) {
  mainContainerMini.innerHTML = '';

  mainContainerMini.addEventListener('click', (event:Event) => {
    const target = event.target as HTMLElement;
    const element = target.closest('.main_container_item') as HTMLElement;
    const productId = parseInt(element.dataset.id);

    if (target.id === 'addToCart')  {
      cart.addItem(productId);
      return;
    }

    // TODO: change it to router
    if (target.id === 'details') {
      currentURL.search = '';

      window.history.pushState(null, null, `${currentURL}#/products/${productId}`);

      document.getElementsByClassName('main')[0].replaceChildren(createProduct(cart));
      return;
    }
  });

  array.forEach((item: any) => {
    let rand = Math.floor(Math.random()*item.images.length) // Нв вкус и цвет )

    mainContainerMini.innerHTML += `
      <div class="main_container_item" value="${item.brand.toLowerCase()};${item.category.toLowerCase()};${item.price};${item.stock};${item.title.toLowerCase()}" data-id="${item.id}" name="" id="">
      <img src=${item.images[rand]} class="main_container_item_img" alt="${item.title}"/>
      <div class="main_container_item_header">
        <div>${item.title}</div>
        <div>$${item.price}</div>

        </div>
        <div class="categoryes">
          <p>Category: ${item.category}</p>
          <p>Brand: ${item.brand}</p>
          <p>Price: ${item.price}</p>
          <p>Discount: ${item.discountPercentage}</p>
          <p>Rating: ${item.rating}</p>
          <p>Stock: ${item.stock}</p>
        </div>
        <button id="addToCart" class="btn">Add to cart</button>
        <button id="details" class="btn">Details</button>
      </div>
    `;
  });


  // newItemsArray = []
  mainContainerItem = document.getElementsByClassName('main_container_item');
  mainContainerItemArray = Array.from(mainContainerItem);
  mainContainerItemArray.map((item: any) => {
      newItemsArray.push(item)
  })
  filterBrandfunc(json.products)
}

// === SLIDERS ===
inputRangeArrayfuncStart(json.products)
inputRangeArrayStockfuncStart(json.products)

// TODO: later move into catalog folder
// document.getElementById('nav-container__main_price').replaceWith(createDoubleSlider(
//   {
//     className: 'nav-container__main_price',
//     text: 'Price',
//     cart,
//     sortingField: 'price',
//   })
// );

// document.getElementById('nav-container__main_stock').replaceWith(createDoubleSlider(
//   {
//     className: 'nav-container__main_price',
//     text: 'Stock',
//     cart,
//     sortingField: 'stock',
//   })
// );

const inputsRangeStockmin: any = document.getElementById('inputRangeMinStock')
const inputsRangeStockmax: any = document.getElementById('inputRangeMaxStock')
const inputRangeMin: any = document.getElementById('inputRangeMinPrice')
const inputRangeMax: any = document.getElementById('inputRangeMaxPrice')
const inputMin: any = document.getElementById('inputMinPrice')
const inputMax: any = document.getElementById('inputMaxPrice')
const inputMinStock: any = document.getElementById('inputMinStock')
const inputMaxStock: any = document.getElementById('inputMaxStock')
const progress = document.getElementById('progressPrice')
const progressStock = document.getElementById('progressStock')
renderItems(json.products);

renderInputsBrand(json.products);
renderInputsCategory(json.products);
textInp()
filterRenderSearch()
filterRenderSearchRowCol()
renderRowColumn()
columnButton()
rowButton()
resetButton()
copyButton()

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

RangeWidth(arrPrice)
RangeWidthStock(arrStock)

function RangeWidth(arrPrice: any) {
    const url = new URL(location.href)
    const price = url.searchParams.getAll('price');
    if ( price.length !== 0) {
    progress.style.left =(+price[0] / +rangeInputPrice[0].max) * 100 + '%';
    progress.style.right =(+price[1] / 1749) * 100 + '%' ;
    progress.style.width =(+price[1] - +price[0]) / 17.49 + '%';
    } else {
        progress.style.left = (arrPrice[0] / +rangeInputPrice[0].max) * 100 + '%';
        progress.style.right =(arrPrice[arrPrice.length - 1] / 1749) * 100 + '%';
        progress.style.width =(arrPrice[arrPrice.length - 1] - arrPrice[0])/ 17.49 + '%';

    }
}
function RangeWidthStock(arrPrice: any) { // TODO change values
    const url = new URL(location.href)
    
    const stock = url.searchParams.getAll('stock');
    if ( stock.length !== 0) {
        progressStock.style.left =(+stock[0] / 150) * 100 + '%';
        progressStock.style.right =( 1 - (+stock[1] / 150)) * 100 + '%';
        progressStock.style.width = (+stock[1] - +stock[0]) / 1.5 + '%';
    } else {
        progressStock.style.left =(arrPrice[0] / 150) * 100 + '%';
        progressStock.style.right =(1 - (arrPrice[arrPrice.length - 1] / 150)) * 100 + '%';
        progressStock.style.width =(arrPrice[arrPrice.length - 1] - arrPrice[0])/ 1.5 + '%';
    }
}



let inpSearchText: string;
const inpSearch: any  = document.getElementById('search');
const inpSearchButton  = document.getElementById('searchButton');

 
inpSearch.oninput = function() {
    inpArrSearch = []
    inpSearchText = inpSearch.value
    inpSearchText = inpSearchText.toLowerCase()
    currentURL.searchParams.delete('inpText')
    currentURL.searchParams.append('inpText' , inpSearchText)
    window.history.replaceState(null, null, currentURL);
    search(inpSearchText,json.products)
    searchFilter()
    

  };
function search(text: string, arr: any) {
    arr.map((item:any) => {
        if(item.brand.toLowerCase().indexOf(text) > -1
            || item.category.toLowerCase().indexOf(text) > -1
            || item.title.toLowerCase().indexOf(text) > -1
            ||item.price.toString().indexOf(text) > -1
            ||item.stock.toString().indexOf(text) > -1){
            inpArrSearch.push(item.title.toLowerCase())
            inpSearchArray.push(item)
        }
    })
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

arr.map((item: any) => {
    item.addEventListener('click', () => {
        if(item.checked === true){
            filterBrand.push(item.defaultValue.toLowerCase())
        } else {
            filterBrand.splice(filterBrand.indexOf(item.defaultValue), 1);
            if(filterBrand.length === 0) {
                renderItems(json.products)
            }
           

        }
        currentURL.searchParams.delete('brand')
        for (const brand of filterBrand) {
            currentURL.searchParams.append('brand' , brand)
        }
        window.history.replaceState(null, null, currentURL);
        filterBrandfunc(json.products);
        currentURL.searchParams.delete('stock')
            currentURL.searchParams.append('stock' , inputMinStock.value)
            currentURL.searchParams.append('stock' , inputMaxStock.value)
            window.history.replaceState(null, null, currentURL);
    })
});
arrCategory.map((item: any) => {
    item.addEventListener('click', () => {
        if(item.checked === true){
            filterCategory.push(item.defaultValue)
        } else {
            filterCategory.splice(filterCategory.indexOf(item.defaultValue), 1);
            if(filterCategory.length === 0) {
                renderItems(json.products)
            }
           

        }
        currentURL.searchParams.delete('category')
        for (const category of filterCategory) {
            currentURL.searchParams.append('category' , category)
        }
        window.history.replaceState(null, null, currentURL);
        filterBrandfunc(json.products);
    })
    
});



function filterBrandfunc(array : object[])  {
        newItemsArray = []
        mainContainerItemArray.forEach((item: any) => {
            let arr = item.attributes[1].nodeValue.split(';')
            if((filterBrand.indexOf(arr[0]) > -1 || filterBrand.length === 0)
            && (filterCategory.indexOf(arr[1]) > -1 || filterCategory.length === 0)
            && (arrPrice.indexOf(+arr[2]) > -1 || arrPrice.length === 0)
            && (arrStock.indexOf(+arr[3]) > -1 || arrStock.length === 0)
            && (inpArrSearch.indexOf(arr[4]) > -1 || inpArrSearch.length ===0)
            ) {
               newItemsArray.push(item)
                    item.style.display = ''
            } else {
                item.style.display = 'none'
            }
        })
        newProd(json.products, newItemsArray)
        
    }
    

function searchFilter(){
newItemsArray = [];
    mainContainerItemArray.forEach((item: any) => {
        item.style.display = 'none';
        let arr = item.attributes[1].nodeValue.split(';')
        inpArrSearch.forEach((item1: any) => {
           if (item1.toLowerCase() == arr[4].toLowerCase()){
            item.style.display = '';
            newItemsArray.push(item)
           }
        })
    })
    newProd(json.products, newItemsArray)
}


function newProd (arr: any , arr2: any) { //json prod ; newItemsArr
obj = {}
objCategory ={}
arr.map((item: any) => {
    let key = item.brand.toLowerCase()
    let keyCat = item.category.toLowerCase()
    obj[key] = obj[key] || 0;
    objCategory[keyCat] = objCategory[keyCat] || 0;
arr2.map((item2: any) => {
    let value = item2.attributes[1].value.split(';')
if(item.title.toLowerCase() === value[4].toLowerCase()){
    obj[key] += 1
    objCategory[keyCat] += 1
}
})
})
found.innerHTML = `Found : ${newItemsArray.length}`
inputBrandCurrentValueInnerHTML(obj)
inputCategoryCurrentValueInnerHTML(objCategory)
inputNumberCurrentValueGenerator(newItemsArray)
inputNumberCurrentStockValueGenerator(newItemsArray)


}
function itemBrandArrayGenerator(obj: any, arr2:any){ //itemBrandArray,itemsArray
    const url = new URL(location.href)
    const brand = url.searchParams.getAll('brand')
    navContainerItemMain.innerHTML = '';

    for (let k in obj){
        navContainerItemMain.innerHTML += `
        <div class="inputCheckbox">
                                <input class="inputBrand" type="checkbox" name=""  value="${k}" ${brand.includes(k) ? 'checked' : ''}>
                                <label  for="inputBrand">${k}
                                <label class="inputBrandCurrentValue">
                                    ${obj[k]}
                                </label>
                                /${amountBrand[k]}
                                </label>
                            </div>
        `
    }
    inputBrandCurrentValueInnerHTML(obj)
    
}
function itemCategoryArrayGenerator(obj: any , arr2:any) {
    const url = new URL(location.href)
    const categories = url.searchParams.getAll('category');
    for(let k in obj) {
        navContainerItemMainCategory.innerHTML += `
        <div class="inputCheckbox">
                                <input  class="inputCategory" type="checkbox" name="Category"  value="${k}" ${categories.includes(k) ? 'checked' : ''}>
                                <label for="inputCategory">${k}
                                <label class="inputCategoryCurrentValue">
                                ${obj[k]}
                                </label>
                                 ${amountCategory[k]}
                                </label>
                            </div>
        `
    }
        
        inputCategoryCurrentValueInnerHTML(objCategory)
}

function inputBrandCurrentValueInnerHTML(obj: any,){
    let inputBrandCurrentValue: any = document.getElementsByClassName('inputBrandCurrentValue')
    inputBrandCurrentValue = Array.from(inputBrandCurrentValue)
    for (let k in obj){
        inputBrandCurrentValue.map((item: any) => {
            let val = item.parentNode.parentNode.childNodes[1]
        if(val.value === k){
            item.innerHTML = obj[k]
    }
        })
    }
    
}
function inputCategoryCurrentValueInnerHTML(obj: any) {
    let inputCategoryCurrentValue: any = document.getElementsByClassName('inputCategoryCurrentValue')
    inputCategoryCurrentValue = Array.from(inputCategoryCurrentValue)
    for (let k in obj){
        inputCategoryCurrentValue.map((item: any) => {
            let val = item.parentNode.parentNode.childNodes[1]
        if(val.value === k){
            item.innerHTML = obj[k]
    }
        })
    }
}
function inputNumberCurrentValueGenerator(arr: any) {
    
    let priceArr: any = [];
    arr.map((item: any) => {
        let value = item.attributes[1].value.split(';')
        priceArr.push(+value[2])
    })
    priceArr.sort((a: number ,b: number ) => a > b ? 1 : -1)
    inputMin.value =priceArr[0]
    inputMax.value =priceArr[priceArr.length - 1]
    inputRangeMin.value =priceArr[0]
    inputRangeMax.value =priceArr[priceArr.length - 1]
    currentURL.searchParams.delete('price')
    currentURL.searchParams.append('price' , inputMin.value)
    currentURL.searchParams.append('price' , inputMax.value)
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
        let value = item.attributes[1].value.split(';')
        priceArr.push(+value[3])
    })
    
    
    priceArr.sort((a: number ,b: number ) => a > b ? 1 : -1)
    inputMinStock.value =priceArr[0]
    inputMaxStock.value =priceArr[priceArr.length - 1]
    inputsRangeStockmin.value = priceArr[0]
    inputsRangeStockmax.value =priceArr[priceArr.length - 1]
    currentURL.searchParams.delete('stock')
    currentURL.searchParams.append('stock' , inputMinStock.value)
    currentURL.searchParams.append('stock' , inputMaxStock.value)
    window.history.replaceState(null, null, currentURL); 
    const url = new URL(location.href)
    const stock = url.searchParams.getAll('stock');
    if ( stock.length !== 0) {
        progressStock.style.left =(+stock[0] / 150) * 100 + '%';
        progressStock.style.right =( 1 - (+stock[1] / 150)) * 100 + '%';
        progressStock.style.width = (+stock[1] - +stock[0]) / 1.5 + '%';
    } else {
        progressStock.style.left =(priceArr[0] / 150) * 100 + '%';
    progressStock.style.right =(1 - (priceArr[priceArr.length - 1] / 150)) * 100 + '%';
    progressStock.style.width =(priceArr[priceArr.length - 1] - priceArr[0])/ 1.5 + '%';
    }
    
}
price.addEventListener('click', filterSearchPrice)
priceDown.addEventListener('click', filterSearchPriceDown)

stock.addEventListener('click', filterSearchStock)
brand.addEventListener('click', filterSearchBrand)



function filterSearchPrice(): void {
    let arrayRend:any =[]
    arrayRend = []
    mainContainerItemArray.sort((a:any ,b:any) => {
        let aSort = a.attributes.value.value.split(';')
        let bSort = b.attributes.value.value.split(';')
        if(+aSort[2] > +bSort[2]){
            return -1
        } else {
            return 1
        }
    })
    mainContainerItemArray.map((item2: any) => {
    json.products.map((item: any) => {
        let value = item2.attributes[1].value.split(';')
    if(item.title.toLowerCase() === value[4].toLowerCase()){
       arrayRend.push(item)
    }
    })
    })
    resetActive()
    price.classList.toggle('active')
    currentURL.searchParams.delete('priceSort')
    currentURL.searchParams.append('priceSort' , 'up')
    window.history.replaceState(null, null, currentURL);
    renderItems(arrayRend)
    filterBrandfunc(json.products)
}
function filterSearchPriceDown(): void {
    let arrayRend:any =[]
    arrayRend = []
    mainContainerItemArray.sort((a:any ,b:any) => {
        let aSort = a.attributes.value.value.split(';')
        let bSort = b.attributes.value.value.split(';')
        if(+aSort[2] > +bSort[2]){
            return 1
        } else {
            return -1
        }
    })
    mainContainerItemArray.map((item2: any) => {
    json.products.map((item: any) => {
        let value = item2.attributes[1].value.split(';')
    if(item.title.toLowerCase() === value[4].toLowerCase()){
       arrayRend.push(item)
    }
    })
    })
    resetActive()
    priceDown.classList.toggle('active')
    currentURL.searchParams.delete('priceSort')
    currentURL.searchParams.delete('brandSort')
    currentURL.searchParams.delete('stockSort')
    currentURL.searchParams.append('priceSort' , 'down')
    window.history.replaceState(null, null, currentURL);
    renderItems(arrayRend)
    filterBrandfunc(json.products)
}

function filterSearchStock(): void {
    let arrayRend:any =[]
    arrayRend = []
    mainContainerItemArray.sort((a:any ,b:any) => {
        let aSort = a.attributes.value.value.split(';')
        let bSort = b.attributes.value.value.split(';')
        
        if(+aSort[3] > +bSort[3]){
            return -1
        } else {
            return 1
        }
    })
    mainContainerItemArray.map((item2: any) => {
    json.products.map((item: any) => {
        let value = item2.attributes[1].value.split(';')
    if(item.title.toLowerCase() === value[4].toLowerCase()){
       arrayRend.push(item)
    }
    })
    })
    resetActive()
    stock.classList.toggle('active')
    currentURL.searchParams.delete('priceSort')
    currentURL.searchParams.delete('brandSort')
    currentURL.searchParams.delete('stockSort')
    currentURL.searchParams.append('stockSort' , 'up')
    window.history.replaceState(null, null, currentURL);
    renderItems(arrayRend)
    filterBrandfunc(json.products)
}
function filterSearchBrand(): void {
    let arrayRend:any =[]
    arrayRend = []
    mainContainerItemArray.sort((a:any ,b:any) => {
        let aSort = a.attributes.value.value.split(';')
        let bSort = b.attributes.value.value.split(';')
        if(aSort[0] > bSort[0]){
            return 1
        } else {
            return -1
        }
    })
    mainContainerItemArray.map((item2: any) => {
    json.products.map((item: any) => {
        let value = item2.attributes[1].value.split(';')
    if(item.title.toLowerCase() === value[4].toLowerCase()){
       arrayRend.push(item)
    }
    })
    })
    resetActive()
    brand.classList.toggle('active')
    currentURL.searchParams.delete('priceSort')
    currentURL.searchParams.delete('brandSort')
    currentURL.searchParams.delete('stockSort')


    currentURL.searchParams.append('brandSort' , 'up')
    window.history.replaceState(null, null, currentURL);
    renderItems(arrayRend)
    filterBrandfunc(json.products)
}
function filterRenderSearch() {
    const url = new URL(location.href)
    const priceSort = url.searchParams.get('priceSort');
    const stock = url.searchParams.get('stockSort');
    const brand = url.searchParams.get('brandSort');

    if( priceSort === 'up'){
        filterSearchPrice()
    } else if(priceSort === 'down') {
        filterSearchPriceDown()
    }
    if (stock === 'up') {
        filterSearchStock()
    }
    if(brand === 'up'){
        filterSearchBrand()
    }
}
function filterRenderSearchRowCol(){
    const url = new URL(location.href)
    const flexDirection = url.searchParams.get('flexDirection');
    if( flexDirection === 'row'){
        mainContainerMini.style.flexDirection = 'row'
        row.classList.add('active')
    } else if(flexDirection === 'column') {
        mainContainerMini.style.flexDirection = 'column'
        column.classList.add('active')

    }
    
}

function amount() {
amountBrand = {}
amountCategory = {}
json.products.map((item: any) => {
    if (!amountBrand[item.brand.toLowerCase()]){
        amountBrand[item.brand.toLowerCase()] = 1
    } else {
        amountBrand[item.brand.toLowerCase()] += 1
    }
    if (!amountCategory[item.category.toLowerCase()]){
        amountCategory[item.category.toLowerCase()] = 1
    } else {
        amountCategory[item.category.toLowerCase()] += 1
    }
    
})
}
function textInp() {
    if (inpTextFilter) {
        search(inpTextFilter,json.products)
        searchFilter()
    }
    filterBrandfunc(json.products)
}
 function columnButton(){
    column.addEventListener('click' , () => {
        mainContainerMini.style.flexDirection = 'column'
        row.classList.remove('active')
        column.classList.add('active')
        currentURL.searchParams.delete('flexDirection')
        currentURL.searchParams.append('flexDirection' , 'column')
        window.history.replaceState(null, null, currentURL);
    })
 }
 function rowButton(){
    row.addEventListener('click' , () => {
        mainContainerMini.style.flexDirection = 'row'
        column.classList.remove('active')
        row.classList.add('active')
        currentURL.searchParams.delete('flexDirection')
        currentURL.searchParams.append('flexDirection' , 'row')
        window.history.replaceState(null, null, currentURL);
    })
 }
 function renderRowColumn() {
    const url = new URL(location.href)
    let rowCol = url.searchParams.get('flexDirection');
    if( rowCol == 'row') {
        mainContainerMini.style.flexDirection = 'row'
    } else if(rowCol == 'column') {
        mainContainerMini.style.flexDirection = 'column'
    }
 }
 function resetButton() { 
    resetFilt.addEventListener('click', () => {
        resetActive()
        column.classList.remove('active')
        row.classList.remove('active')
        currentURL.searchParams.delete('brand')
        currentURL.searchParams.delete('category')
        currentURL.searchParams.delete('price')
        currentURL.searchParams.delete('stock')
        currentURL.searchParams.delete('inpText')
        currentURL.searchParams.delete('flexDirection')
        currentURL.searchParams.delete('priceSort')
        currentURL.searchParams.delete('stockSort')
        currentURL.searchParams.delete('brandSort')
        window.history.replaceState(null, null, currentURL)
        
        filterBrand = []
        filterCategory = []
        arrPrice = []
        arrStock = []
        inpArrSearch = []   
        inpSearch.value = ''; 
        arrCategory.map((item: any) => {
            item.checked = false
        })
        arr.map((item: any) => {
            item.checked = false
        })
        renderItems(json.products)
        filterBrandfunc(json.products)
    })
 }
 function copyButton() {
    Copy.addEventListener('click' , () =>  {
        navigator.clipboard.writeText(location.href)
       
    })
 }
 function resetActive() {
    price.classList.remove('active')
    priceDown.classList.remove('active')
    stock.classList.remove('active')
    brand.classList.remove('active')
 }}
})();
