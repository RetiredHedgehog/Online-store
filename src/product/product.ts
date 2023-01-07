import Cart from "../classes/Cart";
import productItem from "../interfaces/productsItem";
import createBreadcrumbs from "./breadcrumbs/breadcrumbs";
import createItem from "./item/item";

// TODO: implement item detection through url afterouter is ready
export default function createProduct(item: productItem, cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container');

  wrapper.append(
    createBreadcrumbs(item),
    createItem(item, cart)
  );

  return wrapper;
}
