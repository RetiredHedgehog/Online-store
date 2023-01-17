import createProduct from '@/components/product/product';
import Cart from 'classes/Cart';

export default function createMiniContainer(cart: Cart) {
  const wrapper = document.createElement('div');

  wrapper.id = 'main_container_mini';
  wrapper.classList.add('main_container_mini', 'main_container_mini-row');

  const currentURL = new URL(location.href);

  wrapper.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    const element = target.closest('.main_container_item') as HTMLElement;

    const productId = parseInt(element.dataset.id || '0');

    if (target.id === 'addToCart') {
      cart.addItem(productId);
      (<HTMLElement>(
        document.getElementsByClassName('header__cart-btn')[0]
      )).innerText = `${cart.count}`;
      (<HTMLElement>(
        document.getElementsByClassName('totalPrice')[0]
      )).innerText = `${cart.total}$`;
      return;
    }

    if (target.id === 'details') {
      currentURL.search = '';

      window.history.pushState(
        null,
        '',
        `${currentURL.origin}#/products/${productId}`
      );

      document
        .getElementsByClassName('main')[0]
        .replaceChildren(createProduct(cart));
      return;
    }
  });

  wrapper.append();
  return wrapper;
}
