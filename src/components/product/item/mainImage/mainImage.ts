export default function createMainImage(image: string) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('details-container__main-image-container');

  const imageElement = document.createElement('img');
  imageElement.classList.add('main-image-container__image');

  imageElement.alt = `enlarged image of the current product from the gallery`;
  imageElement.src = image;

  wrapper.append(imageElement);

  return wrapper;
}
