//Displayed Results
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

  //console.log(response.data);
  document.querySelector(
    `#descriptionEmoji`
  ).src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  document.querySelector(`#description`).innerHTML = capitalize(
    response.data.weather[0].description
  );
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#country`).innerHTML = response.data.sys.country;

  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#windSpeed`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#date`).innerHTML = formatDate(
    new Date(response.data.dt * 1000)
  );
}

//City Search
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

//Geo-location
document.querySelector(`#location`).addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
});

function currentPosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=`;
  let apiKey = `cebebe92bb0f992987113af37d5c411b `;
  let Units = `metric`;
  let apiLink = `${apiUrl}${position.coords.latitude}&lon=${position.coords.longitude}&units=${Units}&appid=${apiKey}`;

  axios.get(apiLink).then(displayResponse);
}

//Displaying Date
function formatDate(currentDate) {
  function hourMath() {
    let hourInput = currentDate.getHours();
    if (hourInput >= 10) {
      return hourInput;
    } else {
      return hourInput;
    }
  }

  function minuetMath() {
    let minuetInput = currentDate.getMinutes();
    if (minuetInput >= 10) {
      return minuetInput;
    } else {
      return minuetInput;
    }
  }

  let hours = hourMath();
  let minuets = minuetMath();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  return `${day} ${hours}:${minuets}`;
}
