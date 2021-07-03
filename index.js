//const tableUsers = document.getElementById('tableUsers')
const container = document.getElementById('container')
const table = document.querySelector('.table')
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
const loader = document.createElement('div')
document.body.append(loader)
loader.className = 'lds-roller'
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
)

//CreateSearchBar
const createSearchBar = () => {
  const searchBar = document.createElement('div')
  searchBar.className = 'search-container'
  searchBar.insertAdjacentHTML(
    'beforeend',
    `
    <label class="search">
      <input type="text" class="input input-search" placeholder="Search" />
    </label>
    <div class="buttons">
      <button class="button">
        <span>Clear</span>
      </button>
    </div>
  `
  )
  container.insertBefore(searchBar, table)
}

//CreateFirstRowInTable

const createFirstRow = () => {
  const tableUsers = document.createElement('table')
  tableUsers.id = 'tableUsers'
  tableUsers.insertAdjacentHTML(
    'beforeend',
    `
    <tr>
      <th>Name</th>
      <th>Picture</th>
      <th>Location</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Registered Date</th>
    </tr>
  `
  )
  table.append(tableUsers)
}

//renderUsers
const createUsers = (options) => {
  tableUsers.insertAdjacentHTML(
    'beforeend',
    `
    <tr>
      <th>${options.name.first + ' ' + options.name.first}</th>
      <th><img src="${options.picture.thumbnail}" class="tooltip"></th>
      <th>${options.location.state + ' ' + options.location.city}</th>
      <th>${options.email}</th>
      <th>${options.phone}</th>
      <th>${options.registered.date}</th>
    </tr>
  </table>
  `
  )
  loader.remove()
}

fetch('https://randomuser.me/api/?results=15')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error at ${url}, error status: ${response.status}!`)
    }
    createSearchBar()
    createFirstRow()
    return response.json()
  })
  .then((options) => {
    console.log(options)
    options.results.forEach(createUsers)
  })

//getData('https://randomuser.me/api/?results=15').then(options)
