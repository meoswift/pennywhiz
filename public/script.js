const sidebarList = document.querySelectorAll('#sidebar li button')
const sidebar = document.querySelector('#sidebar')

const LOCAL_STORAGE_SELECTED_TAB_ID_KEY = 'tab.selectedId'
let selectedTabId = localStorage.getItem(LOCAL_STORAGE_SELECTED_TAB_ID_KEY)


// Initalize first to planned so the user is redirected to planned automatically
selectedTabId = 'Planned'

const list = []

sidebar.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'button') {
      selectedTabId = e.target.id   
  }
  saveAndRender()
})


function save() {
  localStorage.setItem(LOCAL_STORAGE_SELECTED_TAB_ID_KEY, selectedTabId)
}

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

function saveAndRender() {
  save()
  render()
}

saveAndRender()
