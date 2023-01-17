import productItem from 'interfaces/productsItem';

export default function createImage(item: productItem) {
  const image = document.createElement('img');
  image.classList.add('item__image');

  image.src = item.thumbnail;
  image.alt = item.title;

  return image;
}
