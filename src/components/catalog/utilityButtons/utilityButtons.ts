import btnResetClicked from "./btnResetClicked";

export default function createUtilityButtons() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('visualFilters');

  const btnReset = document.createElement('div');
  btnReset.id = 'resetFilt';
  btnReset.classList.add('visualFilters__btn', 'btn');

  btnReset.innerText = 'Reset filters';
  btnReset.addEventListener('click', () => btnResetClicked());

  const btnCopy = document.createElement('div');
  btnCopy.id = 'Copy';
  btnCopy.classList.add('visualFilters__btn', 'btn');

  btnCopy.innerText = 'Copy search string';

  const btnCollumn = document.createElement('div');
  btnCollumn.id = 'column';
  btnCollumn.classList.add('visualFilters__btn', 'btn');

  btnCollumn.innerText = 'Column direction';

  const btnRow = document.createElement('div');
  btnRow.id = 'row';
  btnRow.classList.add('visualFilters__btn', 'btn');

  btnRow.innerText = 'Row direction';

  wrapper.append(
    btnReset,
    btnCopy,
    btnCollumn,
    btnRow,
  );

  return wrapper;
}
