// grab id's of various page elements
var searchedCities = $("#searchedCities");
var citySearch = $("#citySearch");
var apiKey = "4e4e3d0562345975cee7799375ccc83a";
var tempEle = $("#temp");
var humidEle = $("#humid");
var windEle = $("#wind");
var uvEle = $("#uv");

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

    // city searched in OpenWeather

    var search = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    $.ajax({
        url: search,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var temperature = (response.main.temp - 273.15) * 1.80 + 32;
        tempEle.text("Temperature: " + temperature.toFixed(1) + " F");
        var humidityRel = response.main.humidity;
        humidEle.text("Humidity: " + humidityRel + "%");
        var windSpeed = response.wind.speed * 2.237;
        windEle.text("Wind Speed: " + windSpeed + " MPH");

    });
});


// create function to create cards out of the 5-day forecast

// create function that changes the displayed city with a button click