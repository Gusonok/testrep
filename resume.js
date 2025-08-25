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
  listElement.innerHTML = ''; // Очистка остается
  if (hobbies.length === 0) {
    listElement.innerHTML = '<p>Нет элементов!</p>';
  }

  // Теперь мы не просто генерируем HTML, а создаем настоящие DOM-элементы
  for (let i = 0; i < hobbies.length; i++) {
    const li = createListItem(hobbies[i], i); // Используем новую функцию-помощник
    listElement.append(li); // Добавляем готовый элемент <li> в список <ul>
  }
}

// Новая функция-помощник, которая создает ОДИН элемент <li>
function createListItem(hobbyTitle, index) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    li.innerHTML = `
      <span>${hobbyTitle}</span>
      <span>
        <span class="btn btn-small btn-danger" data-index='${index}' data-type='remove'>&times;</span>
      </span>
    `;
    return li;
}

addBtn.onclick = function () {
    const newHobbyTitle = inputElement.value;
    if (newHobbyTitle.length === 0) {
        return; 
    }    

    // 1. Сначала обновляем ДАННЫЕ
    hobbies.push(newHobbyTitle);
    saveHobbiesToStorage();

    // 2. Создаем НОВЫЙ элемент, но пока не добавляем класс для анимации
    const newListItem = createListItem(newHobbyTitle, hobbies.length - 1);
    
    // 3. Добавляем ему "скрытый" класс для анимации (опишем его в CSS)
    newListItem.classList.add('item-hidden');

    // 4. Добавляем элемент на страницу
    // Если это первый элемент, сначала очистим надпись "Нет элементов!"
    if (hobbies.length === 1) {
        listElement.innerHTML = '';
    }
    listElement.append(newListItem);

    // 5. ТРЮК: Просим браузер на следующем кадре убрать "скрытый" класс
    requestAnimationFrame(() => {
        newListItem.classList.remove('item-hidden');
    });

    inputElement.value = '';
};

listElement.onclick = function (event) {
    // Убеждаемся, что кликнули по кнопке удаления
    if (event.target.dataset.type === 'remove') {
        const itemToRemove = event.target.closest('li'); // Находим <li>, который нужно удалить
        
        // --- Шаг 1: Предотвращаем повторные клики ---
        // Если у элемента уже есть класс 'item-hidden', значит, он уже исчезает.
        // Ничего не делаем, чтобы избежать хаоса.
        if (itemToRemove.classList.contains('item-hidden')) {
            return;
        }

        // --- Шаг 2: Запускаем анимацию ---
        itemToRemove.classList.add('item-hidden');
        
        // --- Шаг 3: Ждем конца анимации, чтобы обновить ВСЕ ---
        itemToRemove.addEventListener('transitionend', function() {
            // ВАЖНО: Когда анимация ЗАКОНЧИЛАСЬ, мы просто полностью
            // перерисовываем список на основе АКТУАЛЬНЫХ данных.
            // Это самый надежный способ избежать рассинхронизации.
            render();
        }, { once: true });

        // --- Шаг 4: Обновляем данные СРАЗУ ЖЕ ---
        // Мы не ждем конца анимации, чтобы обновить массив.
        // Мы делаем это немедленно.
        const index = parseInt(event.target.dataset.index);
        hobbies.splice(index, 1);
        saveHobbiesToStorage();
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
// где то тут начало реализации фактов рандомных

const catFactText = document.getElementById('cat-fact-text');
const catFactBtn = document.getElementById('cat-fact-btn');

catFactBtn.onclick = function() {
  catFactText.textContent = 'Загрузка...';
  catFactBtn.disabled = true;
  fetch('https://catfact.ninja/fact')
    .then(function(response){
      return response.json()
      })
    .then(function(data){
      catFactText.textContent = data.fact
     })
    .catch(function(error){
        catFactText.textContent = 'Ошибка! Не удалось загрузить факт.';
      })
    .finally(function(){
      catFactBtn.disabled = false;
    })
};
//а тут конец. Но и начало для погоды!
const WEATHER_API_KEY = 'e5dbec10c6a77dd180dcc666b67c3879';
const WEATHER_CITY = 'Taganrog';

const weatherIcon = document.getElementById('weather-icon')
const weatherTemp = document.getElementById('weather-temp')
const weatherCity = document.getElementById('weather-city')

async function getWeather() {
    // Собираем URL из "кирпичиков"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&units=metric&lang=ru&appid=${WEATHER_API_KEY}`;
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      console.log(data.name)
      console.log(data.weather[0].description)
      console.log(data.main.temp)
      console.log(data.weather[0].icon)

      displayWeatherData(data)
    }
    catch (error){
      console.error("ошибка!",error)
    }
    
  }
    
function displayWeatherData(data){
        console.log("displayWeatherData вызвалась!")
        weatherCity.textContent = data.name
        weatherTemp.textContent = Math.round(data.main.temp)+"°C"

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.src = iconUrl;
      }



render()
getWeather()