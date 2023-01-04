import Cart from "../../../classes/Cart";
import { productItem } from "../../../interfaces/productsItem";
import createIndex from "./index";

export default function createItem(
  item: productItem,
  index: number,
  cart: Cart,
  ) {

  const wrapper = document.createElement('div');
  wrapper.classList.add('items-container__item');

  wrapper.append(
    createIndex(index),
  );

  return wrapper;
}
