import productItem from 'interfaces/productsItem';

export default function updatePrice(
  wrapper: HTMLElement,
  item: productItem,
  sign = '$'
) {
  const element = wrapper.getElementsByClassName(
    'price-container__price'
  )[0] as HTMLElement;

  if (element) {
    element.innerText = `${sign}${(item.count || 1) * item.price}`;
  }
}
