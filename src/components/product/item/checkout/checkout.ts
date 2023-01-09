import Cart from "classes/Cart";
import productItem from "interfaces/productsItem";
import { cartCurrentValue } from "@/components/header/header";

function toggleCart(event: Event, cart: Cart, id: number) {
  const target = event.currentTarget as HTMLElement;

  if (target.classList.contains('remove')) {
    cart.removeItembyId(id);
    cartCurrentValue(false)
    target.innerText = 'add to cart'.toUpperCase();

    target.classList.add('add');
    target.classList.remove('remove');

    return;
  }

  if (target.classList.contains('add')) {
    cart.addItem(id);
    cartCurrentValue(true)
    target.innerText = 'remove from cart'.toUpperCase();

    target.classList.add('remove');
    target.classList.remove('add');

    return;
  }
}

export default function createCheckout(item: productItem, cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('details-container__checkout-container');

  const price = document.createElement('h2');
  price.innerText = `$${item.price}`;

  // TODO: change functionality if product is in a cart
  const btnToggleCart = document.createElement('button');
  btnToggleCart.classList.add('btn');

  if (cart.products.find((itemSearch: productItem) =>  itemSearch.id === item.id) === undefined) {
    btnToggleCart.innerText = 'add to cart'.toUpperCase();
    btnToggleCart.classList.add('add');
  } else {
    btnToggleCart.innerText = 'remove from cart'.toUpperCase();
    btnToggleCart.classList.add('remove');
  }

  btnToggleCart.addEventListener('click', (event) => toggleCart(event, cart, item.id));

  // TODO: implement cart redirection when  router is ready
  const btnBuyNow = document.createElement('button');
  btnBuyNow.innerText = 'buy now'.toUpperCase();
  btnBuyNow.classList.add('btn');

  wrapper.append(price, btnToggleCart, btnBuyNow)
  return wrapper;
}
