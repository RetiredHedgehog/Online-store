import { closePopUp } from "./togglePopUp";

function validate(
  name: HTMLInputElement,
  number: HTMLInputElement,
  address: HTMLInputElement,
  email: HTMLInputElement,
  ) {
  const regexpName =/^[a-z]{3,} [a-z]{3,}$/i;
  const regexpNumber = /^[+]\d{9,}$/;
  const regexpAddress = /^\w{5,} \w{5,} \w{5,}$/i;
  const regexpEmail = /^[\w\d.]+@[\w\d]+[.][\w\d]{2,}$/i;

  // TODO: fully implement validation
  console.log(
    name.value, name.value.search(regexpName), '\n',
    number.value, number.value.search(regexpNumber), '\n',
    address.value, address.value.search(regexpAddress), '\n',
    email.value, email.value.search(regexpEmail), '\n',
  );
}


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

  btnSubmit.addEventListener('click', (event: Event) => 
    validate(
      name,
      number,
      address,
      email,
    )
  );

  const form = document.createElement('div');
  form.classList.add('popUp__form');

  form.append(
    name,
    number,
    address,
    email,
    btnSubmit,
  );

  wrapperInfo.append(title, form);

  wrapper.append(wrapperInfo);

  return wrapper;
}
