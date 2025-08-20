const savedHobbiesJSON = localStorage.getItem('myHobbies');
let hobbies = [];


if (savedHobbiesJSON) {
  hobbies = JSON.parse(savedHobbiesJSON);
} else {
  hobbies = ['Спорт', 'Игры', 'Качалка'];
}

function saveHobbiesToStorage() {
  const hobbiesJSON = JSON.stringify(hobbies);
  localStorage.setItem('myHobbies', hobbiesJSON);
}

const listElement = document.getElementById('hobbies-list');
const addBtn = document.getElementById('add-hobby-btn');
const inputElement = document.getElementById('hobby-input');

const themeBtn = document.getElementById('theme-toggle-button');
const body = document.body

themeBtn.addEventListener('click', function () {
  console.log("нажал darkmode")
  body.classList.toggle('dark-mode')
})

function render() {
  listElement.innerHTML = ''
  if(hobbies.length===0){
    listElement.innerHTML = '<p>Нет элементов!</p>'
  }
  for (let i = 0; i < hobbies.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(hobbies[i], i))  
  }
}

render()

function getNoteTemplate(hobbyTitle, index) { 
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${hobbyTitle}</span>
      <span>
        <!-- Мы убрали кнопку с галочкой -->
        <span class="btn btn-small btn-danger" data-index='${index}' data-type='remove'>&times;</span>
      </span>
    </li>`;
}

addBtn.onclick = function () {
    const newHobbyTitle = inputElement.value;

    if (newHobbyTitle.length === 0) {
        return; 
    }    

    hobbies.push(newHobbyTitle);
    saveHobbiesToStorage();
    render();

    inputElement.value = '';
};

listElement.onclick = function (event) {
    console.log(event)    
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index);
        const type = event.target.dataset.type;
        if (type === 'remove') {
             hobbies.splice(index, 1);
             saveHobbiesToStorage();
             render(); 
        }
        render();
    }
};

// -----Начало формы-----
const form = document.getElementById('contact-form');
const nameForm = document.getElementById('name');
const emailForm = document.getElementById('email');
const textForm = document.getElementById('text');

form.addEventListener('submit', function(event) {
  const formData = {
  name: undefined,
  email: undefined,
  text: undefined
  };
  event.preventDefault() //отменит перезагрузку страницы при отправке формы
    formData.name = nameForm.value
    formData.email = emailForm.value
    formData.text = textForm.value
  console.log(formData)
  nameForm.value = '';
  emailForm.value = '';
  textForm.value = '';
})
// -----Конец формы-----
