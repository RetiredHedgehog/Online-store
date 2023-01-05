const json = require('./products.json');
import { Entry } from 'webpack';
import './styles/Main.css'
import './styles/norm.css'
const header = document.getElementById('header')
const currentURL = new URL(location.href);
const found = document.getElementById('found');
const price = document.getElementById('price');
const priceDown = document.getElementById('priceDown');
const stock = document.getElementById('stock');
const brand = document.getElementById('brand');
const mainContainerMini = document.getElementById('main_container_mini');
let renderBrandValueArray: any = [];
const navContainerItemMain = document.getElementById('nav_container_item_main');
const navContainerItemMainCategory = document.getElementById('nav_container_item_main_category');
const navContainerItemMainPrice = document.getElementById('nav_container_item_main_price');
const navContainerItemMainStock = document.getElementById('nav_container_item_main_stock');
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

console.log(inpTextFilter)
headerRender()
amount()

function headerRender(){
    const url = new URL(location.href)
    let text = url.searchParams.get('inpText');
    if(text === null) {
        text = ''
    }
    header.innerHTML= `
    <a class="header_logo_a" href="index.html">
                <div class="header_logo"></div>
                
            </a>
            <form> 
                <input id="search" type="text" name="text" class="search" value="${text}" placeholder="Search here!">
                
            </form>
            <a class="header_logo_a" href="cart.html">
                <div class="header_cart"></div>
    
            </a>
    `
}

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

function renderInputsPrice(array : object[]){
    navContainerItemMainPrice.innerHTML = '';
        navContainerItemMainPrice.innerHTML += `
        <div class="wrapper">
        <div class="price-input">
            <div class="field">
                <input type="number" class="input-min numberInput" id="inputMin" value="${arrPrice[0]}">
            </div>
            <div class="separator">-</div>
            <div class="field">
                <input type="number" class="input-max numberInput" id="inputMax" value="${arrPrice[arrPrice.length -1]}">
            </div>
        </div>
        <div class="slider">
            <div class="progress" id="progress"></div>
        </div>
        <div class="range-input">
            
            <input type="range" id="inputRangeMin" class="range-min inputs"  min="10" max="1749" value="${arrPrice[0]}"> 
            <input type="range" id="inputRangeMax" class="range-max inputs"  min="10" max="1749" value="${arrPrice[arrPrice.length -1]}">
        </div>
    </div>
</div>
        `
}


function renderInputsStock(array : object[]){
    navContainerItemMainStock.innerHTML = '';
   
    navContainerItemMainStock.innerHTML += `
    <div class="wrapper">
    <div class="price-input">
        <div class="field">
            <input type="number" class="input-minStock numberInputStock" id="inputMinStock" value="${arrStock[0] }">
        </div>
        <div class="separator">-</div>
        <div class="field">
            <input type="number" class="input-maxStock numberInputStock" id="inputMaxStock" value="${arrStock[arrStock.length -1]}">
        </div>
    </div>
    <div class="slider">
        <div class="progress" id="progressStock"></div>
    </div>
    <div class="range-input">
        
        <input type="range" id = "inputsRangeStockmin" class="range-minStock inputsStock"  min="2" max="150" value="${arrStock[0]}"> 
        <input type="range" id = "inputsRangeStockmax" class="range-maxStock inputsStock"  min="2" max="150" value="${arrStock[arrStock.length -1]}">
    </div>
</div>
</div>
    `
}






function renderItems(array : object[])  {
    mainContainerMini.innerHTML ='';
array.map((item: any) => {
    let rand = Math.floor(Math.random()*item.images.length) // Нв вкус и цвет )
    
    mainContainerMini.innerHTML += `
    <div class="main_container_item" value="${item.brand.toLowerCase()};${item.category.toLowerCase()};${item.price};${item.stock};${item.title.toLowerCase()}" name="" id="">
        <div style="background-image: url(${item.images[rand]});" class="main_container_item_img"></div>
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
        <div id="addToCart">Add to cart</div>
        <div id="details">Details</div>
    </div>
 `
})
// newItemsArray = []
mainContainerItem = document.getElementsByClassName('main_container_item');
mainContainerItemArray = Array.from(mainContainerItem);
mainContainerItemArray.map((item: any) => {
    newItemsArray.push(item)
})
filterBrandfunc(json.products)

}

 

inputRangeArrayfuncStart(json.products)
inputRangeArrayStockfuncStart(json.products)
renderInputsPrice(json.products);
renderInputsStock(json.products)
const inputsRangeStockmin: any = document.getElementById('inputsRangeStockmin')
const inputsRangeStockmax: any = document.getElementById('inputsRangeStockmax')
const inputRangeMin: any = document.getElementById('inputRangeMin')
const inputRangeMax: any = document.getElementById('inputRangeMax')
const inputMin: any = document.getElementById('inputMin')
const inputMax: any = document.getElementById('inputMax')
const inputMinStock: any = document.getElementById('inputMinStock')
const inputMaxStock: any = document.getElementById('inputMaxStock')
const progress = document.getElementById('progress')
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


const rangeInput: any = document.getElementsByClassName('inputs');

const rangeInputStock: any = document.getElementsByClassName('inputsStock');


const priceGap  = 250
const stockGap = 10
RangeWidth(arrPrice)
RangeWidthStock(arrStock)
inputRangefunc()
inputRangeStockfunc()
function RangeWidth(arrPrice: any) {
    const url = new URL(location.href)
    const price = url.searchParams.getAll('price');
    if ( price.length !== 0) {
    progress.style.left =(+price[0] / rangeInput[0].max) * 100 + '%';
    progress.style.right =(+price[1] / 1749) * 100 + '%' ;
    progress.style.width =(+price[1] - +price[0]) / 17.49 + '%';
    } else {
        progress.style.left = (arrPrice[0] / rangeInput[0].max) * 100 + '%';
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
    console.log(text)
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




  

function inputRangefunc() {
for  (const input of rangeInput) {
    input.addEventListener('input', (e: any) => {
        let minVal = parseInt(rangeInput[0].value)
        let maxVal = parseInt(rangeInput[1].value)
        inputMin.value = minVal
        inputMax.value = maxVal
        
        
        if(maxVal - minVal < priceGap){
            if(e.target.className === 'range-min inputs'){

                rangeInput[0].value = maxVal - priceGap;
                inputMin.value = maxVal - priceGap;
                
            } else {
                rangeInput[1].value = minVal + priceGap;
                inputMax.value = minVal + priceGap;

            }
        } else {
            progress.style.left = (minVal / rangeInput[0].max) * 100 + '%';
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
            progress.style.width = (maxVal - minVal)/ 20 + '%';
            
        }
        currentURL.searchParams.delete('price')
            currentURL.searchParams.append('price' , inputMin.value)
            currentURL.searchParams.append('price' , inputMax.value)
            window.history.replaceState(null, null, currentURL);
        inputRangeArrayfunc(json.products)
        filterBrandfunc(json.products);
    })
}
}

function inputRangeStockfunc() {
    for  (const input of rangeInputStock) {
        input.addEventListener('input', (e: any) => {
            let minValStock = parseInt(rangeInputStock[0].value)
            let maxValStock = parseInt(rangeInputStock[1].value)
            inputMinStock.value = minValStock
            inputMaxStock.value = maxValStock
            if(maxValStock - minValStock < stockGap){
                if(e.target.className === 'range-minStock inputsStock'){
    
                    rangeInputStock[0].value = maxValStock - stockGap;
                    inputMinStock.value = maxValStock - stockGap;
                    
                } else {
                    rangeInputStock[1].value = minValStock + stockGap;
                    inputMaxStock.value = minValStock + stockGap;
    
                }
            } else {
                progressStock.style.left = (minValStock / rangeInputStock[0].max) * 100 + '%';
                progressStock.style.right = (1 - (maxValStock / rangeInputStock[1].max)) * 100 + '%';
                progressStock.style.width = ((maxValStock - minValStock)/ 1.5) + '%';
            }
            currentURL.searchParams.delete('stock')
            currentURL.searchParams.append('stock' , inputMinStock.value)
            currentURL.searchParams.append('stock' , inputMaxStock.value)
            window.history.replaceState(null, null, currentURL);
            inputRangeStockArrayfunc(json.products)
            filterBrandfunc(json.products);
        })
    }
    }
 function inputRangeArrayfuncStart(array: any) {
    array.map((item: any) => {
            arrPrice.push(item.price)
    })
    arrPrice.sort((a: number, b: number) => (a > b) ? 1 : -1)

 }

 function inputRangeArrayStockfuncStart(array: any) {
    array.map((item: any) => {
            arrStock.push(item.stock)
    })
    arrStock.sort((a: number, b: number) => (a > b) ? 1 : -1)
 }

function inputRangeArrayfunc(array: any) {
    arrPrice = [];
    array.map((item: any) => {
        if(item.price <= +inputMax.value && item.price >= +inputMin.value){
            arrPrice.push(item.price)
        }
    })
    arrPrice.sort((a: number, b: number) => (a > b) ? 1 : -1)
}
function inputRangeStockArrayfunc(array: any) {
    arrStock = [];
    array.map((item: any) => {
        if(item.stock <= +inputMaxStock.value && item.stock >= +inputMinStock.value){
            arrStock.push(item.stock)
        }
    })
    arrStock.sort((a: number, b: number) => (a > b) ? 1 : -1)
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
 }