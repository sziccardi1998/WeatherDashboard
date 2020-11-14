// test to check input group
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var city = $("#citySearch").val();
    console.log(city);
});