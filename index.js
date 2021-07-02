const table = document.getElementById('tableUsers')

//Get data
// const getData = async (url) => {
//   const response = await fetch(url)
//   if (!response.ok) {
//     throw new Error(`Error at ${url}, error status: ${response.status}!`)
//   }

//   return await response.json()
//   console.log('response: ', response)
// }

//renderUsers
const createUsers = (options) => {
  table.insertAdjacentHTML(
    'beforeend',
    `
    <tr>
      <th>${options.name.first + ' ' + options.name.first}</th>
      <th><img src="${options.picture.thumbnail}" alt="" srcset=""></th>
      <th>${options.location.state + ' ' + options.location.city}</th>
      <th>${options.email}</th>
      <th>${options.phone}</th>
      <th>${options.registered.date}</th>
    </tr>
  </table>
  `
  )
}

fetch('https://randomuser.me/api/?results=15')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error at ${url}, error status: ${response.status}!`)
    }
    return response.json()
  })
  .then((options) => {
    console.log(options)
    options.results.forEach(createUsers)
  })

//getData('https://randomuser.me/api/?results=15').then(options)
