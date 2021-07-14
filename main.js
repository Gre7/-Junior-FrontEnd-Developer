const tableUsers = document.getElementById('tableUsers');
const container = document.getElementById('container');
const table = document.querySelector('.table');
const searchContainer = document.querySelector('.search-container');
const inputSearch = document.querySelector('.input-search');
const clearBtn = document.querySelector('.button_clear');
const loader = document.createElement('div');
const message = document.querySelector('.message');

let userList = [];
let tooltipImg;

//Createloader
const createLoader = () => {
  document.body.append(loader);
  loader.className = 'lds-roller';
  loader.insertAdjacentHTML(
    'beforeend',
    `
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  `
  );
  searchContainer.className = 'hide';
};

createLoader();

const removeLoader = () => {
  loader.remove();
};

//Server request
fetch('https://randomuser.me/api/?results=15')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error at ${url}, error status: ${response.status}!`);
    }
    return response.json();
  })
  .catch(console.log)
  .then((options) => {
    userList = options.results;
    updateTable(userList);
  });

const updateTable = (users) => {
  tableUsers.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Picture</th>
      <th>Location</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Registered Date</th>
    </tr>
    `;
  users.forEach(createUsers);
};

//renderUsers
const createUsers = (options) => {
  const registeredDate = options.registered.date
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('-');

  tableUsers.insertAdjacentHTML(
    'beforeend',
    `
    <tr>
      <th>${options.name.first + ' ' + options.name.last}</th>
      <th>
          <img src="${options.picture.thumbnail}" data-login-user-name="${
      options.login.username
    }">
      </th>
      <th>${options.location.state + ' ' + options.location.city}</th>
      <th>${options.email}</th>
      <th>${options.phone}</th>
      <th>${registeredDate}</th>
    </tr>
  </table>
  `
  );
  searchContainer.className = 'search-container';
  removeLoader();
};

//Filter
const filterInput = () => {
  const text = inputSearch.value.replace(/\s/g, '').toLowerCase();

  const filteredList = userList.filter(
    (user) =>
      user.name.first.toLowerCase().indexOf(text) !== -1 ||
      user.name.last.toLowerCase().indexOf(text) !== -1 ||
      (user.name.first.toLowerCase() + user.name.last.toLowerCase()).indexOf(
        text
      ) !== -1
  );
  if (filteredList.length === 0) {
    message.classList.remove('hide');
    tableUsers.classList.add('hide');
  } else {
    message.classList.add('hide');
    tableUsers.classList.remove('hide');
  }
  updateTable(filteredList);
};

//Clearing input area
const clearInput = () => {
  inputSearch.value = '';
  message.classList.add('hide');
  tableUsers.classList.remove('hide');
  updateTable(userList);
};

//debounce function
const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

//tooltip with img
const addToolTip = (event) => {
  let target = event.target;
  if (target.tagName != 'IMG') return;
  const username = target.dataset.loginUserName;

  for (user of userList) {
    if (username === user.login.username) {
      tooltipImg = document.createElement('div');
      tooltipImg.className = 'tooltip';
      tooltipImg.innerHTML = `<img src="${user.picture.large}" >`;
      document.body.append(tooltipImg);

      let coords = target.getBoundingClientRect();

      let left =
        coords.left + (target.offsetWidth - tooltipImg.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipImg.offsetHeight - 5;
      if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
      }

      tooltipImg.style.left = left + 'px';
      tooltipImg.style.top = top + 'px';
    }
  }
};

const removeToolTip = (event) => {
  let target = event.target;
  if (target.tagName != 'IMG') return;

  if (tooltipImg) {
    tooltipImg.remove();
    tooltipImg = null;
  }
};

//Wrapping search in a debounce function
inputSearch.addEventListener('keyup', debounce(filterInput, 500));
//Clearing input area
clearBtn.addEventListener('click', clearInput);
//Add tooltip
tableUsers.addEventListener('mouseover', addToolTip);
//Remove tooltip
tableUsers.addEventListener('mouseout', removeToolTip);
