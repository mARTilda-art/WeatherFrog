// get the current date
function getCurrentDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let hour = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let currentDateTime = `${day} ${hour}`;

  let inputTime = document.querySelector(".input-Time");
  console.log(inputTime);
  inputTime.innerHTML = currentDateTime;
}

let now = new Date();
getCurrentDate(now);

// search engine city // find temperature

function displayWeatherCondition(response) {
  document.querySelector("#currentcity").innerHTML = response.data.name;
  let tempElement = Math.round(response.data.main.temp);
  document.querySelector("#currenttemperature").innerHTML = `${tempElement} °C`;
  let humidityElement = response.data.main.humidity;
  document.querySelector("#currenthumidity").innerHTML = `${humidityElement} %`;
  let windElement = Math.round(response.data.wind.speed);
  document.querySelector("#currentwind").innerHTML = `${windElement} km/h`;

  document.querySelector("#temperaturedescription").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "54fc91d14fe02d75665772e36d182ac8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  searchCity(city);
}

let citySearch = document.querySelector("#city-form");
citySearch.addEventListener("submit", handleSubmit);

//const axios = require("axios");

// find temperature to current location

function searchLocation(position) {
  let apiKey = "54fc91d14fe02d75665772e36d182ac8";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlStart = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiUrlStart}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Current button
let buttonCurrent = document.querySelector("#buttonCurrent");
buttonCurrent.addEventListener("click", getCurrentLocation);

// DefaultCity
searchCity("Berlin");
