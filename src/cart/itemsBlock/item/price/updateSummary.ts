import Cart from "../../../../classes/Cart";

export default function updateSummary(cart: Cart) {
  const nodeTotal = document.getElementsByClassName('summary__info-total')[0] as HTMLElement;
  const nodeCount = document.getElementsByClassName('summary__info-count')[0] as HTMLElement;

  if (nodeTotal && nodeCount) {
    nodeTotal.innerText = `Total: ${cart.total}`;
    nodeCount.innerText = `Products: ${cart.count}`;
  }
}
