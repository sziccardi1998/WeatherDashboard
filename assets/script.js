// grab id's of various page elements
var searchedCities = $("#searchedCities");
var citySearch = $("#citySearch");

// test to check input group
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var city = citySearch.val();
    console.log(city);
});

// create function to add searched cities as buttons

// create function to search OpenWeather for the searched city

// create function to create cards out of the 5-day forecast

// create function that changes the displayed city with a button click