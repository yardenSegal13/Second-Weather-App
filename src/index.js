function currentDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednseday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let date = now.getDate();

  let month = now.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  return `${day} ${date}/${month}`;
}

function currentTime(timestamp) {
  let now = new Date(timestamp);

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes <= `0${minutes}<`;
  }
  return `Last updated: ${hour}:${minutes}`;
}

function displayData(response) {
  tempC = Math.round(response.data.temperature.current);
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.city}, ${response.data.country}`;
  document.querySelector("#temp").innerHTML = tempC;
  document.querySelector("h3").innerHTML = response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = currentDate(
    response.data.time * 1000
  );
  document.querySelector("#time").innerHTML = currentTime(
    response.data.time * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  getForecast(response.data.coordinates);
}

function getForecast(coordinates) {
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiKey = `e8d0t21311e4ab493b99bo9d8480dbcf`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  let apiKey = "e8d0t21311e4ab493b99bo9d8480dbcf";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayData);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function getLocation(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `e8d0t21311e4ab493b99bo9d8480dbcf`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;

  axios.get(apiUrl).then(displayData);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function toFahrenheit(event) {
  event.preventDefault();
  let tempF = (tempC * 9) / 5 + 32;
  document.querySelector("#temp").innerHTML = Math.round(tempF);
  document.querySelector("#fahrenheit").classList.add("active");
  document.querySelector("#celsius").classList.remove("active");
}

function toCelsius(event) {
  event.preventDefault();
  document.querySelector("#temp").innerHTML = tempC;
  document.querySelector("#fahrenheit").classList.remove("active");
  document.querySelector("#celsius").classList.add("active");
}

function formatDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weatherForecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="forecast-day">${formatDay(forecastDay.time)}</div>
          <img src= "${forecastDay.condition.icon_url}" alt="${
          forecastDay.condition.icon
        }" width="42"/>
          <div class="degrees">
            <span class="max-deg"> ${Math.round(
              forecastDay.temperature.maximum
            )}°</span> <span>${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
          </div>
        </div>
      
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

let searchDisplay = document
  .querySelector(".search-display")
  .addEventListener("click", searchInput);

let tempC = null;

let myLocationButton = document.querySelector(".my-location-button");
myLocationButton.addEventListener("click", getPosition);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toCelsius);
searchCity(`paris`);
