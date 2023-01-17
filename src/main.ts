import Cart from 'classes/Cart';
import createProduct from './components/product/product';
import createHeader from './components/header/header';
import createCart from './components/cart/cart';
import catalog from './components/catalog/catalog';
import './styles/Main.css';

(async () => {
  const cart = new Cart();
  await cart.fetchItems();
  cart.moveFromStorageToCart();

  const currentURL = new URL(location.href);
  currentURL.pathname = '/';

  // === HEADER ===
  document.getElementsByTagName('body')[0].prepend(createHeader(cart));
  const price = document.getElementById('totalPrice');
  price!.innerHTML = `${cart.total}$`;

  // === ROUTER ===
  const routes = {
    cart: createCart,
    products: createProduct,
    '': catalog,
  };

  function changeRoute(routes: object) {
    const hash = new URL(location.href).hash.slice(2);

    const route = Object.entries(routes).find(([key, value]) => {
      if (hash.match(new RegExp(key))) {
        return value;
      }

      return false;
    });

    if (route) {
      document
        .getElementsByClassName('main')[0]
        .replaceChildren(route[1](cart));

      return;
    }
  }

  window.addEventListener('popstate', function () {
    changeRoute(routes);
  });

  window.addEventListener('hashchange', function () {
    changeRoute(routes);
  });

  changeRoute(routes);
})();
