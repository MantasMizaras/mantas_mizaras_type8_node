const BASE_URL = 'http://localhost:3000/api';
const token = localStorage.getItem('groupUserToken');
const cardContainerEl = document.querySelector('.group-container');

function makeEl(tagName, text, elClass, dest) {
  const el = document.createElement(tagName);
  el.textContent = text;
  el.className = elClass;
  dest.append(el);
  return el;
}

function renderGroups(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((cObj) => {
    const groupArticleEl = makeEl('article', '', 'card-group', dest);
    makeEl('h3', `ID: ${cObj.group_id}`, 'card-id', groupArticleEl);
    makeEl('p', `${cObj.name}`, 'card-group-title', groupArticleEl);
    groupArticleEl.addEventListener('click', () => {
      window.location.href = `bills.html?group_id=${cObj.group_id} + ${cObj.name}`;
    });
  });
}

async function getAccounts(token) {
  try {
    const resp = await fetch(`${BASE_URL}/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('resp ===', resp);
    // if (!Array.isArray(resp)) {
    //   console.log('Your session has expired!');
    //   window.location.href = 'login.html';
    // }

    const dataInJs = await resp.json();
    console.log('dataInJs ===', dataInJs);
    renderGroups(dataInJs, cardContainerEl);
    console.log('dataInJs  ===', resp);
  } catch (error) {
    console.log('error in get groups ===', error);
  }
}
getAccounts(token);
