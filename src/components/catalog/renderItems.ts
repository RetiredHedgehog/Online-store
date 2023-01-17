import productItem from 'interfaces/productsItem';

export default function renderItems(array: productItem[] = []) {
  const mainContainerMini = document.getElementById('main_container_mini');

  if (!mainContainerMini) {
    return;
  }

  mainContainerMini.innerHTML = '';

  array.forEach((item: productItem) => {
    const rand = Math.floor(Math.random() * item.images.length);

    mainContainerMini.innerHTML += `
      <div class='main_container_item' value='${item.brand.toLowerCase()};${item.category.toLowerCase()};${
      item.price
    };${item.stock};${item.title.toLowerCase()}' data-id='${
      item.id
    }' name='' id=''>
      <img src=${item.images[rand]} class='main_container_item_img' alt='${
      item.title
    }'/>
      <div class='main_container_item_heading'>
        <div>${item.title}</div>
        <div>$${item.price}</div>

        </div>
        <div class='categories'>
          <p>Category: ${item.category}</p>
          <p>Brand: ${item.brand}</p>
          <p>Price: ${item.price}</p>
          <p>Discount: ${item.discountPercentage}</p>
          <p>Rating: ${item.rating}</p>
          <p>Stock: ${item.stock}</p>
        </div>
        <button id='addToCart' class='btn'>Add to cart</button>
        <button id='details' class='btn'>Details</button>
      </div>
    `;
  });
}
