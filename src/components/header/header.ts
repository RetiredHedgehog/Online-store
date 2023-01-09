import Cart from "classes/Cart";
import createCart from "../cart/cart";

export default function createHeader(cart: Cart) {
  const header = document.createElement('header');

  const url = new URL(location.href);
  const text = url.searchParams.get('inpText') || '';

  header.innerHTML= `
    <a class="header_logo_a" href="index.html">
      <div class="header_logo"></div>
    </a>
    <form> 
      <input id="search" type="text" name="text" class="search" value="${text}" placeholder="Search here!">
    </form>
  `;

  const btnCatalog = document.createElement('div');
  btnCatalog.classList.add('header__logo-btn', 'btn');

  btnCatalog.addEventListener('click', (event: Event) => {
    history.pushState(null, null, ``);

    // document.getElementsByClassName('main')[0].replaceChildren(catalog(cart));
  });

  const btnCart = document.createElement('div');
  btnCart.classList.add('header__cart-btn', 'btn');

  btnCart.addEventListener('click', (event: Event) => {
    history.pushState(null, null, `#/cart`);

    document.getElementsByClassName('main')[0].replaceChildren(createCart(cart));
  });

  header.prepend(btnCatalog);
  header.append(btnCart);

  return header;
}
