import productItem from 'interfaces/productsItem';

export default function createItem(item: productItem) {
  //let rand = Math.floor(Math.random()*item.images.length);

  const wrapper = document.createElement('div');
  wrapper.classList.add('main_container_item');
  wrapper.dataset.value = `${item.brand.toLowerCase()};${item.category.toLowerCase()};${
    item.price
  };${item.stock};${item.title.toLowerCase()}`;
  wrapper.dataset.id = `${item.id}`;

  const image = document.createElement('img');
  image.classList.add('main_container_item_img');
  image.src = item.images[0];
  image.alt = `${item.title}`;

  const wrapperHeading = document.createElement('div');
  wrapperHeading.classList.add('main_container_item_heading');

  const headingTitle = document.createElement('div');
  headingTitle.innerText = item.title;

  const hedingPrice = document.createElement('div');
  hedingPrice.innerText = `$${item.price}`;

  wrapperHeading.append(headingTitle, hedingPrice);

  const wrapperCategories = document.createElement('div');
  wrapperCategories.classList.add('categories');

  const category = document.createElement('p');
  category.innerText = `Category: ${item.category}`;

  const brand = document.createElement('p');
  brand.innerText = `Brand: ${item.brand}`;

  const price = document.createElement('p');
  price.innerText = `Price: $${item.price}`;

  const discountPercentage = document.createElement('p');
  discountPercentage.innerText = `Discount: ${item.discountPercentage}%`;

  const rating = document.createElement('p');
  rating.innerText = `Rating: ${item.rating}`;

  const stock = document.createElement('p');
  stock.innerText = `Stock: ${item.stock}`;

  wrapperCategories.append(
    category,
    brand,
    price,
    discountPercentage,
    rating,
    stock
  );

  const btnAddToCart = document.createElement('button');
  btnAddToCart.id = 'addToCart';
  btnAddToCart.classList.add('btn');

  btnAddToCart.innerText = 'Add to cart';

  const btnDetails = document.createElement('button');
  btnDetails.id = 'details';
  btnDetails.classList.add('btn');

  btnDetails.innerText = 'Details';

  wrapper.append(
    image,
    wrapperHeading,
    wrapperCategories,
    btnAddToCart,
    btnDetails
  );

  return wrapper;
}
