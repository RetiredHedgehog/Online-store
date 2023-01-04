import Cart from "../../classes/Cart";
import { productItem } from "../../interfaces/productsItem";
import createItem from "./item/item";

export default function createItemsBlock(cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container__items-container');

  const wrapperTitle = document.createElement('div');
  wrapperTitle.classList.add('items-container__title-container');

  const title = document.createElement('h2');
  title.classList.add('items-container__title');

  title.innerText = cart.length > 0 ? 'Items in your cart' : 'Your cart is empty!';

  wrapperTitle.append(title);

  const wrapperItems = document.createElement('div');
  wrapperItems.classList.add('items-container');

  wrapperItems.replaceChildren(
    ...cart.products.map((element: productItem, index: number) =>
      createItem(element, index, cart)
    )
  );

  wrapper.append(wrapperTitle, wrapperItems);
  return wrapper;
}
