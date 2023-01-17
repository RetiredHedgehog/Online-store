function changeImage(e: Event) {
  const target = e.target as HTMLImageElement;

  if (
    !target.classList.contains('gallery-container__image') ||
    target.classList.contains('gallery-container__image--active')
  ) {
    return;
  }

  const activePhotosArray: Element[] = Array.from(
    document.getElementsByClassName('gallery-container__image--active')
  );

  activePhotosArray.forEach((photo) =>
    photo.classList.remove('gallery-container__image--active')
  );

  target.classList.add('gallery-container__image--active');

  const bigImageElement = document.getElementsByClassName(
    'big-image-container__image'
  )[0] as HTMLImageElement;
  bigImageElement.src = target.src;
}

function asyncFillPhotoWrapper(root: Element, urls: string[]) {
  function wrapImages(photos: string[]) {
    return photos.map((url: string, index: number) => {
      const img = document.createElement('img');

      img.classList.add('gallery-container__image');

      if (index === 0) {
        img.classList.add('gallery-container__image--active');
      }

      img.alt = `item small image ${index}`;
      img.src = url;

      return img;
    });
  }

  const stack: string[] = [];
  const urlsUnique: string[] = [];

  Promise.all(urls.map((url) => fetch(url)))
    .then((data) => data.map((elem) => elem.headers.get('content-length')))
    .then((sizes) => {
      if (sizes.length <= 1) {
        return urls;
      }

      for (let i = 0; i < sizes.length - 1; i++) {
        if (!stack.includes(`${sizes[i]}`)) {
          stack.push(`${sizes[i]}`);
          urlsUnique.push(urls[i]);
        }
      }

      return urlsUnique;
    })
    .then((urls) => root.append(...wrapImages(urls)));
}

export default function createGallery(urls: string[]) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('details-container__gallery-container');

  const photoWrapper = document.createElement('div');
  photoWrapper.classList.add('gallery-container__photo-container');

  photoWrapper.addEventListener('click', changeImage);

  asyncFillPhotoWrapper(photoWrapper, urls);

  wrapper.append(photoWrapper);
  return wrapper;
}
