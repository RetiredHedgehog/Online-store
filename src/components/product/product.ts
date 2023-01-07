import Cart from "../classes/Cart";
import productItem from "../interfaces/productsItem";
import createBreadcrumbs from "./breadcrumbs/breadcrumbs";
import createItem from "./item/item";

export default function createProduct(id: number, cart: Cart) {
  const item = cart.productsFetched.find((item: productItem) => item.id === id);

  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container');

  wrapper.append(
    createBreadcrumbs(item),
    createItem(item, cart)
  );

  return wrapper;
}
