import Cart from 'classes/Cart';
import productItem from 'interfaces/productsItem';
import createItem from './item/item';
import createSummary from './summary/summary';

export default function createItemsBlock(cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container__items-container');

  const wrapperItems = document.createElement('div');
  wrapperItems.classList.add('items-container');

  wrapperItems.replaceChildren(
    ...cart.products.map((element: productItem, index: number) =>
      createItem(element, index, cart)
    )
  );

  wrapper.append(wrapperItems, createSummary(cart));
  return wrapper;
}
