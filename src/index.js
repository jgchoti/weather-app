//Search bar
function displayWeather(response) {
  document.querySelector("#cityname").innerHTML = response.data.name;
  currentTempElement.innerHTML = Math.round(response.data.main.temp)
  inactiveUnitButton.innerHTML = `°F`;
  activeUnitButton.innerHTML = `°C`;
  document.querySelector("#description").innerHTML = response.data.weather[0].description
  document.querySelector("#humidity").innerHTML = response.data.main.humidity + " %";
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed * 3.6) + " km/h"
  switchBackground()

}
function searchInput(input) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
  currentUnit = "c"
  let units = "metric"
  axios.get(`${apiUrl}&units=${units}`).then(displayWeather)
}
function searchBar(event) {
  event.preventDefault()
  let input = document.getElementById("search-bar").value;
  searchInput(input);
}

let apiKey = "0771d4347f81db89f7bfdf565868d867"
let currentTempElement = document.getElementById("cur-temp-cel");
let form = document.querySelector("form");
form.addEventListener("submit", searchBar);

//Geolocation API
function getUserLocation(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(getWeatherGeolocation)
}
function getWeatherGeolocation(position) {
  currentUnit = "c"
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoUrl).then(displayWeather);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getUserLocation);

// Current Date
let currentDate = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let fullMinute = currentDate.getMinutes();
if (fullMinute < 10) {
  fullMinute = "0" + fullMinute;
}
let fullHour = currentDate.getHours();
if (fullHour < 10) {
  fullHour = "0" + fullHour;
}
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]
  } ${currentDate.getDate()}, ${currentDate.getFullYear()} ${fullHour}:${fullMinute}`;

//Forecast Day
let dayOne = document.querySelector("#day1");
let dayTwo = document.querySelector("#day2");
let dayThree = document.querySelector("#day3");
let dayFour = document.querySelector("#day4");
let dayFive = document.querySelector("#day5");
dayOne.innerHTML = `${days[(currentDate.getDay() + 1) % 7]}`;
dayTwo.innerHTML = `${days[(currentDate.getDay() + 2) % 7]}`;
dayThree.innerHTML = `${days[(currentDate.getDay() + 3) % 7]}`;
dayFour.innerHTML = `${days[(currentDate.getDay() + 4) % 7]}`;
dayFive.innerHTML = `${days[(currentDate.getDay() + 5) % 7]}`;

//convert to Fahrenheit
function convertUnitClicked(event) {
  if (currentUnit === `c`) {
    currentUnit = "f";
    let input = document.getElementById("cityname").innerHTML;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
    let units = "imperial"
    axios.get(`${apiUrl}&units=${units}`).then(convertToFah)

  } else {
    currentUnit = "c";
    let input = document.getElementById("cityname").innerHTML;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
    let units = "metric"
    axios.get(`${apiUrl}&units=${units}`).then(convertToCel)
  }
}

function convertToFah(response) {
  currentTempElement.innerHTML = Math.round(response.data.main.temp)
  inactiveUnitButton.innerHTML = `°C`;
  activeUnitButton.innerHTML = `°F`;
}

function convertToCel(response) {
  currentTempElement.innerHTML = Math.round(response.data.main.temp)
  inactiveUnitButton.innerHTML = `°F`;
  activeUnitButton.innerHTML = `°C`;
}

let currentUnit = "c"; // can also be 'f'
let inactiveUnitButton = document.querySelector("#inactive");
let activeUnitButton = document.querySelector("#active");
inactiveUnitButton.addEventListener("click", convertUnitClicked);
let input = document.getElementById("cityname").innerHTML;

//change background color

function switchBackground() {
  var weather = document.getElementById("description").innerHTML;
  var element = document.getElementsByTagName("body")[0];
  switch (weather) {
    case "sunny":
      element.style.backgroundImage = "url('./image/sun.jpg')";
      break;
    case "clear sky":
      element.style.backgroundImage = "url('./image/clear-sky.jpg')";
      break;
    case "scattered clouds":
      element.style.backgroundImage = "url('./image/scattered-clouds.jpg')";
      break;
    case "few clouds":
      element.style.backgroundImage = "url('./image/few-clouds.jpg')";
      break;
    case "broken clouds":
      element.style.backgroundImage = "url('./image/broken-clouds.jpg')";
      break;
    case "snow":
      element.style.backgroundImage = "url('./image/snow.jpg')";
      break;
    case "rainy":
      element.style.backgroundImage = "url('./image/rain.jpg')";
      break;
    default:
      element.style.backgroundColor = "white";
      break;
  }
}
searchInput("Bangkok")
