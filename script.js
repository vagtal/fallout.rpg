import { goldenLayout, addGLClass } from './layout.js'

const menuItems = document.querySelectorAll('.floating ul li a.component-list')

menuItems.forEach(menuItem => {
  menuItem.addEventListener('click', event => {
    const id = event.target['id']
    goldenLayout.addComponent(id, undefined, id)
  })
})

document.getElementById('resetLayout').addEventListener('click', () => {
  localStorage.removeItem('goldenLayoutState')
  location.reload()
})

document.getElementById('paint').addEventListener('click', () => {
  window.open('https://kleki.com/?lang=es', '_blank').focus()
})

document.getElementById('addList').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'grid'
  document.getElementById('urlName').focus()
})

document.getElementById('cancelUrl').addEventListener('click', () => {
  document.getElementById('urlName').value = ''
  document.getElementById('url').value = ''
  document.getElementById('modal').style.display = 'none'
})

document.getElementById('saveUrl').addEventListener('click', () => {
  const name = document.getElementById('urlName').value 
  const url = document.getElementById('url').value
  if (name?.length && url.length) {
    const newName = 'dynamicClass' + name
    addGLClass(name, newName, url)
    document.getElementById('modal').style.display = 'none'
    document.getElementById('urlName').value = ''
    document.getElementById('url').value = ''
  }
})

renderSavedStates(true)
saveStateListener()

function saveStateListener() {
  document.getElementById('saveState').addEventListener('click', () => {
  try {
    const states = localStorage.getItem('goldenLayoutStateSaved')
    const statesProcessed = states ? JSON.parse(states) : []

    const state = JSON.stringify(goldenLayout.saveLayout())
    statesProcessed.push(state)
    localStorage.setItem('goldenLayoutStateSaved', JSON.stringify(statesProcessed))

    renderSavedStates()
  
  } catch (err) {
    console.error(err)
  }
})
}

function renderSavedStates(first) {
  const stateMenu = document.getElementById('stateMenu')
  
  stateMenu.innerHTML = '<li id="saveState"><a>Save state</a></li>'

  const savedLayouts = localStorage.getItem('goldenLayoutStateSaved')
  const savedLayoutProcessed = savedLayouts ? JSON.parse(savedLayouts) : []

  savedLayoutProcessed.forEach((layout, index) => {
    const li = document.createElement('li')
    li.classList.add('stateSaved')
    li.setAttribute('attr-state', index)

    const a = document.createElement('a')
    a.textContent = `Load state ${index}`
    a.style.cursor = 'pointer'
    a.addEventListener('click', () => {
      const layouts = localStorage.getItem('goldenLayoutStateSaved')
      const layoutsProcessed = layouts ? JSON.parse(layouts) : undefined
      console.log(layoutsProcessed, index, layoutsProcessed?.[index])
      if (layoutsProcessed) {
        goldenLayout.loadLayout(JSON.parse(layoutsProcessed[index]))
      }
    })

    const deleteButton = document.createElement('b')
    deleteButton.textContent = '🗑'
    deleteButton.style.marginLeft = '10px'
    deleteButton.style.display = 'inline-block'
    deleteButton.style.textAlign = 'center'
    deleteButton.style.width = '30px'
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation()
      const layouts = localStorage.getItem('goldenLayoutStateSaved')
      const layoutsProcessed = layouts ? JSON.parse(layouts) : []

      layoutsProcessed.splice(index, 1)

      localStorage.setItem('goldenLayoutStateSaved', JSON.stringify(layoutsProcessed))
      
      renderSavedStates()
      closeMenu()
    })

    li.appendChild(a)
    li.appendChild(deleteButton)

    stateMenu.appendChild(li)
  })
  !first && saveStateListener()
}

function closeMenu() {  
    document.getElementById('iconContent').removeAttribute('open')
    document.getElementById('iconStatus').removeAttribute('open')
}

document.getElementById('minimize').addEventListener('click', ()=> {  
  const iframe = document.querySelectorAll('iframe')
  iframe.forEach(ifr => {
      if (ifr.style['z-index'] === '1') {
        ifr.style.top = ifr.getAttribute('attrTop')
        ifr.style.left = ifr.getAttribute('attrLeft')
        ifr.style.width = ifr.getAttribute('attrWidth')
        ifr.style.height = ifr.getAttribute('attrHeight')
        ifr.style['z-index'] = 'auto'
      }
  })
  
  document.getElementById('maximize-bar').style.display = 'none'
})

document.addEventListener('click', () => {
    closeMenu()
})

window.addEventListener('blur', () => {
  setTimeout(() => {
    if (document.activeElement.tagName === 'IFRAME') {
      closeMenu()
    }
  }, 0)
})

