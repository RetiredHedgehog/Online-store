export default function createBigImage(image: string) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('details-container__big-image-container');

  const imageElement = document.createElement('img');
  imageElement.classList.add('big-image-container__image');

  imageElement.alt = `item big image`;
  imageElement.src = image;

  wrapper.append(imageElement);

  return wrapper;
}
