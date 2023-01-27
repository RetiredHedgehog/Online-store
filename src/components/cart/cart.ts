import Cart from 'classes/Cart';
import createItemsBlock from './itemsBlock/itemsBlock';
import createPopUp from './popUp/popUp';

export default function createCart(cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container');

  const wrapperTitle = document.createElement('div');
  wrapperTitle.classList.add('main-container__title-container');

  const title = document.createElement('h2');
  title.classList.add('items-container__title');

  title.innerText =
    cart.length > 0 ? 'Items in your cart' : 'Your cart is empty!';

  wrapperTitle.append(title);

  wrapper.append(wrapperTitle, createItemsBlock(cart), createPopUp(cart));

  return wrapper;
}
