import productItem from 'interfaces/productsItem';
import createGallery from './gallery/gallery';
import createBigImage from './bigImage/bigImage';
import createDescription from './description/description';
import createCheckout from './checkout/checkout';
import Cart from 'classes/Cart';

export default function createItem(item: productItem, cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container__item-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('item-container__title');
  titleWrapper.innerText = item.title;

  const detailsWrapper = document.createElement('div');
  detailsWrapper.classList.add('item-container__details-container');

  detailsWrapper.append(
    createGallery(item.images),
    createBigImage(item.images[0]),
    createDescription(item),
    createCheckout(item, cart)
  );

  wrapper.append(titleWrapper, detailsWrapper);
  return wrapper;
}
