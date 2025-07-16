const searchInput = document.getElementById("search-input");
const city = document.getElementById("city");
let condition = document.querySelector(".condition");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let currentWeatherIcon = document.querySelector(".current-weather-icon");
let timeElement = document.querySelector(".time-element");

function updateWeather(response) {
  let temperatureData = document.querySelector(".temperature-data");
  let date = new Date(response.data.time * 1000);

  temperatureData.innerHTML = Math.round(response.data.temperature.current);
  city.innerHTML = response.data.city;
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  currentWeatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}">`;
  timeElement.innerHTML = formateDate(date);

  console.log(response.data);
}

function formateDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "949of33a9141a5730eb48aa0tc0df554";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchEvent(event) {
  event.preventDefault();
  let inputData = searchInput.value.trim();

  searchCity(inputData);
}

const searchButton = document
  .getElementById("search-button")
  .addEventListener("click", searchEvent);

searchCity("Paris");
