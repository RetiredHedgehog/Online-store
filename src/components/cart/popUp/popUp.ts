import { closePopUp } from "./togglePopUp";

export default function createPopUp() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('disabled', 'popUp');
  wrapper.addEventListener('click', closePopUp);

  const wrapperInfo = document.createElement('div');
  wrapperInfo.classList.add('popUp__info');

  const title = document.createElement('h2');
  title.innerText = 'Personal details';

  const name = document.createElement('input');
  name.type = 'text';
  name.required = true;
  name.placeholder = 'Name';

  const number = document.createElement('input');
  number.type = 'text';
  number.required = true;
  number.placeholder = 'Number';

  const address = document.createElement('input');
  address.type = 'text';
  address.required = true;
  address.placeholder = 'Address';

  const email = document.createElement('input');
  email.type = 'text';
  email.required = true;
  email.placeholder = 'Email';

  const btnSubmit = document.createElement('button');
  btnSubmit.innerText = 'Submit';

  const form = document.createElement('form');
  form.classList.add('popUp__form')
  form.append(name, number, address, email, btnSubmit);
  wrapperInfo.append(title, form);

  wrapper.append(wrapperInfo);

  return wrapper;
}
