/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { BASE_URL } from './modules/fetch.js';
import { clearErrorsArr, checkInput, errorsArr } from './modules/validation.js';

const formEl = document.querySelector('.login-form');
const errorMsgEl = document.querySelectorAll('.error-msg');
const successMsgEl = document.querySelector('.success-msg');
const errEl = document.getElementById('err');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  clearErrorsArr();
  checkInput(loginObj.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(loginObj.password, 'password', ['required', 'minLength-5', 'maxLength-20']);

  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs.success === true) {
    errorMsgEl.textContent = '';
    successMsg('Okey!');
    const { token } = dataInJs;
    localStorage.setItem('articleUserToken', token);
    // window.location.href = 'groups.html';
    clearErrors();
  } else {
    errorMsgEl.textContent = '';
    console.log('login fail');
    handleError(dataInJs);
  }
});

function handleError(msg) {
  errEl.textContent = '';
  if (typeof msg === 'string') {
    errEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

function successMsg(msg) {
  successMsgEl.textContent = '';
  if (typeof msg === 'string') {
    successMsgEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((sObj) => {
      const elWithSuccess = formEl.elements[sObj.field];
      elWithSuccess.classList.add('success-msg');
      elWithSuccess.nextElementSibling.textContent = sObj.message;
    });
  }
}

function clearErrors() {
  clearErrorsArr();
  errorMsgEl.forEach((htmlElement) => {
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
