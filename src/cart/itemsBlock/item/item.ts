import Cart from "../../../classes/Cart";
import { productItem } from "../../../interfaces/productsItem";

export default function createItem(
  item: productItem,
  index: number,
  cart: Cart,
  ) {

  const wrapper = document.createElement('div');
  wrapper.classList.add('items-container__item');

  

  return wrapper;
}
