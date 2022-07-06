let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();
let day = date.getDay();

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

let dayOfWeek = document.querySelector('#day');
dayOfWeek.innerHTML = days[day];

let getHours = document.querySelector('#hours');
getHours.innerHTML = hour;
if (getHours.innerHTML.length === 1) {
  getHours.innerHTML = `0${hour}`;
}

let getMinutes = document.querySelector('#minutes');
getMinutes.innerHTML = minutes;

if (getMinutes.innerHTML.length === 1) {
  getMinutes.innerHTML = `0${minutes}`;
}

// let dateElement = document.querySelector('#date');
// let currentTime = new Date();
// dateElement.innerHTML = formatDate(currentTime);
// function formatDate(date) {
//   let hours = date.getHours();
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   let minutes = date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   let dayIndex = date.getDay();
//   let days = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];
//   let day = days[dayIndex];

//   return `${day} ${hours}:${minutes}`;
// }

let apiKey = '6a0bac9dced487830ce6066218a5481c';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
let form = document.querySelector('#form');
let currentLocation = document.querySelector('#current-location-button');

function showTemperature(response) {
  document.querySelector('#temperature').innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector('#city').innerHTML = response.data.name;
  document.querySelector('#clouds').innerHTML = response.data.weather[0].main;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let inputText = document.querySelector('#input-text');
  axios
    .get(`${apiUrl}q=${inputText.value}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
});

currentLocation.addEventListener('click', function () {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios
      .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
});
