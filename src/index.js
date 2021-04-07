function currentDate(date) {
  let number = date.getDate();
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
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${number}, ${hour}:${minutes}`;
}

let currentTime = document.querySelector("p");
let blabla = new Date();
currentTime.innerHTML = currentDate(blabla);

function changeCityFromSearchBox(event) {
  event.preventDefault();
  let mainCity = document.querySelector("h2");
  mainCity.innerHTML = enterCity();
  let apiCity = enterCity();
  let apiKey = "3ec7bf82a84873e82215df15af12d134";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&units=metric&appid=${apiKey}`;
  // axios.get(apiUrl).then(showTemp);
  axios.get(apiUrl).then(function (response) {
    showTemp(response);
    showRealFeel(response);
    //showFullData(response.data.main.temp, "#temperatureTitle");
    //showFullData(response.data.main.feels_like, ".subRealfeel");
  });
}

function enterCity() {
  let searchInputCity = document.querySelector("#search-city-input");
  return searchInputCity.value;
}

let searchBox = document.querySelector(".search-container");
searchBox.addEventListener("submit", changeCityFromSearchBox);

function celsiusClick(event) {
  event.preventDefault();
  console.log(event.target);

  let temperature = document.querySelector("#temperatureTitle");
  if (event.target === celsius) {
    temperature.innerHTML = 19;
  } else {
    temperature.innerHTML = Math.round((temperature.innerHTML * 9) / 5 + 32);
  }
}

let celsius = document.querySelector("#celsius");
let farenheit = document.querySelector("#farenheith");

celsius.addEventListener("click", celsiusClick);
farenheit.addEventListener("click", celsiusClick);

function showTemp(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperatureTitle");
  mainTemp.innerHTML = temp;
}

function showRealFeel(response) {
  let realFeel = Math.round(response.data.main.feels_like);
  let setRealFeel = document.querySelector(".subRealfeel");
  setRealFeel.innerHTML = `Real Feel ${realFeel}ºC`;
}

/* this function is to have onlly one function with all the data temperature changes, 
    for this to happens: showFullData(response.data.main.temp, "#temperatureTitle");
    //showFullData(response.data.main.feels_like, ".subRealfeel");
function showFullData(type, selector) {
  let data = Math.round(type);
  let setInnerData = document.querySelector(selector);
  setInnerData.innerHTML = data;
}
*/

let current = document.querySelector("#currentLocation");
current.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(getLocation)
);

function getLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3ec7bf82a84873e82215df15af12d134";
  let apiUrl = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
  console.log(apiUrl);
}
