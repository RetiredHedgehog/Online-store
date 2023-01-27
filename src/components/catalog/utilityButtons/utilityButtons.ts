import btnCopyClicked from './btnCopyClicked';
import btnResetClicked from './btnResetClicked';
import btnRowColumnClicked from './rowColumnClicked';

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
  btnCopy.addEventListener('click', () => btnCopyClicked());

  const btnColumn = document.createElement('div');
  btnColumn.id = 'column';
  btnColumn.classList.add('visualFilters__btn', 'btn', 'btn-direction');

  btnColumn.innerText = 'Column direction';
  btnColumn.addEventListener('click', () => btnRowColumnClicked('column'));

  const btnRow = document.createElement('div');
  btnRow.id = 'row';
  btnRow.classList.add('visualFilters__btn', 'btn', 'btn-direction');

  btnRow.innerText = 'Row direction';
  btnRow.addEventListener('click', () => btnRowColumnClicked('row'));

  wrapper.append(btnReset, btnCopy, btnColumn, btnRow);

  return wrapper;
}
