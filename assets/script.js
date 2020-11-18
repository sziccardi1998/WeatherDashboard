// grab id's of various page elements
var searchedCities = $("#searchedCities");
var citySearch = $("#citySearch");
var apiKey = "4e4e3d0562345975cee7799375ccc83a";
var tempEle = $("#temp");
var humidEle = $("#humid");
var windEle = $("#wind");
var uvEle = $("#uvp");
var currentCity = $("#currentCity");

// test to check input group
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var city = citySearch.val();
    console.log(city);
    
});

// searched cities added to page as button
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var city = citySearch.val();
    city=city.trim();
    var newButton = $("<a>");
    newButton.addClass("list-group-item").addClass("list-group-item-action");
    newButton.text(city);
    searchedCities.append(newButton);
    citySearch.val("");
    newButton.attr("id", city);
    cityWeather(city);

});

// create function to handle ajax calls
function cityWeather(searchTerm) {
    var search = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey;

    $.ajax({
        url: search,
        method: "GET"
    }).then(function(response){
        console.log(response);
        // retrieve and set temperature, wind speed and humidity
        var temperature = (response.main.temp - 273.15) * 1.80 + 32;
        tempEle.text("Temperature: " + temperature.toFixed(1) + " F");
        var humidityRel = response.main.humidity;
        humidEle.text("Humidity: " + humidityRel + "%");
        var windSpeed = response.wind.speed * 2.237;
        windEle.text("Wind Speed: " + windSpeed + " MPH");

        // get and set current date
        console.log(response.dt);
        var startDate = Date(response.dt);
        var displayDate = startDate.slice(4,15);
        console.log(displayDate);

        currentCity.text(response.name + " (" + displayDate + ")");
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        var uvSearch = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        $.ajax({
            url: uvSearch,
            method: "GET"
        }).then(function(response){
            console.log(response);
            uvEle.text(response.value);
            


        })
    });
}

// create function to create cards out of the 5-day forecast

// create function that changes the displayed city with a button click
$(".list-group-item-action").on("click", function(event){
    event.stopPropogation();
    event.preventDefault();
    var nextCity = this.attr("id");
    console.log(nextCity);
    cityWeather(nextCity);
});