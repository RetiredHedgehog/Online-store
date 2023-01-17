import Cart from 'classes/Cart';
import productItem from 'interfaces/productsItem';

export default function createDoubleSlider({
  className,
  text,
  cart,
  sortingField,
}: {
  className: string;
  text: string;
  cart: Cart;
  sortingField: 'price' | 'stock';
}) {
  const wrapper = document.createElement('div');
  wrapper.id = className;
  wrapper.classList.add(className);

  cart.productsFetched.sort(
    (a: productItem, b: productItem) => a[sortingField] - b[sortingField]
  );

  const min = cart.productsFetched[0][sortingField];
  const max =
    cart.productsFetched[cart.productsFetched.length - 1][sortingField];
  const step = 1;

  wrapper.innerHTML = '';
  wrapper.innerHTML += `
    <div class='nav-container__main__wrapper'>
      <div class='price-input'>
        <div class='field'>
          <input type='number' class='input-min numberInput' id='inputMin${text}' value='${min}'>
        </div>
        <div class='separator'>-</div>
        <div class='field'>
          <input type='number' class='input-max numberInput' id='inputMax${text}' value='${max}'>
        </div>
      </div>
      <div class='slider'>
        <div class='progress' id='progress${text}' />
      </div>
      <div class='range-input'>
        <input type='range' id='inputRangeMin${text}' class='range-min inputs${text}' min='${min}' max='${max}' value='${min}' step='${step}'> 
        <input type='range' id='inputRangeMax${text}' class='range-max inputs${text}' min='${min}' max='${max}' value='${min}' step='${step}'>
      </div>
    </div>`;

  return wrapper;
}
