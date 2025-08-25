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

  getForecast(response.data.city);

  // console.log(response.data);
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

function getForecast(city) {
  let apikey = "949of33a9141a5730eb48aa0tc0df554";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(weatherForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function weatherForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forcastHtml = "";

  response.data.daily.forEach(function (day, index) {
    let minimumTemp = Math.round(day.temperature.minimum);
    let maximumTemp = Math.round(day.temperature.maximum);
    let icon = day.condition.icon_url;
    let alternate = day.condition.icon;

    if (index < 5) {
      forcastHtml =
        forcastHtml +
        `
            <div class="daily-temps">
              <h2>${formatDay(day.time)}</h2>
              <div><img src="${icon}" alt="${alternate}  class="weather-icon" ></div>
              <div class="temperature">
                <div class="max-temp">${maximumTemp}°C</div>
                ${minimumTemp}°C
              </div>
            </div>
          `;
    }
  });

  forecast.innerHTML = forcastHtml;
  console.log(response.data.daily[0]);
}
