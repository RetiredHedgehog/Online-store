import Cart from 'classes/Cart';
import createCart from '../cart/cart';
import catalog from '../catalog/catalog';

export default function createHeader(cart: Cart) {
  const header = document.createElement('header');

  const url = new URL(location.href);
  const text = url.searchParams.get('inpText') || '';

  header.innerHTML = `
    <a class='header_logo_a' href='index.html'>
      <div class='header_logo'></div>
    </a>
    <form> 
      <input id='search' type='text' name='text' class='search' value='${text}' placeholder='Search here!'>
    </form>
    <div class='totalPrice' id='totalPrice'></div>
  `;

  const btnCatalog = document.createElement('div');
  btnCatalog.classList.add('header__logo-btn', 'btn');

  btnCatalog.addEventListener('click', () => {
    history.pushState(null, '', `/`);

    //document.getElementsByClassName('main')[0].replaceChildren(catalog(cart));
    catalog(cart);
  });

  const btnCart = document.createElement('div');

  btnCart.classList.add('header__cart-btn', 'btn');
  btnCart.id = 'btnCart';
  btnCart.innerHTML = `${cart.count}`;

  btnCart.addEventListener('click', () => {
    const currentURL = new URL(location.href);
    currentURL.search = '';

    history.pushState(null, '', `${currentURL.origin}#/cart`);

    document
      .getElementsByClassName('main')[0]
      .replaceChildren(createCart(cart));
  });

  header.prepend(btnCatalog);
  header.append(btnCart);

  return header;
}
