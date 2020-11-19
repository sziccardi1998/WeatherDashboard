// grab id's of various page elements
var searchedCities = $("#searchedCities");
var citySearch = $("#citySearch");
var apiKey = "4e4e3d0562345975cee7799375ccc83a";
var tempEle = $("#temp");
var humidEle = $("#humid");
var windEle = $("#wind");
var uvEle = $("#uvp");
var currentCity = $("#currentCity");

// searched cities added to page as button
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var city = citySearch.val();
  city = city.trim();
  if (city !== ""){var newButton = $("<button>");
  newButton.addClass("list-group-item").addClass("list-group-item-action");
  newButton.text(city);
  newButton.attr("type", "button");
  searchedCities.append(newButton);
  citySearch.val("");
  newButton.attr("id", city);
  cityWeather(city);}
});

// create function to handle ajax calls
function cityWeather(searchTerm) {
  var search =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchTerm +
    "&appid=" +
    apiKey;

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
   var weatherIcon = $("<img>").attr("src", "https:///openweathermap.org/img/w/" + response.weather[0].icon + ".png");

    currentCity.text(response.name + " (" + displayDate + ")");
    currentCity.append(weatherIcon);
    latitude = response.coord.lat;
    longitude = response.coord.lon;
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


// create function that changes the displayed city with a button click
$(document).on("click", ".list-group-item", function (event) {
    event.stopPropagation();
    var newCity = $(this).attr("id");
  console.log(newCity);
  cityWeather(newCity);
});


// create function to change the styling of the UV index to match conditions
function uvCheck(){
  var uvIndex = uvEle.text();
  console.log(uvIndex);
  uvEle.attr("class", "");
  if(parseFloat(uvIndex) < 3){
    // change color to green
    uvEle.addClass("green");
  }
  else if (((parseFloat(uvIndex))>= 3.0)&&(parseFloat(uvIndex) < 6.0)){
    // change color to yellow
    uvEle.addClass("yellow");
  } 
  else if((parseFloat(uvIndex)>=6.0)&&(parseFloat(uvIndex) < 8.0)){
    // change color to orange
    uvEle.addClass("orange");
  }
  else if((parseFloat(uvIndex)>=8.0)&&(parseFloat(uvIndex) <= 10.0)){
    // change color to red
    uvEle.addClass("red");
  }
  else if(parseFloat(uvIndex)> 10.0){
    // change color to violet
    uvEle.addClass("violet");
  }
}