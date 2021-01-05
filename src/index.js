function formatDate(timestamp){

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
              "Monday" , 
              "Tuesday" , 
              "Wednesday" , 
              "Thursday" , 
              "Friday" , 
              "Saturday"
            ];

  let day = days[date.getDay()];
  
  let months = [
                "Jan" , 
                "Feb" , 
                "Mar" , 
                "Apr" , 
                "May" , 
                "Jun" , 
                "Jul" , 
                "Aug" , 
                "Sept" , 
                "Oct" , 
                "Nov" , 
                "Dec"
              ]

  let month = months[date.getMonth()];

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} <br  /> ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
}


function displayTemperature(response) {
  let temperatureElement = document.querySelector(".current-temp");
  let cityElement = document.querySelector(".city");
  let descriptionElement = document.querySelector(".current-atmosphere");
  let dateElement = document.querySelector(".date");
  let jacketElement = document.querySelector(".jacket");
  let currentIconElement = document.querySelector("#icon1");

  temperatureElement.innerHTML = Math.round(response.data.main.temp); 
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
  if (response.data.weather[0].main === "Rain" || response.data.weather[0].main === "Drizzle" || response.data.weather[0].main === "Thunderstorm") {
    jacketElement.innerHTML = "don't forget your umbrella!"
  }

  console.log(response.data);
}

function displayIcon(iconValue) {
if (iconValue === "01d" || iconValue === "01n") {
  return "fas fa-sun"
}

if (iconValue === "02d" || iconValue === "02n") {
  return "fas fa-cloud-sun"
}

if (iconValue === "03d" || iconValue === "03n" || iconValue === "04d" || iconValue === "04n") {
  return "fas fa-cloud"
}

if (iconValue === "09d" || iconValue === "09n" || iconValue === "10d" || iconValue === "10n") {
  return "fas fa-cloud-rain"
}

if (iconValue === "11d" || iconValue === "11n") {
  return "fas fa-bolt"
}

if (iconValue === "13d" || "13n") {
  return "fas fa-snowflake"
}
}


function search(city) {
  let apiKey = "af173d370d3263e90c511e8cd78a494a";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#searchInput");
  search(searchInputElement.value);
}


let form = document.querySelector("#search-form"); 
form.addEventListener("submit", handleSubmit);

search("New York");