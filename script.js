var apiKey = '819c140350303d362f2ba760003b1335'
var cityresultsObj = new Object();
var cityArr = [];
var city = '';
var state = '';
var iconUrl = ''
function getTime() {
    return moment().format('L');
}

var currentDate = getTime();







// var iconURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'
console.log(currentDate);

if (localStorage.getItem('city') !== null) {
    city = localStorage.getItem('city');
    console.log(city);
    queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'
    currentDate = getTime();

    /////////////////  ajax call to get current forecast information set to cityresultsObj////////////////////
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        cityresultsObj = new Object();
        cityresultsObj.temp = Math.floor((response.main.temp - 273.15) * (9 / 5) + 32);
        cityresultsObj.humidity = response.main.humidity;
        cityresultsObj.windSpeed = response.wind.speed;
        cityresultsObj.icon = response.weather[0].icon;

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        $('#cityDisplay').text(city + '   ' + currentDate);
        $('#tempDisplay').text('Temperature: ' + cityresultsObj.temp + ' F');
        $('#humidityDisplay').text('Humidity: ' + cityresultsObj.humidity + ' %');
        $('#windSpeedDisplay').text('Wind Speed: ' + cityresultsObj.windSpeed + ' mph');


        ////////////////////ajax call to get uvindex  //////////////////////////////////////
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon + '&cnt=1',
            method: "GET"
        }).then(function (response) {
            cityresultsObj.uvIndex = response[0].value;
            $('#uvIndexDisplay').text('UV Index: ' + cityresultsObj.uvIndex)
        })
        var newDiv = $('<div>').text(city);
        newDiv.addClass('prevSearch');
        newDiv.attr('id', city);
        $('#searched').prepend(newDiv);
        localStorage.setItem('city', city)
        cityArr.push([city, cityresultsObj]);
        console.log(cityArr)

    })
}






///////search button on click event////////////////
$('#searchButton').on('click', function (event) {
    event.preventDefault();
    city = $('#inputCity').val().toUpperCase();
    console.log(city);
    queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'
    currentDate = getTime();

    /////////////////  ajax call to get current forecast information set to cityresultsObj////////////////////
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        cityresultsObj = new Object();
        cityresultsObj.temp = Math.floor((response.main.temp - 273.15) * (9 / 5) + 32);
        cityresultsObj.humidity = response.main.humidity;
        cityresultsObj.windSpeed = response.wind.speed;
        cityresultsObj.icon = response.weather[0].icon;

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        $('#cityDisplay').text(city + '   ' + currentDate);
        $('#tempDisplay').text('Temperature: ' + cityresultsObj.temp + ' F');
        $('#humidityDisplay').text('Humidity: ' + cityresultsObj.humidity + ' %');
        $('#windSpeedDisplay').text('Wind Speed: ' + cityresultsObj.windSpeed + ' mph');


        ////////////////////ajax call to get uvindex  //////////////////////////////////////
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon + '&cnt=1',
            method: "GET"
        }).then(function (response) {

            cityresultsObj.uvIndex = response[0].value;
            $('#uvIndexDisplay').text('UV Index: ' + cityresultsObj.uvIndex)
        })

        cityArr.push([city, cityresultsObj]);
        console.log(cityArr);


    });
    ///////  APPEND NEW ELEMENTS INSIDE CLICK EVENT//////////
    var newDiv = $('<div>').text(city);
    newDiv.addClass('prevSearch');
    newDiv.attr('id', city);
    $('#searched').prepend(newDiv);
    localStorage.setItem('city', city);

})


$('#searched').on('click', function (event) {
    city = event.target.id;
    console.log(city);
    currentDate = getTime();
    queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'

    /////////////////  ajax call to get current forecast information set to cityresultsObj////////////////////
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        cityresultsObj = new Object();
        cityresultsObj.temp = Math.floor((response.main.temp - 273.15) * (9 / 5) + 32);
        cityresultsObj.humidity = response.main.humidity;
        cityresultsObj.windSpeed = response.wind.speed;
        cityresultsObj.icon = response.weather[0].icon;

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        $('#cityDisplay').text(city + '   ' + currentDate);
        $('#tempDisplay').text('Temperature: ' + cityresultsObj.temp + ' F');
        $('#humidityDisplay').text('Humidity: ' + cityresultsObj.humidity + ' %');
        $('#windSpeedDisplay').text('Wind Speed: ' + cityresultsObj.windSpeed + ' mph');


        ////////////////////ajax call to get uvindex  //////////////////////////////////////
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon + '&cnt=1',
            method: "GET"
        }).then(function (response) {
            cityresultsObj.uvIndex = response[0].value;
            $('#uvIndexDisplay').text('UV Index: ' + cityresultsObj.uvIndex)
        })

        localStorage.setItem('city', city)


    })

});