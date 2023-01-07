import productItem from "../../../interfaces/productsItem";

export default function createCheckout(item: productItem) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('details-container__checkout-container');

  const price = document.createElement('h2');
  price.innerText = `$${item.price}`;

  // TODO: change functionality if product is in a cart
  const btnToggleCart = document.createElement('button');
  btnToggleCart.innerText = 'add to cart'.toUpperCase();

  // TODO: implement cart redirection when  router is ready
  const btnBuyNow = document.createElement('button');
  btnBuyNow.innerText = 'buy now'.toUpperCase();

  wrapper.append(price, btnToggleCart, btnBuyNow)
  return wrapper;
}
