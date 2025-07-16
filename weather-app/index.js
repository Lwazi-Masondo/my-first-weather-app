document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const city = document.getElementById("city");

  function updateWeather(response) {
    let temperatureData = document.querySelector(".temperature-data");
    temperatureData.innerHTML = Math.round(response.data.temperature.current);
    city.innerHTML = response.data.city;
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
});
