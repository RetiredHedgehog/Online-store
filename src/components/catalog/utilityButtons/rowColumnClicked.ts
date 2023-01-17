export default function btnRowColumnClicked(direction: string) {
  const buttons = Array.from(document.getElementsByClassName('btn-direction'));

  buttons.forEach((button) => button.classList.remove('active'));

  const button = document.getElementById(direction);
  button.classList.add('active');

  const mainContainerMini = document.getElementById('main_container_mini');

  mainContainerMini.classList.remove('main_container_mini-column');
  mainContainerMini.classList.remove('main_container_mini-row');

  mainContainerMini.classList.add(`main_container_mini-${direction}`);

  const url = new URL(location.href);

  url.searchParams.delete('flexDirection');
  url.searchParams.append('flexDirection', direction);

  window.history.replaceState(null, null, url);
}
