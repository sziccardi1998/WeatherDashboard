// grab id's of various page elements
var searchedCities = $("#searchedCities");
var citySearch = $("#citySearch");
var apiKey = "4e4e3d0562345975cee7799375ccc83a";
var tempEle = $("#temp");
var humidEle = $("#humid");
var windEle = $("#wind");
var uvEle = $("#uvp");
var currentCity = $("#currentCity");
var cardRow = $("#cardRow");
var lastCity = "";

// searched cities added to page as button
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var city = citySearch.val();
  city = city.trim();
  if (city !== "") {
    var newButton = $("<button>");
    newButton.addClass("list-group-item").addClass("list-group-item-action");
    newButton.text(city);
    newButton.attr("type", "button");
    searchedCities.append(newButton);
    citySearch.val("");
    newButton.attr("id", city);
    cityWeather(city);
  }
});

// create function to handle ajax calls
function cityWeather(searchTerm) {
  var search =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchTerm +
    "&appid=" +
    apiKey;

  // save serach term as the current last searched
  lastCity = searchTerm;
  saveSearch(searchTerm);

  $.ajax({
    url: search,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // retrieve and set temperature, wind speed and humidity
    var temperature = (response.main.temp - 273.15) * 1.8 + 32;
    tempEle.text("Temperature: " + temperature.toFixed(1) + " F");
    var humidityRel = response.main.humidity;
    humidEle.text("Humidity: " + humidityRel + "%");
    var windSpeed = response.wind.speed * 2.237;
    windEle.text("Wind Speed: " + windSpeed.toFixed(1) + " MPH");

    // get and set current date
    console.log(response.dt);
    var startDate = Date(response.dt);
    var displayDate = startDate.slice(4, 15);
    console.log(displayDate);

    // create img to hold weather icon
    var weatherIcon = $("<img>").attr(
      "src",
      "https:///openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );

    currentCity.text(response.name + " (" + displayDate + ")");
    currentCity.append(weatherIcon);
    latitude = response.coord.lat;
    longitude = response.coord.lon;
    fiveCards(latitude, longitude);
    var uvSearch =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey;
    $.ajax({
      url: uvSearch,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      uvEle.text(response.value);
      uvCheck();
    });
  });
}

// create function to create cards out of the 5-day forecast
function fiveCards(lat, lon) {
  // delete previous cards
  cardRow.html("");
  // create call to API

  var fiveDay =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    apiKey;
  $.ajax({
    url: fiveDay,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // iterate over each of the days in the 5 day forecast
    for (var i = 1; i < 6; i++) {
      console.log(response.daily[i]);
      // get forecast date
      var startDate = new Date(response.daily[i].dt * 1000);
      startDate = startDate.toLocaleDateString();
      var displayDate = startDate.slice(0, 15);
      // create card elements
      var newCard = $("<div>").attr("class", "card");
      newCard.addClass("col-2");
      var cardBody = $("<div>").attr("class", "card-body");
      var cardDate = $("<h6>").attr("class", "card-title");
      var cardImage = $("<img>")
        .attr("class", "card-img")
        .attr(
          "src",
          "https:///openweathermap.org/img/w/" +
            response.daily[i].weather[0].icon +
            ".png"
        );
      cardDate.text(displayDate);
      var cardTemp = $("<p>").attr("class", "card-text");
      var cardHumidity = $("<p>").attr("class", "card-text");
      cardTemp.text("Temp: " + response.daily[i].temp.day + " F");
      cardHumidity.text("Humidity: " + response.daily[i].humidity + "%");
      cardRow.append(newCard);
      newCard.append(cardBody);
      cardBody.append(cardDate);
      cardBody.append(cardImage);
      cardBody.append(cardTemp);
      cardBody.append(cardHumidity);
    }
  });
}

// create function that changes the displayed city with a button click
$(document).on("click", ".list-group-item", function (event) {
  event.stopPropagation();
  var newCity = $(this).attr("id");
  console.log(newCity);
  cityWeather(newCity);
});

// create function to change the styling of the UV index to match conditions
function uvCheck() {
  var uvIndex = uvEle.text();
  console.log(uvIndex);
  uvEle.attr("class", "");
  if (parseFloat(uvIndex) < 3) {
    // change color to green
    uvEle.addClass("green");
  } else if (parseFloat(uvIndex) >= 3.0 && parseFloat(uvIndex) < 6.0) {
    // change color to yellow
    uvEle.addClass("yellow");
  } else if (parseFloat(uvIndex) >= 6.0 && parseFloat(uvIndex) < 8.0) {
    // change color to orange
    uvEle.addClass("orange");
  } else if (parseFloat(uvIndex) >= 8.0 && parseFloat(uvIndex) <= 10.0) {
    // change color to red
    uvEle.addClass("red");
  } else if (parseFloat(uvIndex) > 10.0) {
    // change color to violet
    uvEle.addClass("violet");
  }
}

// create function to save the last searched city to local storage
function saveSearch(search) {
  localStorage.setItem("storedSearch", search);
}

function getSearch() {
  var recoveredSearch = localStorage.getItem("storedSearch");
  cityWeather(recoveredSearch);
}

getSearch();