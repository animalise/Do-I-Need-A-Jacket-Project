// specify date and time 

function formatDate(timestamp) {

  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }


  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ]

  let month = months[date.getMonth()];


  return `<small><em> Last updated: </em></small><br /> ${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} <br  /> ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
}

function forecastHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// temperature data 

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".current-temp");
  let cityElement = document.querySelector(".city");
  let descriptionElement = document.querySelector(".current-atmosphere");
  let dateElement = document.querySelector(".date");
  let jacketElement = document.querySelector(".jacket");
  let currentIconElement = document.querySelector("#icon1");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  currentIconElement.setAttribute("class", displayIcon(response.data.weather[0].icon));
  currentIconElement.setAttribute("style", "font-size: 100px;");

  if (response.data.main.temp < 60) {
    jacketElement.innerHTML = "bring a jacket!"
  } else {
    jacketElement.innerHTML = "no jacket!"
  }
  if (response.data.weather[0].main === "Rain" ||
    response.data.weather[0].main === "Drizzle" ||
    response.data.weather[0].main === "Thunderstorm") {
    jacketElement.innerHTML = "don't forget your umbrella!"
  }
}

// icons 

function displayIcon(iconValue) {
  if (iconValue === "01d") {
    return "fas fa-sun"
  }

  if (iconValue === "01n") {
    return "fas fa-moon"
  }

  if (iconValue === "02d") {
    return "fas fa-cloud-sun"
  }

  if (iconValue === "02n") {
    return "fas fa-cloud-moon"
  }

  if (iconValue === "03d" ||
    iconValue === "03n" ||
    iconValue === "04d" ||
    iconValue === "04n") {
    return "fas fa-cloud"
  }

  if (iconValue === "09d" ||
    iconValue === "10d") {
    return "fas fa-cloud-rain"
  }

  if (iconValue === "09n" ||
    iconValue === "10n") {
    return "fas fa-cloud-moon-rain"
  }

  if (iconValue === "11d" ||
    iconValue === "11n") {
    return "fas fa-bolt"
  }

  if (iconValue === "13d" ||
    iconValue === "13n") {
    return "fas fa-snowflake"
  }

  if (iconValue === "50d" ||
    iconValue === "50n") {
    return "fas fa-smog"
  }
}


// forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="card">
      <div class="card-header">${forecastHours(forecast.dt * 1000)}</div>
      <div class="card-body">
        <i class="${displayIcon(forecast.weather[0].icon)}"></i>
        <h5 class="card-text"><strong>${Math.round(forecast.main.temp_max)}°</strong>/ ${Math.round(forecast.main.temp_min)}° </h5>
      </div>
      `;
  }

  console.log(response.data);
}

// search form 

function search(city) {
  let apiKey = "af173d370d3263e90c511e8cd78a494a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#searchInput");
  search(searchInputElement.value);
}


// current location button

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "af173d370d3263e90c511e8cd78a494a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}


// temperature units 

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32 * 5 / 9);
  let temperatureElement = document.querySelector(".current-temp")
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp")
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}



// global units existing outside of functions 

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getCurrentPosition);


search("Amsterdam");

