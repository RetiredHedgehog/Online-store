import { productItem } from "../interfaces/productsItem";
import createBreadcrumbs from "./breadcrumbs/breadcrumbs";

export default function createProduct(item: productItem) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container');

  wrapper.append(
    createBreadcrumbs(item),
  );

  return wrapper;
}
