//use open weather api
// 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat '&lon=' + lon + '&exclude=hourly,minutely,alerts&units=imperial&appid=' + appid;
// 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=' + appid;
//"https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
//"https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon" + lon + "&appid=" + apiKey;
//"https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

/*
	get a reference to search-form, history-list, today, forecast
*/
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

// create a var for appid - var appid = 'd91f911bcf2c0f925fb6535547a5ddc9';
var apiKey="b8ba7727eedeaba60b1fe7994df6a07a";
// variable to hold our search history !searchHistory.includes(city)
var history = searchHistory.includes(city);
// get the history from localStorage and update the searchHistory variable - if there are no results -> [] (make sure to parse JSON)

// function to add location to localStorage (addToStorage)
	// accept a location as a parameter
	// add the passed in parameter to exisitingHistory array
	// update localStorage (don't forget to stringify JSON)

// function to add an item to searchHistory (addToHistory)
	// accept a location as a parameter
	// create an li
	// add any classes
	// set textContent to value of parameter
	// append it to the history-list

// loop through searchHistory -> call addToHistory(searchHistory[i])


// function to get our coordinates (getCoordinates)
	// accept location as a parameter
	
	// create a url -> 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=' + appid;
	
	// fetch call

		// first then -> accept response as a parameter -> return response.json()

		/* second then
			-> accept data as a parameter
			-> access data[0]
			-> .name, .lat, .lon
			-> pass those as arguments to getWeather
		*/

// function that gets our weather data (getWeather)
var getWeather = function(city) {
    var apiKey = "b8ba7727eedeaba60b1fe7994df6a07a";
// create url
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(weatherUrl)
    .then(function(response) {
        response.json().then(function(data) {
            renderWeather(data, city);
        });
    });
};

var renderWeather = function(weather, search) {
// clear out the today container -> innerHTML = '' 
    currentWeather.innerHTML = "";
    currentCity.textContent = search;

    var todaysDate = document.createElement("span")
    todaysDate.textContent =" (" + moment(weather.dt.value).format("MMMM Do, YYYY") + ") ";
    currentCity.appendChild(todaysDate);

    //create img for icon
    //-> set src attribute to the icon - 'http://openweathermap.org/img/w/' + current.weather.icon + '.png';
    //-> https://openweathermap.org/weather-conditions
    var icon = document.createElement("span")
    icon.setAttribute("src", 'https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png');
    currentCity.appendChild(icon);

    //create three span for windspeed, temp, humidity (.card-text)
    //-> add any bootstrap or custom classes
    //-> set text content to label and  data property (i.e. 'Temperature: ' + current.temp' + ' °F')
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
	
 //create p for uv index
    //-> add any classes (.card-text)
    //-> set text content to label
    
    //create span
    //-> add any classes (.btn)
    //-> set textContent to uv index property
    //-> if, else statement to set the color to green if under 3, yellow if between 3 and 7, or red if above 7 (.btn-danger, .btn-warning, .btn-success)
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
}
// fetch call

		// first then -> accept response as a parameter -> return response.json()

		/* second then
			-> accept data as a parameter
			-> access data
			-> .current .daily
			-> pass those as arguments to renderToday(name, current) and renderForecast(daily)
		*/


// function to render the current data - renderToday

	// accept location name and current object from getWeather as parameters

	

	/*
		create a div (.card)
    -> add any bootstrap or custom classes

    create a div for the card body (.card-body)
    -> add any bootstrap or custom classes

    create a heading
    -> add any bootstrap or custom classes (.card-title)
    -> set textContent to location name (location parameter) and the current date (moment or new Date().toLocaleDateString())
    
  
    
   
    append img to heading
    append heading to card body
    append the paragraphs for wind, temp, and humidity to the card body
    append span to the paragraph for UV Index
    append paragraph for UV Index to card body
    append the card body to the card
    append the card to the today div
	*/

// function to render the five-day forecast - renderForecast
	// accept daily object from getWeather as a parameter

	// set the innerHTMl of the forecast div to a header that says 5-day forecast

	// create a div for the row of cards -> add any classes

	/*
    loop over data
      create a div for each col
      -> add any classes

      create a div for the card body
      -> add any classes

      create a div for the card
      -> add any classes

      create a heading for the title
      -> add any classes
      -> set textContent to the date (using moment or new Date(property).toLocaleDateString();)

      create img for the icon
      -> set src attribute to the icon
      -> https://openweathermap.org/weather-conditions

      create paragraphs for the wind, temp, and humidity
      -> add classes
      -> set textContent to label and property from data

      append the title, image,and paragraphs to the card body
      append the card body to the card
      append the card to the col
      append the col to the row
  */

// function to handle the form submission - handleSubmit
//accept event object as a parameter

  /*
    
    preventDefault

    get the value of the input using the children property (DOM Traversal) - searchForm.children[0].value

    check if the value already exists in the history array
    -> if not, call addToHistory and addToHistoryList

  	call getCoordinates -> pass in the searchValue
  	clear the input - searchForm.children[0].value = ''
  */

// add event handler to the form searchForm.addEventListener('submit', handleSubmit)

searchFormEl.addEventListener("submit" )

// add an event listener to the history ul
  /*
    on click
    pass event parameter to the function
    check that the event.target is an li (event.target.matches('li'))
    get the id or textContent and call getCoordinates
  */