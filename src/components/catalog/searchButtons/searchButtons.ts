export default function createSearchButtons() {
  const wrapper = document.createElement('div');
  wrapper.id = 'nav_contaiter_burgerSearch';
  wrapper.classList.add('nav_contaiter_burgerSearch');

  const btnPriceUp = document.createElement('div');
  btnPriceUp.id = 'price';
  btnPriceUp.classList.add('price', 'burgerSearch__btn', 'btn');
  btnPriceUp.innerText = 'price \u2193';
  //btnPriceUp.addEventListener('click', () => btnResetClicked());

  const btnPriceDown = document.createElement('div');
  btnPriceDown.id = 'priceDown';
  btnPriceDown.classList.add('priceDown', 'burgerSearch__btn', 'btn');
  btnPriceDown.innerText = 'price \u2191';

  const btnStockDown = document.createElement('div');
  btnStockDown.id = 'stock';
  btnStockDown.classList.add('stock', 'burgerSearch__btn', 'btn');
  btnStockDown.innerText = 'stock \u2193';

  const btnBrand = document.createElement('div');
  btnBrand.id = 'brand';
  btnBrand.classList.add('brand', 'burgerSearch__btn', 'btn');
  btnBrand.innerText = 'brand';

  const btnFound = document.createElement('div');
  btnFound.id = 'found';
  btnFound.classList.add('found', 'burgerSearch__btn', 'btn');
  btnFound.innerText = 'found';

  wrapper.append(btnPriceUp, btnPriceDown, btnStockDown, btnBrand, btnFound);

  return wrapper;
}
