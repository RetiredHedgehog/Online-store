import { productItem } from "../interfaces/productsItem";

export default function createProduct(item: productItem) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container');

  wrapper.append();

  return wrapper;
}
