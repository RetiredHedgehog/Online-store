import { productItem } from "../../interfaces/productsItem";
import createBigImage from "./bigImage/bigImage";

export default function createItem(item: productItem) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('item-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('item-container__title');
  titleWrapper.innerText = item.title;

  const detailsWrapper = document.createElement('div');
  detailsWrapper.classList.add('item-container__details-container');

  detailsWrapper.append(
    createBigImage(item.images[0]),
  );

  wrapper.append(titleWrapper, detailsWrapper);
  return wrapper;
}
