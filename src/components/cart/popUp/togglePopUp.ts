export function openPopUp() {
  Array.from(
    <HTMLCollection>document.getElementsByClassName('user-input-block__error')
  ).forEach((element) => element.classList.add('disabled'));

  document.getElementsByClassName('popUp')[0]?.classList.remove('disabled');
}

export function closePopUp(event: Event) {
  const target = event.target as HTMLElement;

  if (target.classList.contains('popUp')) {
    document.getElementsByClassName('popUp')[0]?.classList.add('disabled');
  }
}
