import Cart from 'classes/Cart';
import productItem from 'interfaces/productsItem';
import createImage from './image';
import createIndex from './index';
import createInfo from './info';
import createPrice from './price';

export default function createItem(
  item: productItem,
  index: number,
  cart: Cart
) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('items-container__item');

  // TODO: add link to item page
  wrapper.append(
    createIndex(index),
    createImage(item),
    createInfo(item),
    createPrice(item, cart)
  );

  return wrapper;
}
