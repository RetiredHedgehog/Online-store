export default function resetActive() {
  Array.from(document.getElementsByClassName('burgerSearch__btn')).forEach(
    (btn) => {
      btn.classList.remove('active');
    }
  );
}
