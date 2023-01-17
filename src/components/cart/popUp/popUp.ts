import catalog from '@/components/catalog/catalog';
import Cart from 'classes/Cart';
import { closePopUp } from './togglePopUp';

function validate(
  name: HTMLElement,
  number: HTMLElement,
  address: HTMLElement,
  email: HTMLElement,
  cardNumber: HTMLElement,
  cardDate: HTMLElement,
  cardCVV: HTMLElement
) {
  let isValid = true;

  const getValue = (element: HTMLElement) =>
    (<HTMLInputElement>(
      element.getElementsByClassName('user-input-block__input')[0]
    )).value;
  const showError = (element: HTMLElement) =>
    (<HTMLParagraphElement>(
      element.getElementsByClassName('user-input-block__error')[0]
    )).classList.remove('disabled');

  const regexpName = /^([a-z]{3,} ){1,}[a-z]{3,}$/i;
  if (getValue(name).search(regexpName) === -1) {
    showError(name);

    isValid = false;
  }

  const regexpNumber = /^[+]\d{9,}$/;
  if (getValue(number).search(regexpNumber) === -1) {
    showError(number);

    isValid = false;
  }

  const regexpAddress = /^(\w{5,} ){2,}(\w{5,})$/i;
  if (getValue(address).search(regexpAddress) === -1) {
    showError(address);

    isValid = false;
  }

  const regexpEmail = /^[\w\d.]+@[\w\d]+[.][\w\d]{2,}$/i;
  if (getValue(email).search(regexpEmail) === -1) {
    showError(email);

    isValid = false;
  }

  const regexpCardNumber = /^\d{16}$/i;
  if (getValue(cardNumber).search(regexpCardNumber) === -1) {
    showError(cardNumber);

    isValid = false;
  }

  const [month, day] = getValue(cardDate)
    .replace(/\/+/g, '/')
    .split('/')
    .map(Number);
  if (!(month > 0 && month <= 12 && day > 0 && day <= 31)) {
    showError(cardDate);

    isValid = false;
  }

  const regexpCardCVV = /^\d{3}$/i;
  if (getValue(cardCVV).search(regexpCardCVV) === -1) {
    showError(cardCVV);

    isValid = false;
  }

  return isValid;
}

function createInputBlock(placeholder: string, errorMessage: string) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('popUp__user-input-block');

  const input = document.createElement('input');
  input.classList.add('user-input-block__input');
  input.type = 'text';
  input.placeholder = `${placeholder}`;

  const error = document.createElement('p');
  error.classList.add('user-input-block__error', 'disabled');
  error.innerText = `${errorMessage}`;

  wrapper.append(input, error);
  return wrapper;
}

export default function createPopUp(cart: Cart) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('disabled', 'popUp');
  wrapper.addEventListener('click', closePopUp);

  const wrapperInfo = document.createElement('div');
  wrapperInfo.classList.add('popUp__info');

  const title = document.createElement('h2');
  title.innerText = 'Personal details';

  const name = createInputBlock(
    'Name',
    'Name must contain at least TWO words, at least THREE characters each.'
  );

  const number = createInputBlock(
    'Number',
    'Number must start with a PLUS SIGN, contain NUMBERS ONLY and be at least NINE characters long.'
  );

  const address = createInputBlock(
    'Address',
    'Address must contain at least THREE words, at least FIVE characters each.'
  );

  const email = createInputBlock('Email', 'Email is not valid.');

  const formPrsonalInfo = document.createElement('div');
  formPrsonalInfo.classList.add('popUp__form');

  formPrsonalInfo.append(name, number, address, email);

  const titleCard = document.createElement('h2');
  titleCard.innerText = 'Card details';

  const cardNumber = createInputBlock(
    'Card number',
    'Card number must contain 16 digits.'
  );

  const cardDate = createInputBlock(
    'Card expiration date (month/date)',
    'Card number must contain FOUR digits, month must be greater than 0 and less than 12.'
  );

  cardDate.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.value.length === 2) {
      target.value += '/';
    }
  });

  const cardCVV = createInputBlock(
    'Card CVV',
    'Card CVV must contain THREE digits.'
  );

  const formCardInfo = document.createElement('div');
  formCardInfo.classList.add('popUp__form');

  formCardInfo.append(cardNumber, cardDate, cardCVV);

  const btnSubmit = document.createElement('button');
  btnSubmit.innerText = 'Submit';

  btnSubmit.addEventListener('click', () => {
    Array.from(
      <HTMLCollection>document.getElementsByClassName('user-input-block__error')
    ).forEach((element) => element.classList.add('disabled'));

    if (validate(name, number, address, email, cardNumber, cardDate, cardCVV)) {
      const text = document.createElement('h2');
      text.innerText =
        'Congratulations on your successful purchase! Now you will be redirected to the main page.';

      document.getElementsByClassName('popUp__info')[0].replaceChildren(text);

      cart.flush();

      setTimeout(() => {
        history.pushState(null, '', `/`);

        catalog(cart);
      }, 3000);
    }
  });

  wrapperInfo.append(
    title,
    formPrsonalInfo,
    titleCard,
    formCardInfo,
    btnSubmit
  );

  wrapper.append(wrapperInfo);

  return wrapper;
}
