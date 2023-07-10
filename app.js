const main = document.getElementById('main');
const addBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

let data = []

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user from api
async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api')
    const data = await response.json()

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser)
}

// Add data to array
function addData(obj) {
    data.push(obj)
    updateDOM()
}

// Update the DOM
function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'


    providedData.forEach(user=> {
        const div = document.createElement('div')
        div.classList.add('person')
        div.innerHTML = `
        <strong>${user.name}</strong> <span>${formatMoney(user.money)}</span>
        `

        main.appendChild(div)
    })
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

// Double money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })

    updateDOM()
}

// Show the millionaires
function showMillionaires() {
    data = data.filter(user => {
        return user.money >= 1000000
    })

    updateDOM()
}

// Sort the user
function sortByRichest() {
    data.sort((a, b) => {
        return b.money - a.money
    })

    updateDOM()
}

// Calculate entire wealth
function calculateEntireWealth() {
    const wealth = data.reduce((total, user) => {
        return total + user.money
    }, 0)

    const div = document.createElement('div')
    div.innerHTML = `
    <h3>Total Wealth: <strong>${formatMoney(wealth)}</strong> </h3>
    `
    main.appendChild(div)
}


// Add Eventlistener
addBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showBtn.addEventListener('click', showMillionaires)
sortBtn.addEventListener('click', sortByRichest)
calculateWealth.addEventListener('click', calculateEntireWealth)
