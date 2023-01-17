import Cart from 'classes/Cart';
import updateAmmount from './updateAmmount';
import updatePrice from './updatePrice';
import updateSummary from './updateSummary';

export default function plusClicked(event: Event, cart: Cart) {
  const target = event.target as HTMLElement;
  const wrapper = target.closest('.items-container__item') as HTMLElement;
  const indexElement = wrapper.firstChild as HTMLElement;
  const index = indexElement.innerText;

  const item = cart.products[parseInt(index) - 1];

  if ((item.count || 1) >= item.stock) {
    return;
  }

  item.count = item.count ? item.count + 1 : 2;

  updateAmmount(wrapper, item);
  updatePrice(wrapper, item);
  updateSummary(cart);

  cart.moveFromCartToStorage();
}
