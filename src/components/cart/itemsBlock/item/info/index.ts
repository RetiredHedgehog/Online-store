import productItem from 'interfaces/productsItem';

export default function createInfo(item: productItem) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('item__info');

  const title = document.createElement('h2');
  title.innerText = item.title;

  const description = document.createElement('div');
  description.innerText = item.description;

  const rating = document.createElement('p');
  rating.innerText = `Rating: ${item.rating}`;

  const discount = document.createElement('p');
  discount.innerText = `Discount: ${item.discountPercentage}%`;

  wrapper.append(title, description, rating, discount);
  return wrapper;
}
