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

  let days = ["Sunday", "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
  let day = days[date.getDay()];
  
  let months = ["Jan." , "Feb." , "Mar." , "Apr." , "May" , "Jun." , "Jul." , "Aug." , "Sept." , "Oct." , "Nov." , "Dec."]
  let month = months[date.getMonth()];

  return `${date};`
}


function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector(".current-temp");
  let cityElement = document.querySelector(".city");
  let descriptionElement = document.querySelector(".current-atmosphere");
  let dateElement = document.querySelector(".date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp); 
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000)
}

let apiKey = "af173d370d3263e90c511e8cd78a494a";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);

