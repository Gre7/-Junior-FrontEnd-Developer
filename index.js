const tableUsers = document.getElementById('tableUsers');
const container = document.getElementById('container');
const table = document.querySelector('.table');
const searchContainer = document.querySelector('.search-container');
const categories = document.getElementById('categories');
const inputSearch = document.querySelector('.input-search');
const clearBtn = document.querySelector('.button_clear');

let userList = [];

fetch('https://randomuser.me/api/?results=15')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error at ${url}, error status: ${response.status}!`);
    }
    return response.json();
  })
  .catch(console.log)
  .then((options) => {
    console.log(options);
    userList = options.results;
    updateTable(userList);
  });

const updateTable = (users) => {
  tableUsers.innerHTML = '';
  console.log('проверка');
  users.forEach(createUsers);
};

const filterInput = () => {
  const text = inputSearch.value.toLowerCase().trim();
  const filteredList = userList.filter(
    (user) =>
      user.name.first.toLowerCase().indexOf(text) !== -1 ||
      user.name.last.toLowerCase().indexOf(text) !== -1
  );
  console.log(filteredList, 'filteredList');
  updateTable(filteredList);
};

inputSearch.addEventListener('keyup', debounce(filterInput, 500));

clearBtn.addEventListener('click', () => {
  inputSearch.value = '';
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
//Get data
// const getData = async (url) => {
//   const response = await fetch(url)
//   if (!response.ok) {
//     throw new Error(`Error at ${url}, error status: ${response.status}!`)
//   }

//   return await response.json()
//   console.log('response: ', response)
// }

//Createloader
//const createLoader = () => {};

const loader = document.createElement('div');
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

//const removeLoader = () => {};
//renderUsers
const createUsers = (options) => {
  tableUsers.insertAdjacentHTML(
    'beforeend',
    `
    <tr>
      <th>${options.name.first + ' ' + options.name.last}</th>
      <th><img src="${options.picture.thumbnail}" class="tooltip"></th>
      <th>${options.location.state + ' ' + options.location.city}</th>
      <th>${options.email}</th>
      <th>${options.phone}</th>
      <th>${options.registered.date}</th>
    </tr>
  </table>
  `
  );
  searchContainer.className = 'search-container';
  categories.className = '';
  loader.remove();
};

//getData('https://randomuser.me/api/?results=15').then(options)
