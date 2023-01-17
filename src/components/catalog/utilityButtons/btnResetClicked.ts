import resetActive from '../resetActive';

export default function btnResetClicked() {
  // active buttons
  resetActive();

  // url
  const currentURL = new URL(location.href);

  for (const key of Array.from(currentURL.searchParams.keys())) {
    currentURL.searchParams.delete(key);
  }

  window.history.replaceState(null, '', currentURL);

  // checkboxes
  (<HTMLInputElement[]>(
    Array.from(document.getElementsByClassName('inputCheckbox__checkbox'))
  )).forEach((item: HTMLInputElement) => (item.checked = false));

  // searchbar
  const searchbar = document.getElementById('search') as HTMLInputElement;

  if (searchbar) {
    searchbar.value = '';
  }
}
