// Selecting DOM elements from HTML file to work with
const sidebarList = document.querySelectorAll('#sidebar li button')
const sidebar = document.querySelector('#sidebar')

// Elements in Planned tab
const budgetContainer = document.getElementById('budget-container')
const budgetTemplate = document.getElementById("budget-template")
const newBudgetForm = document.getElementById('planned-form')
const newBudgetCategory = document.querySelector('[data-new-category]')
const newBudgetAmount = document.querySelector('[data-new-budget]')

// Elements in Spent tab
const itemsContainer = document.getElementById('items-container')
const itemTemplate = document.getElementById('item-template')
const newItemForm = document.getElementById('spent-form')
const selectBox = document.getElementById('select-box')
const newDescription = document.querySelector('[data-new-description]')
const newPrice = document.querySelector('[data-new-price]')
const categoryOptions = document.querySelector('[data-category-options')

// Remove a category
let selectedCategoryId = null

budgetContainer.addEventListener('click', e => {
  if (e.target.parentNode.id === "close") {
      selectedCategoryId = e.target.parentNode.parentNode.parentNode.id
      budgetList = budgetList.filter(list => list.id !== selectedCategoryId)
      selectedCategoryId = null
      save()
      renderBudgets()
  }
})

// Remove a spent item
let selectedItemId = null

itemsContainer.addEventListener('click', e => {
  if (e.target.parentNode.id === "close") {
      selectedItemId = e.target.parentNode.parentNode.parentNode.id
            
      budgetList.forEach(category => {
        const index = budgetList.indexOf(category)
        const selectedItem = category.items.filter((item => item.id === selectedItemId))  
        category.items = category.items.filter((item => item.id !== selectedItemId))  
      })
      
      selectedItemId = null      
      save()
      renderItems()
  }
})

// Use local storage to store which tab the user is on - store key and get items
const LOCAL_STORAGE_SELECTED_TAB_ID_KEY = 'tab.selectedId'
let selectedTabId = localStorage.getItem(LOCAL_STORAGE_SELECTED_TAB_ID_KEY) || 'planned'

// List of budgets - inside each budget category is a list of items spent
const LOCAL_STORAGE_BUDGET_LIST_ID_KEY = 'budgets.id'
let budgetList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BUDGET_LIST_ID_KEY)) || []
console.log(budgetList);

// When an item on the side bar is clicked on, direct the user to that tab
sidebar.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'button') {
      selectedTabId = e.target.id   
  }  
  saveAndRender()
})

// When a form for new budget category is added, display that on the UI
newBudgetForm.addEventListener("submit", e => {
  e.preventDefault()  
  newBudgetCategory.focus()

  const categoryName = newBudgetCategory.value
  const budgetAmount = newBudgetAmount.value  

  if (categoryName == null || categoryName === '') return
  if (budgetAmount == null || budgetAmount === '') return

  const budget = createBudget(categoryName, budgetAmount)

  newBudgetCategory.value = null
  newBudgetAmount.value = null

  budgetList.push(budget)

  save()
  renderBudgets()
})

newItemForm.addEventListener("submit", e => {
  e.preventDefault()
  newDescription.focus()

  const itemDescription = newDescription.value
  const itemPrice = newPrice.value
  const categoryName = categoryOptions.value

  if (itemDescription == null || itemDescription === '') return 
  if (itemPrice == null || itemPrice === '') return 
  if (categoryName == null) return

  newDescription.value = null
  newPrice.value = null
  categoryOptions.value = null

  const item = createItem(itemDescription, itemPrice)
  let index = 0
  budgetList.forEach(category => {
    if (category.name == categoryName)
        index = budgetList.indexOf(category)
  })

  const budgetCategory = budgetList[index]
  budgetCategory.items.push(item)

  budgetCategory.remained -= parseInt(item.price)

  console.log(budgetCategory.remained)

  setSelectedOption()
  save()
  renderItems()
})

// Create a new object in the budget list. Object has a name, amount, and list of spent items
function createBudget(category , amount) {  
  return {
    id: Date.now().toString(),
    name: category,
    budget: amount,
    items: [],
    remained: amount
  }
}

function createItem(description, amount) {
  return {
    id: Date.now().toString(),
    title: description,
    price: amount
  }
}

// Render everything and display onto the UI
renderBudgets()
render()

// Save data every time the user input new things 
function save() {
  localStorage.setItem(LOCAL_STORAGE_SELECTED_TAB_ID_KEY, selectedTabId)
  localStorage.setItem(LOCAL_STORAGE_BUDGET_LIST_ID_KEY, JSON.stringify(budgetList))
}

// clear all elements inside a list
function clearElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

// render and display
function render() {
  sidebarList.forEach(tab => {
    const pageId = 'money-' + tab.id
    const currentTab = document.getElementById(pageId)

    if (tab.id == selectedTabId) {
        tab.classList.add("clicked")
        currentTab.classList.remove('hidden')
    }
    else {
        tab.classList.remove("clicked")
        currentTab.classList.add('hidden')
    }
  });
}

// render the planned budgets tab
function renderBudgets() {
  clearElements(budgetContainer)
  clearElements(selectBox)
  budgetList.forEach(category => {
      const categoryElement = document.importNode(budgetTemplate.content, true)
      const categoryCard = categoryElement.querySelector(".card")      
      categoryCard.id = category.id
      const categoryTitle = categoryElement.querySelector(".card-title b")
      categoryTitle.append(category.name)
      const budget = categoryElement.getElementById("budget-amount") 
      budget.append(category.budget)
      budgetContainer.prepend(categoryElement)

      const option = document.createElement('option')
      option.text = category.name
      selectBox.appendChild(option)
  });

  renderItems()
}

function setSelectedOption() {
  const option = selectBox.firstChild
  option.selected = true
}

function renderItems() {
  clearElements(itemsContainer)
  budgetList.forEach(category => {
    const itemsList = category.items
    itemsList.forEach(item => {
        const itemElement = document.importNode(itemTemplate.content, true)
        const itemCard = itemElement.querySelector(".card")      
        itemCard.id = item.id
        const itemTitle = itemElement.querySelector(".card-title b")
        itemTitle.append(item.title)
        const categoryName = itemElement.querySelector("#spend-type small")
        categoryName.append(category.name)
        const price = itemElement.getElementById("spend-amount")
        price.append(item.price)

        itemsContainer.prepend(itemElement)
    })
  });
}


function saveAndRender() {
  save()
  render()
}

// Elements in Overview tab with Chart.js
let myChart = document.getElementById('myChart').getContext('2d');

Chart.defaults.global.defaultFontFamily = 'Nunito';
Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = 'grey';

const spentData = [];
const labelsCategory = [];

for (i = 0; i < budgetList.length; i++){
  spentData.push(budgetList[i].budget);
  labelsCategory.push(budgetList[i].name);
}

let expensesChart = new Chart(myChart, {
	type:'pie',
	data:{
	labels: labelsCategory,
	datasets:[{
		label: 'Expenses',
		data: spentData,
		backgroundColor: ['#048A81', '#06D6A0', '#54C6EB', '#DB3069', '#8A89C0'],
		borderWidth:1,
		borderColor:'grey',
		hoverBorderWidth:3,
		hoverBorderColor:'black'
	}]
	},
	options:{
    title: {
      display: false,
      text: 'Budget breakdown',
      fontFamily: 'Nunito',
      fontSize: 20,
      padding: 10,
    },
    legend: {
      position: 'right',
      display: true,
    },
    layout: {
      padding: 20
    },
    tooltips: {
      enabled: true
    },
  }
});