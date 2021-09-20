// Display Function
function displayResponse(response) {
    currentTemp = Math.round(response.data.main.temp);
    currentWind = Math.round(response.data.wind.speed);
    timeZone = response.data.timezone / 3600;

    document.querySelector(`#temperature`).innerHTML = currentTemp;
    document.querySelector(`#city`).innerHTML = response.data.name;
    document.querySelector(`#country`).innerHTML = response.data.sys.country;
    document.querySelector(`#description`).innerHTML =
        response.data.weather[0].description;
    document.querySelector(
        `#humidity`
    ).innerHTML = `${response.data.main.humidity}%`;
    document.querySelector(`#windSpeed`).innerHTML = currentWind;
    document.querySelector(`#date`).innerHTML = formatDate(
        response.data.dt * 1000
    );
    document.querySelector(`#sunriseTime`).innerHTML = formatSunTimes(
        response.data.sys.sunrise * 1000
    );
    document.querySelector(`#sunsetTime`).innerHTML = formatSunTimes(
        response.data.sys.sunset * 1000
    );
    document
        .querySelector(`#descriptionIcon`)
        .setAttribute(
            `src`,
            `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
    document
        .querySelector(`#descriptionIcon`)
        .setAttribute(`alt`, response.data.weather[0].description);

    getForecast(response.data.coord);
}

// Forecast Displayed
function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastHTML = `<div class="row row4">`;

    forecast.forEach(function(forecastDay, index) {
        if (index < 5) {
            forecastHTML =
                forecastHTML +
                `<div class="col dayset1">
    <div class="day day1">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" class="weather weather1" id="forecast1" alt="">
    <div class="temp temp1">
    <span class="high">${Math.round(forecastDay.temp.max)}˚</span>
    <span class="low">${Math.round(forecastDay.temp.min)}˚</span>
    </div>`;
            forecastHTML = forecastHTML + `</div>`;
        }
    });

    document.querySelector(`#weatherForecast`).innerHTML = forecastHTML;
}

// City Search
function search(city) {
    let apiKey = `cebebe92bb0f992987113af37d5c411b`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
    let Units = `imperial`;
    let apiLink = `${apiUrl}${city}&units=${Units}&appid=${apiKey}`;

    axios.get(apiLink).then(displayResponse);
}

// Geo-location
function currentPosition(position) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=`;
    let apiKey = `cebebe92bb0f992987113af37d5c411b `;
    let Units = `imperial`;
    let apiLink = `${apiUrl}${position.coords.latitude}&lon=${position.coords.longitude}&units=${Units}&appid=${apiKey}`;

    axios.get(apiLink).then(displayResponse);
}

// Geo-forecast
function getForecast(coordinates) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=`;
    let apiKey = `cebebe92bb0f992987113af37d5c411b `;
    let Units = `imperial`;
    let apiLink = `${apiUrl}${coordinates.lat}&lon=${coordinates.lon}&units=${Units}&appid=${apiKey}`;

    axios.get(apiLink).then(displayForecast);
}

// Current Time & Day
function formatDate(timeStamp) {
    function timeMath(hour) {
        let offSet = date.getTimezoneOffset() / -60;
        let time = hour - offSet + timeZone;
        if (time > 24) {
            return time - 24;
        }
        if (time < 0) {
            return time + 24;
        } else {
            return time;
        }
    }

    function hourMath() {
        let hour = date.getHours();
        let hourInput = timeMath(hour);
        if (hourInput >= 10) {
            return hourInput;
        } else {
            return `0${hourInput}`;
        }
    }

    function minuetMath() {
        let minuetInput = date.getMinutes();
        if (minuetInput >= 10) {
            return minuetInput;
        } else {
            return `0${minuetInput}`;
        }
    }

    function weekMath(week) {
        let offSet = date.getTimezoneOffset() / -60;
        let hour = date.getHours();
        let time = hour - offSet + timeZone;

        if (time > 24) {
            week + 1;
            if (week > 6) {
                return (week = 0);
            } else {
                return week;
            }
        }
        if (time < 0) {
            week - 1;
            if (week < 0) {
                return (week = 6);
            } else {
                return week;
            }
        } else {
            return week;
        }
    }
    let date = new Date(timeStamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[weekMath(date.getDay())];
    let hours = hourMath();
    let minuets = minuetMath();

    return `${day} ${hours}:${minuets}`;
}

// Sunrise & Sunset times
function formatSunTimes(timeStamp) {
    function timeMath(hour) {
        let offSet = date.getTimezoneOffset() / -60;
        let time = hour - offSet + timeZone;
        if (time > 24) {
            return time - 24;
        }
        if (time < 0) {
            return time + 24;
        } else {
            return time;
        }
    }

    function hourMath() {
        let hour = date.getHours();
        let hourInput = timeMath(hour);
        if (hourInput >= 10) {
            return hourInput;
        } else {
            return `0${hourInput}`;
        }
    }

    function minuetMath() {
        let minuetInput = date.getMinutes();
        if (minuetInput >= 10) {
            return minuetInput;
        } else {
            return `0${minuetInput}`;
        }
    }

    let date = new Date(timeStamp);
    let hours = hourMath();
    let minuets = minuetMath();

    return `${hours}:${minuets}`;
}

// Forecast Day
function formatDay(timeStamp) {
    function weekMath(week) {
        let offSet = date.getTimezoneOffset() / -60;
        let hour = date.getHours();
        let time = hour - offSet + timeZone;
        //console.log(week);
        if (time > 24) {
            week + 1;
            if (week > 6) {
                return (week = 0);
            } else {
                return week;
            }
        }
        if (time < 0) {
            week - 1;
            if (week < 0) {
                return (week = 6);
            } else {
                return week;
            }
        } else {
            return week;
        }
    }
    let date = new Date(timeStamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[weekMath(date.getDay())];

    return day;
}

// Geo-location Handling
document.querySelector(`#location`).addEventListener("click", function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentPosition);
    document.querySelector("#celsius").classList.add(`active`);
    document.querySelector("#fahrenheit").classList.remove(`active`);
    document.querySelector("#windUnit").innerHTML = `km/h`;
});

// Search Handling
document
    .querySelector("#search-form")
    .addEventListener("submit", function(event) {
        event.preventDefault();
        search(document.querySelector(`#city-search`).value);
        document.querySelector("#celsius").classList.add(`active`);
        document.querySelector("#fahrenheit").classList.remove(`active`);
        document.querySelector("#windUnit").innerHTML = `km/h`;
    });

let timeZone = null;
let weekDay = null;

search(`seattle`);