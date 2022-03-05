let addBtn, deleteAllBtn, popup, popupShadow, acceptTaskBtn, category, content, noteTitle, notesArea, errorInfo, darkModeBtn, navBar, categoryGroup

const openPopup = (e) => {
    popup.classList.add('active')
    popupShadow.classList.add('active')
}
const closePopup = (e) => {
    e.target === popupShadow ?
        popupShadow.classList.remove('active') : false
}

const deleteAllNotes = () => {
    notesArea.innerHTML = ''
}

const deleteNote = (e) =>{
    notesArea.removeChild(e.target.closest('.note'))
}

const darkMode =() =>{
    const allItemz = [document.body, popup, navBar]
    allItemz.forEach(e =>{
        e.classList.toggle('dark')
    })
    const buttons = [addBtn, deleteAllBtn, darkModeBtn, acceptTaskBtn]
    buttons.forEach(e=>{
        e.classList.toggle('dark')
    })
}

const addNewTask = () => {

    const newNote = document.createElement('div')
    const header = document.createElement('h2')
    header.textContent = noteTitle.value
    const currContent = document.createElement('p')
    currContent.textContent = content.value
    const btnDel = document.createElement('button')
    btnDel.addEventListener('click', deleteNote)
    const currCategory = category.value

    
    newNote.classList.add('note')
    newNote.setAttribute('category', currCategory)
    header.classList.add('note--title')
    currContent.classList.add('note--content')
    btnDel.classList.add('note--delete')
    btnDel.innerHTML = '<i class="fas fa-trash-alt"></i>'

    if (currCategory === '' || header.textContent === ''|| currContent.value==='') {
        errorInfo.textContent = 'Spróbuj ponownie 😊'
    } else {
        newNote.append(header, currContent, btnDel)
        if (currCategory === 'shopping') {
            newNote.style.backgroundColor = '#f65d5d'
        }
        if (currCategory === 'daily') {
            newNote.style.backgroundColor = '#cf8cc4'
        }
        if (currCategory === 'homework') {
            newNote.style.backgroundColor = '#87cc55'
        }
        if (currCategory === 'work') {
            newNote.style.backgroundColor = '#29a7d6'
        }

        newNote.append(header,currContent)
        notesArea.appendChild(newNote)
        noteTitle.value = ''
        content.value=''
        popupShadow.classList.remove('active')
        errorInfo.textContent=''
    }
}
const groupNotes = () =>{
    const allNotes = document.querySelectorAll('.note')
    const category = categoryGroup.value
    allNotes.forEach(e =>{
        if(categoryGroup.value==='default'){
            allNotes.forEach(e=>e.style.display='flex')
        }
        else if(e.getAttribute('category')!=categoryGroup.value){
            e.style.display='none'
        }else{
            e.style.display='flex'
        }
    })
}

const prepareDOMElements = () => {
    addBtn = document.querySelector('.nav--btn.add')
    deleteAllBtn = document.querySelector('.nav--btn.del')
    darkModeBtn= document.querySelector('.nav--btn.dm')
    navBar = document.querySelector('.nav')

    popup = document.querySelector('.popup')
    popupShadow = document.querySelector('.popup--shadow')
    acceptTaskBtn = document.querySelector('.popup--button')
    notesArea = document.querySelector('.notes--container')

    category = popup.querySelector('#category-select')
    content = document.querySelector('.desc')
    noteTitle = document.querySelector('.title')
    deleteBtn = document.querySelector('.note--delete')
    errorInfo = document.querySelector('.error--info')
    categoryGroup = document.querySelector('#cat')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', openPopup)
    popupShadow.addEventListener('click', closePopup)
    acceptTaskBtn.addEventListener('click', addNewTask)
    deleteAllBtn.addEventListener('click', deleteAllNotes)
    darkModeBtn.addEventListener('click',darkMode)
    categoryGroup.addEventListener('change', groupNotes)
}
const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}
window.addEventListener('DOMContentLoaded', main)