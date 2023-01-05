import productItem from "../../../../interfaces/productsItem";

export default function updateAmmount(wrapper: HTMLElement, item: productItem) {
  const element = wrapper.getElementsByClassName('price-container__ammount')[0] as HTMLElement;
  element.innerText = item.count + '';
}
