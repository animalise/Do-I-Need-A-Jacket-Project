function displayTemperature(response) {
  console.log(response.data)
}

let apiKey = "af173d370d3263e90c511e8cd78a494a";
let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=af173d370d3263e90c511e8cd78a494a&units=imperial";

axios.get(apiUrl).then(displayTemperature);

