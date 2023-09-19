import { apiKey } from './config.js';

var DateTime = { 
  year: 'numeric', 
  month: 'numeric', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: 'numeric' 
};
var DateAndTime = new Date().toLocaleString(undefined, DateTime);
const switchTheme = document.querySelector(".switch-checkbox");

switchTheme.addEventListener('click', function() {
  const body = document.body;
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
  }
});

document.querySelector(".search button").addEventListener('click', function() {
  searchWeather();
  document.querySelector(".weather").style.display = "flex";
});

document.querySelector(".dateTime").innerHTML = DateAndTime;

document.querySelector(".search input").addEventListener('keyup', function (event) {
  if(event.key == "Enter") {
    searchWeather();
  }
});

function searchWeather() {
  fetchWeather(document.querySelector(".input-search").value);
}

function fetchWeather(city) {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, pressure, humidity } = data.main;
  const { speed } = data.wind;

  document.querySelector(".city").innerHTML = name;
  document.querySelector(".weather-icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  document.querySelector(".description").innerHTML = description;
  document.querySelector(".temperature").innerHTML = "Temperature: " + Math.round(temp - 272.15) + "°C";
  document.querySelector(".pressure").innerHTML = "Pressure: " + pressure + "Pa";
  document.querySelector(".humidity").innerHTML = "Humiditiy: " + humidity + "%";
  document.querySelector(".wind").innerHTML = "Wind speed: " + speed.toFixed(0) + "km/h";
}

setTimeout(function() {
  window.location.href = window.location.href;
}, 60000);