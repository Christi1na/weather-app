let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();
let day = date.getDay();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let dayOfWeek = document.querySelector("#day");
dayOfWeek.innerHTML = days[day];

let getHours = document.querySelector("#hours");
getHours.innerHTML = hour;
if (getHours.innerHTML.length === 1) {
  getHours.innerHTML = `0${hour}`;
}

let getMinutes = document.querySelector("#minutes");
getMinutes.innerHTML = minutes;

if (getMinutes.innerHTML.length === 1) {
  getMinutes.innerHTML = `0${minutes}`;
}

let apiKey = "ebcf4beea5ed40a740586eadf622aa14";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let form = document.querySelector("#form");
let currentLocation = document.querySelector("#current-location-button");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.list;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row weather-forecast-row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += ` 
          <div class="col-2 weather-forecast-content">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img
              src='http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png'
              width="70"
              alt=""
            />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">${Math.round(forecastDay.main.temp_max)}°</span>
              <span class="weather-forecast-temperature-min">${Math.round(forecastDay.main.temp_min)}°</span>
            </div>
          </div>`;
    }
  });
  forecastHTML += `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getCoordinates(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  axios.get(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`).then(showTemperature);
}
search("New York");

function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#icon").src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = response.data.wind.speed + "km/h";

  getCoordinates(response.data.coord);
}

let inputText = document.querySelector("#input-text");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  search(inputText.value);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  // axios
  //   .get(`${apiUrl}q=${inputText.value}&appid=${apiKey}&units=metric`)
  //   .then(showTemperature);
});

currentLocation.addEventListener("click", function () {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios.get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
});

let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let temperatureElement = document.querySelector("#temperature");
let celsiusTemperature = null;

function displayFahrenheit(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

fahrenheitLink.addEventListener("click", function (event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
});

celsiusLink.addEventListener("click", (event) => {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
});
