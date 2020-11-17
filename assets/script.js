// grab id's of various page elements
var searchedCities = $("#searchedCities");
var citySearch = $("#citySearch");
var apiKey = "4e4e3d0562345975cee7799375ccc83a";

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
    var newButton = $("<a>");
    newButton.addClass("list-group-item").addClass("list-group-item-action");
    newButton.text(city);
    searchedCities.append(newButton);
    citySearch.val("");
    newButton.attr("id", city);
});

// create function to add searched cities as buttons

// create function to search OpenWeather for the searched city

// create function to create cards out of the 5-day forecast

// create function that changes the displayed city with a button click