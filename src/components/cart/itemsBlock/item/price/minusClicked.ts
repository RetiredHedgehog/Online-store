import createItem from '../item';
import Cart from 'classes/Cart';
import updateAmmount from './updateAmmount';
import updatePrice from './updatePrice';
import updateSummary from './updateSummary';

export default function minusClicked(event: Event, cart: Cart) {
  const target = event.target as HTMLElement;
  const wrapper = target.closest('.items-container__item') as HTMLElement;
  const indexElement = wrapper.firstChild as HTMLElement;
  const index = parseInt(indexElement.innerText) - 1;

  const item = cart.products[index];

  if (item.count === undefined || item.count <= 1) {
    cart.removeItem(index);

    wrapper.remove();

    if (cart.length === 0) {
      const title = document.getElementsByClassName(
        'items-container__title'
      )[0] as HTMLElement;
      title.innerText = 'Your cart is empty!';
    } else {
      const itemsContainer = document.getElementsByClassName(
        'items-container'
      )[0] as HTMLElement;
      itemsContainer.replaceChildren(
        ...cart.products.map((element, index) =>
          createItem(element, index, cart)
        )
      );
    }
  } else {
    item.count -= 1;
  }

  updateAmmount(wrapper, item);
  updatePrice(wrapper, item);
  updateSummary(cart);

  cart.moveFromCartToStorage();
}
