import Cart from 'classes/Cart';
import productItem from 'interfaces/productsItem';
import minusClicked from './minusClicked';
import plusClicked from './plusClicked';

export default function createPrice(item: productItem, cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('item__price-container');

  const stock = document.createElement('p');
  stock.innerText = `Stock: ${item.stock}`;

  const wrapperAmmount = document.createElement('div');
  wrapperAmmount.classList.add('price-container__counter');

  const btnMinus = document.createElement('button');
  btnMinus.classList.add(
    'btn',
    'price-container__button',
    'price-container__button-minus'
  );
  btnMinus.innerText = '-';
  btnMinus.addEventListener('click', (event: Event) =>
    minusClicked(event, cart)
  );

  const btnPlus = document.createElement('button');
  btnPlus.classList.add(
    'btn',
    'price-container__button',
    'price-container__button-plus'
  );
  btnPlus.innerText = '+';
  btnPlus.addEventListener('click', (event: Event) => plusClicked(event, cart));

  const ammountCounter = document.createElement('div');
  ammountCounter.classList.add('price-container__ammount');
  ammountCounter.innerText = (item.count || 1).toString();

  wrapperAmmount.append(btnMinus, ammountCounter, btnPlus);

  const price = document.createElement('p');
  price.classList.add('price-container__price');
  price.innerText = `$${item.price}`;

  wrapper.append(stock, wrapperAmmount, price);

  return wrapper;
}
