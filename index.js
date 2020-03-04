document.addEventListener("DOMContentLoaded", () => {
  fetchBurgers(),
  buttonListener(),
  formListener()
})

function fetchBurgers(){
  fetch("http://localhost:3000/burgers")
  .then(resp => resp.json())
  .then(json => json.forEach(burger => renderBurger(burger)))
}

function renderBurger(burger){
  const menu = document.getElementById("burger-menu")
  const burgerDiv = document.createElement('div')
  burgerDiv.className = "burger"
  burgerDiv.dataset.burgerId = burger.id
  burgerDiv.innerHTML = `
  <h3 class="burger_title">${burger.name}</h3>
  <img src="${burger.image}">
  <p class="burger-description">${burger.description}</p>
  <button class="button">Add to Order</button>
  `

  menu.append(burgerDiv)
}

function buttonListener(){
  document.addEventListener("click", function(event){
    switch (event.target.className) {
      case "button":
      renderOrder(event.target.parentNode)
    }
  })
}

function renderOrder(burger) {
  const burgerName = burger.getElementsByClassName("burger_title")[0].innerText
  const orderList = document.getElementById("order-list")
  const li = document.createElement("li")
  li.innerHTML = `
  <p>${burgerName}</p>
  `
  orderList.append(li)
}

function formListener() {
  const form = document.getElementById("custom-burger")
  form.addEventListener("submit", function(event){
    event.preventDefault()
    let formData = event.target
    createBurger(formData)
    form.reset()
  })
}

function createBurger(formData) {
  fetch("http://localhost:3000/burgers", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: formData.elements["name"].value,
      description: formData.elements["description"].value,
      image: formData.elements["url"].value
    })
  })
  .then(resp => resp.json())
  .then(json => renderNewBurger(json))
}

function renderNewBurger(burger){
  const menu = document.getElementById("burger-menu")
  const burgerDiv = document.createElement('div')
  burgerDiv.className = "burger"
  burgerDiv.dataset.burgerId = burger.id
  burgerDiv.innerHTML = `
  <h3 class="burger_title">${burger.name}</h3>
  <img src="${burger.image}">
  <p class="burger-description">${burger.description}</p>
  <button class="button">Add to Order</button>
  `

  menu.append(burgerDiv)
  renderOrder(burgerDiv)
}