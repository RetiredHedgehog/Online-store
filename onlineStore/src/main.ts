const json = require('./products.json');
import { Entry } from 'webpack';
import '/styles/Main.css'
import '/styles/norm.css'




const mainContainerMini = document.getElementById('main_container_mini')

const navContainerItemMain = document.getElementById('nav_container_item_main')
const navContainerItemMainCategory = document.getElementById('nav_container_item_main_category')
const navContainerItemMainPrice = document.getElementById('nav_container_item_main_price');
const navContainerItemMainStock = document.getElementById('nav_container_item_main_stock');



const filterBrand: any = [];
const filterCategory: any = [];
const filterPrice: any =[];

let input: any;
let arr: any;
let inputCategory: any;
let inputPrice: any;
let arrCategory: any;
let arrPrice: any = [];
let arrStock: any = [];
let mainContainerItem:any
let mainContainerItemArray: any


function renderInputsBrand(array : object[]){
    const itemBrandArray: any = [];
    array.map((item: any) => {
        if(itemBrandArray.indexOf(item.brand) == -1){
            itemBrandArray.push(item.brand)
        }
    })
    itemBrandArray.map((item: any) => {
        navContainerItemMain.innerHTML += `
        <div class="inputCheckbox">
                                <input class="inputBrand" type="checkbox" name="brand" id="inputBrand" value="${item}">
                                <label for="inputBrand">${item}</label>
                            </div>
        `
    })
    input = document.getElementsByClassName('inputBrand');
    arr = Array.from(input);
}

function renderInputsCategory(array : object[]){
    const itemCategoryArray: any = [];
    array.map((item: any) => {
        if(itemCategoryArray.indexOf(item.category) == -1){
            itemCategoryArray.push(item.category)
        }
    })
   
    itemCategoryArray.map((item: any) => {
        
        navContainerItemMainCategory.innerHTML += `
        <div class="inputCheckbox">
                                <input class="inputCategory" type="checkbox" name="Category" id="inputCategory" value="${item}">
                                <label for="inputCategory">${item}</label>
                            </div>
        `
    })
    inputCategory = document.getElementsByClassName('inputCategory');
    arrCategory = Array.from(inputCategory);
}

function renderInputsPrice(array : object[]){
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
            
            <input type="range" class="range-min inputs"  min="0" max="2000" value="${arrPrice[0]}"> 
            <input type="range" class="range-max inputs"  min="0" max="2000" value="${arrPrice[arrPrice.length -1]}">
        </div>
    </div>
</div>
        `
}


function renderInputsStock(array : object[]){
    navContainerItemMainStock.innerHTML += `
    <div class="wrapper">
    <div class="price-input">
        <div class="field">
            <input type="number" class="input-minStock numberInputStock" id="inputMinStock" value="${arrStock[0]}">
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
        
        <input type="range" class="range-minStock inputsStock"  min="0" max="150" value="${arrStock[0]}"> 
        <input type="range" class="range-maxStock inputsStock"  min="0" max="150" value="${arrStock[arrStock.length -1]}">
    </div>
</div>
</div>
    `
}






function renderItems(array : object[])  {
    mainContainerMini.innerHTML = '' 
array.map((item: any) => {
    let rand = Math.floor(Math.random()*item.images.length) // Нв вкус и цвет )
    
    mainContainerMini.innerHTML += `
    <div class="main_container_item" value="${item.brand};${item.category};${item.price};${item.stock}" name="" id="">
            <div class="main_container_item_header">
           ${item.title}
            </div>
            <div style="background-image: url(${item.images[rand]});" class="main_container_item_body">
                <div class="main_container_item_category">
                <p>Category: ${item.category}</p>
                <p>Brand: ${item.brand}</p>
                <p>Price: ${item.price}</p>
                <p>Discount: ${item.discountPercentage}%</p>
                <p>Rating: ${item.rating}</p>
                <p>Stock: ${item.stock}</p>
                </div>
                <div class="main_container_item_buttons">
                    <div class="main_container_item_buttons_addRemove">add to cart</div>
                    <div class="main_container_item_buttons_details">details</div>

                </div>
            </div>
        </div>
        
    `



})
mainContainerItem = document.getElementsByClassName('main_container_item');
mainContainerItemArray = Array.from(mainContainerItem);
}








 






renderItems(json.products);
renderInputsBrand(json.products);
renderInputsCategory(json.products);
inputRangeArrayfuncStart(json.products)
inputRangeArrayStockfuncStart(json.products)

renderInputsPrice(json.products);
renderInputsStock(json.products)

const inputMin: any = document.getElementById('inputMin')
const inputMax: any = document.getElementById('inputMax')
const rangeInput: any = document.getElementsByClassName('inputs');
const inputMinStock: any = document.getElementById('inputMinStock')
const inputMaxStock: any = document.getElementById('inputMaxStock')
const rangeInputStock: any = document.getElementsByClassName('inputsStock');
const progress = document.getElementById('progress')
const progressStock = document.getElementById('progressStock')

const priceGap  = 250
const stockGap = 10
RangeWidth(arrPrice)
RangeWidthStock(arrStock)
inputRangefunc()
inputRangeStockfunc()
function RangeWidth(arrPrice: any) {
    progress.style.left = (arrPrice[0] / rangeInput[0].max) * 100 + '%';
    progress.style.right = (arrPrice[arrPrice.length - 1] / rangeInput[1].min) * 100 + '%';
    progress.style.width = (arrPrice[arrPrice.length - 1] - arrPrice[0])/ 20 + '%';
}
function RangeWidthStock(arrPrice: any) { // TODO change values
    progressStock.style.left = (arrStock[0] / rangeInputStock[0].max) * 100 + '%';
    progressStock.style.right = (arrStock[arrStock.length - 1] / rangeInputStock[1].min) * 100 + '%';
    progressStock.style.width = (arrStock[arrStock.length - 1] - arrStock[0]) /1.5 + '%';

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


 function changeInputRangeValueFunc(){
    inputMin.value = arrPrice[0];
    inputMax.value = arrPrice[arrPrice.length - 1];
 }




arr.map((item: any) => {
    item.addEventListener('click', () => {
        if(item.checked === true){
            filterBrand.push(item.defaultValue)
        } else {
            filterBrand.splice(filterBrand.indexOf(item.defaultValue), 1);
            if(filterBrand.length === 0) {
                renderItems(json.products)
            }
           

        }
        
        filterBrandfunc(json.products);
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
        
        filterBrandfunc(json.products);
    })
});



function filterBrandfunc(array : object[])  {
        mainContainerItemArray.forEach((item: any) => {
            let arr = item.attributes[1].nodeValue.split(';')
            console.log(arr)
            if((filterBrand.indexOf(arr[0]) > -1 || filterBrand.length === 0)
            && (filterCategory.indexOf(arr[1]) > -1 || filterCategory.length === 0)
            && (arrPrice.indexOf(+arr[2]) > -1 || arrPrice.length === 0)
            && (arrStock.indexOf(+arr[3]) > -1) || arrStock.length === 0) {
               
                    item.style.display = ''
            } else {
                item.style.display = 'none'
            }
        })
    }
