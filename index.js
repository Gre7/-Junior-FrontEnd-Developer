const tableUsers = document.getElementById('tableUsers');
const container = document.getElementById('container');
const table = document.querySelector('.table');
const searchContainer = document.querySelector('.search-container');
const categories = document.getElementById('categories');
const inputSearch = document.querySelector('.input-search');
const clearBtn = document.querySelector('.button_clear');
const loader = document.createElement('div');
const message = document.querySelector('.message');

let userList = [];

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
  categories.className = 'hide';
};

createLoader();

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
    console.log('userList: ', userList);
    updateTable(userList);
  });

const updateTable = (users) => {
  tableUsers.innerHTML = '';
  users.forEach(createUsers);
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
  } else {
    message.classList.add('hide');
  }
  updateTable(filteredList);
};

inputSearch.addEventListener('keyup', debounce(filterInput, 500));

clearBtn.addEventListener('click', () => {
  inputSearch.value = '';
  message.classList.add('hide');
  updateTable(userList);
});

function debounce(f, ms) {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
}

const removeLoader = () => {
  loader.remove();
};
//renderUsers
const createUsers = (options) => {
  tableUsers.insertAdjacentHTML(
    'beforeend',
    `
    <tr>
      <th>${options.name.first + ' ' + options.name.last}</th>
      <th>
        <div>
          <img src="${options.picture.thumbnail}" data-loginUserName="${
      options.login.username
    }">
        </div>
      </th>
      <th>${options.location.state + ' ' + options.location.city}</th>
      <th>${options.email}</th>
      <th>${options.phone}</th>
      <th>${options.registered.date
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-')}</th>
    </tr>
  </table>
  `
  );
  searchContainer.className = 'search-container';
  categories.className = '';
  removeLoader();
};

let tooltipImg;

tableUsers.addEventListener('mouseover', (event) => {
  let target = event.target;
  if (target.tagName != 'IMG') return;
  const username = target.dataset.loginusername;

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
});

tableUsers.addEventListener('mouseout', (event) => {
  let target = event.target;
  if (target.tagName != 'IMG') return;

  if (tooltipImg) {
    tooltipImg.remove();
    tooltipImg = null;
  }
});

//Get data
// const getData = async (url) => {
//   const response = await fetch(url)
//   if (!response.ok) {
//     throw new Error(`Error at ${url}, error status: ${response.status}!`)
//   }

//   return await response.json()
//   console.log('response: ', response)
// }

//getData('https://randomuser.me/api/?results=15').then(options)
