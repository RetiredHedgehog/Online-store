import Cart from 'classes/Cart';
import createDoubleSlider from './doubleSlider/doubleSlider';
import createList from './list/list';
// TODO: change nav to aside
function createFilterWrapper(headingText: string) {
  const wrrapper = document.createElement('div');
  wrrapper.classList.add('nav-container__item');

  const wrapperHeading = document.createElement('div');
  wrapperHeading.classList.add('nav-container__header');

  const heading = document.createElement('p');
  heading.innerText = headingText;
  wrapperHeading.append(heading);

  wrrapper.append(wrapperHeading);
  return wrrapper;
}

// TODO: delete containerName. it's there only temporary
function createFilterBlock(
  headingText: string,
  innerBlock: HTMLElement,
  containerName: string
) {
  const block = createFilterWrapper(headingText);

  const wrrapper = document.createElement('div');
  wrrapper.id = `nav-container__main${containerName}`;
  wrrapper.classList.add('nav-container__main');

  wrrapper.append(innerBlock);

  block.append(wrrapper);
  return block;
}

export default function createFilters(cart: Cart) {
  const wrrapper = document.createElement('aside');
  wrrapper.classList.add('aside-container');

  wrrapper.append(
    createFilterBlock('Brand', createList(), '-brand'),
    createFilterBlock('Category', createList(), '-category'),
    createFilterBlock(
      'Price',
      createDoubleSlider({
        className: 'nav-container__main_price',
        text: 'Price',
        cart,
        sortingField: 'price',
      }),
      '-price'
    ),
    createFilterBlock(
      'Stock',
      createDoubleSlider({
        className: 'nav-container__main_price',
        text: 'Stock',
        cart,
        sortingField: 'stock',
      }),
      '-stock'
    )
  );

  return wrrapper;
}
