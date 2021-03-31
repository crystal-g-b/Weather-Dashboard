
var cities = [];

var searchFormEl = document.querySelector("#search-form");
var searchHistory = document.querySelector("#cities-list");
var searching = document.querySelector("#city");
var currentWeather = document.querySelector("#today");
var currentCity = document.querySelector("#searched-city");
var forecastHeader = document.querySelector("#forecast");
var fiveDay = document.querySelector("#forecast-container");



var saveCity = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};


var getWeather = function(location) {
    var apiKey = "b8ba7727eedeaba60b1fe7994df6a07a";

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(weatherUrl)
    .then(function(response) {
        response.json().then(function(data) {
            renderWeather(data, location);
        });
    });
};

var renderWeather = function(weather, search) {
 
    currentWeather.innerHTML = "";
    currentCity.textContent = search;

    var todaysDate = document.createElement("span")
    todaysDate.textContent =" (" + moment(weather.dt.value).format("MMMM Do, YYYY") + ") ";
    currentCity.appendChild(todaysDate);

   
    var icon = document.createElement("span")
    icon.setAttribute("src", 'https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png');
    currentCity.appendChild(icon);

    
    var tempEl = document.createElement("span");
    tempEl.textContent = "Temperature: " + weather.temp + "°F";
    tempEl.classList.add("card-text");

    currentWeather.appendChild(tempEl);

    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + "mph";
    windSpeedEl.classList.add("card-text");

    currentWeather.appendChild(windSpeedEl);

    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
    humidityEl.classList.add("card-text");

    currentWeather.appendChild(humidityEl);

    var latitude = weather.coord.latitude;
    var longitude = weather.coord.longitude;
   
}
	
var uvIndex = function(latitude, longitude) {
  var apiKey = "b8ba7727eedeaba60b1fe7994df6a07a";
  var uxUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon" + longitude + "&appid=" + apiKey;
  fetch(uxUrl)
  .then(function(response) {
    response.json().then(function(data) {
      displayUx(data)
    });
  });
}

var displayUx = function(uxindex) {
  var uvIndexEl = document.createElement("div");
  uvIndexEl.textContent = "UV Index: "
  uvIndexEl.classList.add("card-text");

  uvLevel = document.createElement("span")
  uvLevel.textContent = index.value

  if(index.value <=3) {
    uvLevel.classList.add("bg-success")
  }
  else if(index.value >3 && index.value <=7) {
    uvLevel.classList.add("bg-warning")
  }
  else if(index.value >7) {
    uvLevel.classList.add("bg-danger")
  };

  uvIndexEl.appendChild(uvLevel);

  currentWeather.appendChild(uvIndexEl);
}



var getForecast = function(location) {
  var apiKey = "b8ba7727eedeaba60b1fe7994df6a07a";
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

  fetch(forecastUrl)
  .then(function(response) {
    response.json().then(function(data) {
      renderForecast(data);
    });
  });
};

var renderForecast = function(weather) {
  fiveDay.textContent = ""
  forecastHeader.textContent = "5-Day Forecast:";

  var forecast = weather.list;
    for(var i=5; i < forecast.length; i=i+8) {
    var dailyForecast = forecast [i];

    var forecastEL = document.createElement("div");
    forecastEL.classList.add("card bg-primary text-light m-2");

    var forecastDate = document.createElement("h5")
    forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMMM Do, YYYY");
    forecastDate.classList.add("card-body text-center")
    forecastEL.appendChild(forecastDate);

    var forecastIcon = document.createElement("img")
    forecastIcon.classList.add("card-body text-center");
    forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png");

    forecastEL.appendChild(forecastIcon);

    var forecastTemp = document.createElement("span");
    forecastTemp.classList.add("card-body text-center");
    forecastTemp.textContent = dailyForecast.main.temp + "°F";

    forecastEL.appendChild(forecastTemp);

    var forecastHumidity = document.createElement("span");
    forecastHumidity.classList.add("card-body text-center");
    forecastHumidity.textContent = dailyForecast.main.humidity + "%";

    forecastEL.appendChild(forecastHumidity);

    fiveDay.appendChild(frorecastEL);
    }
}

var history = function(history) {
  historyEl = document.createElement("button");
  historyEl.textContent = history;
  historyEl.classList.add("d-flex w-100 btn-light border p-2");
  historyEl.setAttribute("data-location", history)
  historyEl.setAttribute("type", "submit");

  historyButton.prepend(historyEl);
}

var handleHistory = function(event) {
  var location = event.target.getAttribute("data-location")
  if(location) {
    getWeather(location);
    getForecast(location);
  }
}

 
var handleSubmit =function(event) {
  event.preventDefault();
  var location = searching.value.trim();
  if(location) {
    getWeather(location);
    getForecast(location);
    cities.unshift(city);
    searching.value = "";
  }

  saveCity();
  history(location);
}



searchFormEl.addEventListener("submit", handleSubmit);



historyButton.addEventListener("click", handleHistory);

