/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import { BASE_URL, getFetch } from './modules/fetch.js';

import { checkInput, clearErrorsArr, errorsArr } from './modules/validation.js';

const token = localStorage.getItem('groupUserToken');
const billsContainerEl = document.querySelector('.bills-table-body');
const addBillForm = document.querySelector('.add-bill-form');

const billTitleEl = document.querySelector('.bills-title');

const errorMsgEl = document.querySelectorAll('.error-msg');
const successMsgEl = document.querySelector('.success-msg');

const dynamicTitle = window.location.href.split('+')[1].split('%20').join(' ');
billTitleEl.textContent = dynamicTitle;

function makeEl(tagName, text, elClass, dest) {
  const el = document.createElement(tagName);
  el.textContent = text;
  el.className = elClass;
  dest.append(el);
  return el;
}

function renderBill(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((tObj) => {
    const trEl = makeEl('tr', '', '', dest);
    makeEl('td', `${tObj.group_id}`, '', trEl);
    makeEl('td', `${tObj.description}`, '', trEl);
    makeEl('td', `€ ${tObj.amount}`, '', trEl);
  });
}

async function getBills(userToken) {
  const groupID = window.location.search.split('=');
  const billsArr = await getFetch(`bills/${groupID[1]}`, userToken);
  //   console.log('groupsArr ===', billsArr);
  //   if (!Array.isArray(groupsArr)) {
  //     alert('Login timeout');
  //     window.location.href = 'login.html';
  //   }

  renderBill(billsArr, billsContainerEl);
}

getBills(token);

async function fetchBill(group_id, amount, description) {
  const billObj = { group_id, amount, description };
  const resp = await fetch(`${BASE_URL}/bills?group_id=${group_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(billObj),
  });
  const dataInJs = await resp.json();
  if (dataInJs === 'Bill successfully added') {
    // eslint-disable-next-line no-use-before-define
    successMsg('Bill successfully added');
    errorMsgEl.textContent = '';
    addBillForm.elements.amount.value = '';
    addBillForm.elements.description.value = '';
    getBills(token);
    handleError('Bill not added', true);
  } else if (dataInJs.error === 'invalid token') {
    clearErrors();
    handleError('Invalid token', false);
    // eslint-disable-next-line no-alert
    alert('Login timeout');
    window.location.href = 'login.html';
  } else {
    clearErrors();
    handleError('Bill not added', false);
  }
}

addBillForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const groupID = window.location.search.split('=');
  const billObj = {
    amount: addBillForm.elements.amount.value.trim(),
    description: addBillForm.elements.description.value.trim(),
  };

  clearErrors();
  checkInput(billObj.amount, 'amount', ['required', 'positive']);
  checkInput(billObj.description, 'description', ['required', 'minLength-4', 'maxLength-30']);
  successMsgEl.textContent = '';

  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  fetchBill(groupID[1], billObj.amount, billObj.description);
  window.location.reload();
});

function handleError(msg) {
  errorMsgEl.textContent = '';
  if (typeof msg === 'string') {
    errorMsgEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = addBillForm.elements[eObj.field];
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
      const elWithSuccess = addBillForm.elements[sObj.field];
      elWithSuccess.classList.add('success-msg');
      elWithSuccess.nextElementSibling.textContent = sObj.message;
    });
  }
}

function clearErrors() {
  clearErrorsArr();
  errorMsgEl.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
