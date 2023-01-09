import Cart from "classes/Cart";

export default function updateSummary(cart: Cart) {
  const total = document.getElementsByClassName('info-container__total')[0] as HTMLElement;
  const ammount = document.getElementsByClassName('info-container__ammount')[0] as HTMLElement;
const Cart = document.getElementById('btnCart')
console.log(Cart)
  if (total && ammount) {
    total.innerText = `Total: ${cart.total}`;
    ammount.innerText = `Products: ${cart.count}`;
    Cart.innerHTML = `${cart.count}`
  }
}
