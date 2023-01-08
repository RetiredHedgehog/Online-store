import createProduct from "@/components/product/product";
import Cart from "classes/Cart";

export default function createMiniContainer(cart: Cart) {
  const wrapper = document.createElement('div');

  wrapper.id = 'main_container_mini';
  wrapper.classList.add('main_container_mini');

  const currentURL = new URL(location.href);

  wrapper.addEventListener('click', (event:Event) => {
    const target = event.target as HTMLElement;
    const element = target.closest('.main_container_item') as HTMLElement;
    const productId = parseInt(element.dataset.id);

    if (target.id === 'addToCart')  {
      cart.addItem(productId);
      return;
    }

    // TODO: change it to router
    if (target.id === 'details') {
      currentURL.search = '';

      window.history.pushState(null, null, `${currentURL}#/products/${productId}`);

      document.getElementsByClassName('main')[0].replaceChildren(createProduct(cart));
      return;
    }
  });

  wrapper.append();
  return wrapper;
}
