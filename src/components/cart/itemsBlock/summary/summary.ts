import Cart from 'classes/Cart';
import { openPopUp } from '../../popUp/togglePopUp';

export default function createSummary(cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container__summary-container');

  const wrapperInfo = document.createElement('div');
  wrapperInfo.classList.add('summary-container__info-container');

  const ammount = document.createElement('p');
  ammount.classList.add('info-container__ammount');
  ammount.innerText = `Products: ${cart.count}`;

  const total = document.createElement('p');
  total.classList.add('info-container__total');
  total.innerText = `Total: ${cart.total}`;

  const btnBuy = document.createElement('button');
  btnBuy.classList.add('btn', 'info-container__button-buy');
  btnBuy.innerText = 'Buy';
  btnBuy.addEventListener('click', openPopUp);

  wrapperInfo.append(ammount, total, btnBuy);

  wrapper.append(wrapperInfo);
  return wrapper;
}
