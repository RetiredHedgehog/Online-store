import Cart from "../classes/Cart";
import createItemsBlock from "./itemsBlock/itemsBlock";

export default function createCart(cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container');

  wrapper.append(
    createItemsBlock(cart),
  );

  return wrapper;
}
