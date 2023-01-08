import Cart from "classes/Cart";
import createFilters from "./filters/filter";
import createMiniContainer from "./miniContainer/miniContainer";
import createSearchButtons from "./searchButtons/searchButtons";
import createUtilityButtons from "./utilityButtons/utilityButtons";

export default function createCatalog(cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('main');

  const wrapperCatalog = document.createElement('div');
  wrapperCatalog.classList.add('main_container');

  wrapperCatalog.append(
    createUtilityButtons(),
    createSearchButtons(),
    createMiniContainer(cart),
  );

  wrapper.append(
    createFilters(cart),
    wrapperCatalog,
  )

  return wrapper;
}
