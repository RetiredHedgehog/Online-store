import Cart from 'classes/Cart';
import productItem from 'interfaces/productsItem';
import createBreadcrumbs from './breadcrumbs/breadcrumbs';
import createItem from './item/item';

export default function createProduct(cart: Cart) {
  const id = parseInt(new URL(location.href).hash.split('products/')[1]);
  const item = cart.productsFetched.find((item: productItem) => item.id === id);

  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container');

  if (!item) {
    wrapper.innerText = '404 not found';

    return wrapper;
  }

  wrapper.append(createBreadcrumbs(item), createItem(item, cart));

  return wrapper;
}
