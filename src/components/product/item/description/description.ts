import productItem from 'interfaces/productsItem';

export default function createDescription({
  description,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  price,
}: productItem) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('details-container__description-container');

  const fields = {
    description,
    'Discount Percentage': discountPercentage,
    rating,
    stock,
    brand,
    category,
    price,
  };

  for (const field in fields) {
    const wrapperContainer = document.createElement('div');
    wrapperContainer.classList.add('details-container__container');

    const heading = document.createElement('h2');
    heading.classList.add('description-container__heading');
    heading.innerText = field.charAt(0).toUpperCase() + field.slice(1);

    const text = document.createElement('p');
    text.classList.add('description-container__text');
    text.innerText = fields[field as keyof typeof fields].toString();

    wrapperContainer.append(heading, text);
    wrapper.append(wrapperContainer);
  }

  return wrapper;
}
