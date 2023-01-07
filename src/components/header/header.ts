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

  const btnCart = document.createElement('div');
  btnCart.classList.add('header__cart-btn', 'btn');

  // TODO: change to router
  btnCart.addEventListener('click', (event: Event) =>
    document.getElementsByClassName('main')[0].replaceChildren(createCart(cart)));

  header.append(btnCart)

  return header;
}
