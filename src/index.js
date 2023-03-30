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
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = currentDate(
    response.data.dt * 1000
  );
  document.querySelector("#time").innerHTML = currentTime(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function searchCity(city) {
  let units = "metric";
  let apiKey = `3499ef150985eccadd080ff408a018df`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

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
  let apiKey = `3499ef150985eccadd080ff408a018df`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayData);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
let searchDisplay = document
  .querySelector(".search-display")
  .addEventListener("click", searchInput);

let myLocationButton = document.querySelector(".my-location-button");
myLocationButton.addEventListener("click", getPosition);

searchCity(`paris`);
