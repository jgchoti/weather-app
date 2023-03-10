//Display forecast
function displayForecast(response) {
  const futureWeatherIcon = document.querySelectorAll(".fu-icon");
  const futureWeatherTempMax = document.querySelectorAll(".fu-max-temp");
  const futureWeatherTempMin = document.querySelectorAll(".fu-min-temp");
  for (let i = 0; i < 5; i++) {
    futureWeatherIcon[i].setAttribute("src", `${response.data.daily[i].condition.icon_url}`);
    futureWeatherTempMax[i].innerHTML = `${Math.round(response.data.daily[i].temperature.maximum)}°`;
    futureWeatherTempMin[i].innerHTML = `  ${Math.round(response.data.daily[i].temperature.minimum)}°`;
  }
}

function getForecast(cityName) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}`
  let units = "metric"
  axios.get(`${apiUrl}&units=${units}`)
    .then(function (response) {
      displayForecast(response)
    }
    )
    .catch(error => {
      alert("Oops, something went wrong. Did you break the internet? 🤔 Maybe try reloading and see if that helps? 🔄");
    })
}

//Search bar
function displayWeather(response) {
  document.querySelector("#cityname").innerHTML = response.data.city + ", " + response.data.country;
  let temperature = response.data.temperature.current;
  let cityName = response.data.city
  currentTempElement.innerHTML = Math.round(temperature)
  inactiveUnitButton.innerHTML = `°F`;
  activeUnitButton.innerHTML = `°C`;
  document.querySelector("#description").innerHTML = response.data.condition.description
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity + " %";
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed) + " mph"
  document.querySelector("#cur-temp-icon").setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  document.querySelector("#cur-temp-icon").setAttribute("alt", `${response.data.condition.icon}`)
  document.getElementById("search-bar").value = "";
  switchBackground()
  getForecast(cityName)
}
function searchInput(input) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input}&key=${apiKey}`
  currentUnit = "c"
  let units = "metric"
  axios.get(`${apiUrl}&units=${units}`)
    .then(function (response) {
      if (response.data.status === 'not_found') {
        alert(`Looks like the weather gods are feeling mischievous today 🤪 I can't seem to find the city name "${input}". Mind trying another one?`);
      } else {
        displayWeather(response)
      }
    })
    .catch(error => {
      alert("Oops, something went wrong. Did you break the internet? 🤔 Maybe try reloading and see if that helps? 🔄");
    })
}

function handleSubmit(event) {
  event.preventDefault()
  let input = document.getElementById("search-bar").value;
  if (input.length === 0) {
    alert("Don't keep me in suspense 🙏 Please enter a city name so I can tell you the weather 🌞")
  } else {
    searchInput(input);
  }
}

let apiKey = "e547dbf820o8383e8e046fe4fba3e3t4"
let currentTempElement = document.getElementById("cur-temp");
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

//Geolocation API
function getUserLocation(event) {
  event.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherGeolocation, handleGeolocationError);
  } else {
    alert("Looks like your browser is lost in space 🚀 and doesn't support geolocation. Maybe try a different one? 🤔");
  }
}

function handleGeolocationError(error) {
  alert("Oops, something went wrong with your location. Are you hiding behind a cloud? ☁️")
}

function getWeatherGeolocation(position) {
  currentUnit = "c"
  let apiGeoUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiGeoUrl)
    .then(function (response) {
      if (response.data.status === 'not_found') {
        alert(`Looks like the weather gods are feeling mischievous today 🤪 I can't seem to find your location. Mind trying another one?`);
      } else {
        displayWeather(response)
      }
    })
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getUserLocation);

// Current Date
let currentDate = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let fullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let fullMinute = currentDate.getMinutes();
if (fullMinute < 10) {
  fullMinute = "0" + fullMinute;
}
let fullHour = currentDate.getHours();
if (fullHour < 10) {
  fullHour = "0" + fullHour;
}
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `Last Update: ${fullDays[currentDate.getDay()]} ${fullHour}:${fullMinute}`;
//Forecast Day
for (let i = 1; i <= 5; i++) {
  let day = document.getElementById(`day${i}`);
  day.innerHTML = `${days[(currentDate.getDay() + i) % 7]}`
}
// Dark Mode
const isDarkMode = fullHour >= 18 || fullHour <= 6;
const elementCard = document.getElementById("app-card");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const footer = document.querySelector("footer");
const aLink = document.querySelector("a");
const elementDate = document.getElementById("date-time");
const elementUnit = document.getElementById("inactive");
const elementDescription = document.getElementById("description");
const elementHumidity = document.getElementById("humidity");
const elementWind = document.getElementById("wind");
const futureDay = document.querySelectorAll(".fu-day");
const knowText = document.querySelectorAll(".know-text");
const futureTemp = document.querySelectorAll(".fu-temp");
const activeUnit = document.querySelector(".active-unit");
const searchButton = document.querySelector(".search-button");


if (isDarkMode) {
  elementCard.classList.add("dark-mode");
  h1.classList.add("dark-mode");
  h2.classList.add("dark-mode");
  footer.classList.add("dark-mode");
  aLink.classList.add("dark-mode");
  elementDate.classList.add("dark-mode");
  elementUnit.classList.add("dark-mode");
  elementDescription.classList.add("dark-mode");
  elementHumidity.classList.add("dark-mode");
  elementWind.classList.add("dark-mode");
  currentTempElement.classList.add("dark-mode");
  activeUnit.classList.add("dark-mode");
  currentLocationButton.classList.add("dark-mode");
  searchButton.classList.add("dark-mode");
  futureDay.forEach(element => element.classList.add("dark-mode"));
  knowText.forEach(element => element.classList.add("dark-mode"))
  futureTemp.forEach(element => element.classList.add("dark-mode"))
} else {
  elementCard.classList.remove("dark-mode")
  h1.classList.remove("dark-mode");
  h2.classList.remove("dark-mode");
  footer.classList.remove("dark-mode");
  aLink.classList.remove("dark-mode");
  elementDate.classList.remove("dark-mode");
  elementUnit.classList.remove("dark-mode");
  elementDescription.classList.remove("dark-mode");
  elementHumidity.classList.remove("dark-mode");
  elementWind.classList.remove("dark-mode");
  currentTempElement.classList.remove("dark-mode");
  activeUnit.classList.remove("dark-mode");
  currentLocationButton.classList.remove("dark-mode");
  searchButton.classList.remove("dark-mode");
  futureDay.forEach(element => element.classList.remove("dark-mode"));
  knowText.forEach(element => element.classList.remove("dark-mode"));
  futureTemp.forEach(element => element.classList.remove("dark-mode"))
}

//convert to Fahrenheit
function convertUnitClicked(event) {
  if (currentUnit === `c`) {
    currentUnit = "f";
    let cityName = document.getElementById("cityname").innerHTML;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`
    let units = "imperial"
    axios.get(`${apiUrl}&units=${units}`).then(convertToFah)

  } else {
    currentUnit = "c";
    let cityName = document.getElementById("cityname").innerHTML;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`
    let units = "metric"
    axios.get(`${apiUrl}&units=${units}`).then(convertToCel)
  }
}

function convertToFah(response) {
  currentTempElement.innerHTML = Math.round(response.data.temperature.current)
  inactiveUnitButton.innerHTML = `°C`;
  activeUnitButton.innerHTML = `°F`;
  getForecastinFah(response.data.city)
}

function convertToCel(response) {
  currentTempElement.innerHTML = Math.round(response.data.temperature.current)
  inactiveUnitButton.innerHTML = `°F`;
  activeUnitButton.innerHTML = `°C`;
  getForecast(response.data.city)
}

function getForecastinFah(cityName) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}`
  let units = "imperial"
  axios.get(`${apiUrl}&units=${units}`).then(displayForecastInFah)
}

function displayForecastInFah(response) {
  const futureWeatherTempMax = document.querySelectorAll(".fu-max-temp");
  const futureWeatherTempMin = document.querySelectorAll(".fu-min-temp");
  for (let i = 0; i < 5; i++) {
    futureWeatherTempMax[i].innerHTML = `${Math.round(response.data.daily[i].temperature.maximum)}°`;
    futureWeatherTempMin[i].innerHTML = `  ${Math.round(response.data.daily[i].temperature.minimum)}°`;
  }
}

let currentUnit = "c"; // can also be 'f'
let inactiveUnitButton = document.querySelector("#inactive");
let activeUnitButton = document.querySelector("#active");
inactiveUnitButton.addEventListener("click", convertUnitClicked);


// change background color
function switchBackground() {
  var weather = document.getElementById("description").innerHTML;
  var element = document.getElementsByTagName("body")[0];
  if (fullHour >= 18 || fullHour <= 6) {
    element.style.backgroundImage = "url('./image/night.jpg')"
  }
  else {
    switch (weather) {
      case "clear sky":
        element.style.backgroundImage = "url('./image/clear-sky.jpg')";
        break;
      case "overcast clouds":
      case "scattered clouds":
      case "few clouds":
      case "broken clouds":
        element.style.backgroundImage = "url('./image/clouds.jpg')";
        break;
      case "snow":
      case "light snow":
        element.style.backgroundImage = "url('./image/snow.jpg')";
        break;
      case "light intensity drizzle":
        element.style.backgroundImage = "url('./image/drizzle.jpg')";
        break;
      case "shower rain":
      case "moderate rain":
      case "light rain":
      case "rain":
      case "Thunderstorm":
        element.style.backgroundImage = "url('./image/rain.jpg')";
        break;
      case "mist":
      case "fog":
        element.style.backgroundImage = "url('./image/mist.jpg')";
        break;
      case "haze":
        element.style.backgroundImage = "url('./image/haze.jpg')";
        break;
      default:
        element.style.backgroundColor = "white";
        break;
    }
  }
}

searchInput("Antwerp")