import productItem from 'interfaces/productsItem';

export default function createBreadcrumbs(item: productItem) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main-container__breadcrumbs-container');

  const separator = '>';
  const root = 'STORE';
  const category = item.category.toUpperCase();
  const brand = item.brand.toUpperCase();
  const title = item.title.toUpperCase();

  wrapper.append(
    ...[root, category, brand, title].reduce(
      (acc: HTMLElement[], text: string, index: number) => {
        if (index !== 0) {
          const separatorElement = document.createElement('div');
          separatorElement.innerText = separator;

          acc.push(separatorElement);
        }

        const element = document.createElement('div');
        element.innerText = text;

        acc.push(element);
        return acc;
      },
      []
    )
  );

  return wrapper;
}
