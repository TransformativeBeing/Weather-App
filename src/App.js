// Code for displaying current date

function formatDate(currentDate) {
  function hourMath() {
    let hourInput = currentDate.getHours();
    if (hourInput >= 10) {
      return hourInput;
    } else {
      return `0${hourInput}`;
    }
  }

  function minuetMath() {
    let minuetInput = currentDate.getMinutes();
    if (minuetInput >= 10) {
      return minuetInput;
    } else {
      return `0${minuetInput}`;
    }
  }

  let currentDate = new Date();
  let hours = hourMath();
  let minuets = minuetMath();
  let day = days[currentDate.getDay()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formatedDate = `${day} ${hours}:${minuets}`;

  return formatedDate;
}

let date = document.querySelector(".date");
date.innerHTML = formatDate(currentDate);

// Code for changing temperature unit
let fahrenheit = document.querySelector(".fahrenheit");

fahrenheit.addEventListener("click", function (event) {
  event.preventDefault();
  let newTemp = document.querySelector(".temprature");
  function fahrenheitMath() {
    let tempElement = document.querySelector(".temprature");
    let tempNumber = tempElement.innerHTML;
    tempNumber = Number(tempNumber);
    let mathTemp = Math.round(tempNumber * (9 / 5) + 32);
    return mathTemp;
  }
  newTemp.innerHTML = fahrenheitMath();
});

let celsius = document.querySelector(".celsius");

celsius.addEventListener("click", function (event) {
  event.preventDefault();
  let newTemp = document.querySelector(".temprature");
  function celsiusMath() {
    let tempElement = document.querySelector(".temprature");
    let tempNumber = tempElement.innerHTML;
    tempNumber = Number(tempNumber);
    let mathTemp = Math.round((tempNumber - 32) * (5 / 9));
    return mathTemp;
  }
  newTemp.innerHTML = celsiusMath();
});

// Code for Display Function
function displayResponse(response) {
  function capitalize(words) {
    let string = words;
    let arr = string.split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    let str2 = arr.join(" ");
    return str2;
  }

  let tempOutput = document.querySelector(`#temperature`);
  let cityOutput = document.querySelector(`#city`);
  let countryOutput = document.querySelector(`#country`);
  let descriptionOutput = document.querySelector(`#description`);
  let humidityOutput = document.querySelector(`#humidity`);
  let windOutput = document.querySelector(`#windSpeed`);

  //console.log(response.data);

  tempOutput.innerHTML = Math.round(response.data.main.temp);
  cityOutput.innerHTML = response.data.name;
  countryOutput.innerHTML = response.data.sys.country;
  descriptionOutput.innerHTML = capitalize(
    response.data.weather[0].description
  );
  humidityOutput.innerHTML = `${response.data.main.humidity}%`;
  windOutput.innerHTML = Math.round(response.data.wind.speed);
}

// Code for City Search

document
  .querySelector("#search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let apiKey = `cebebe92bb0f992987113af37d5c411b`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
    let city = document.querySelector(`#city-search`).value;
    let Units = `metric`;
    let apiLink = `${apiUrl}${city}&units=${Units}&appid=${apiKey}`;

    axios.get(apiLink).then(displayResponse);
  });

// Code for Geoloctaion
function currentPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=`;
  let apiKey = `cebebe92bb0f992987113af37d5c411b `;
  let Units = `metric`;
  let apiLink = `${apiUrl}${position.coords.latitude}&lon=${position.coords.longitude}&units=${Units}&appid=${apiKey}`;

  axios.get(apiLink).then(displayResponse);
}

document.querySelector(`#location`).addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
});
