var apiKey = '819c140350303d362f2ba760003b1335'
var cityresultsObj = new Object();
var cityArr = [];
var city = '';
var state = '';
var iconUrl = ''








// var iconURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'


function getTime() {
    return moment().format('L');
}

var currentDate = getTime();
console.log(currentDate);







$('#searchButton').on('click', function (event) {
    event.preventDefault();
    city = $('#inputCity').val().toUpperCase();
    console.log(city);
    queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'


    /////////////////  ajax call to get current forecast information set to cityresultsObj////////////////////
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        cityresultsObj = new Object();
        cityresultsObj.temp = response.main.temp;
        cityresultsObj.humidity = response.main.humidity;
        cityresultsObj.windSpeed = response.wind.speed;
        cityresultsObj.icon = response.weather[0].icon;

        $('#cityDisplay').text(city);
        $('#tempDisplay').text('Temperature: '+cityresultsObj.temp);
        $('#humidityDisplay').text('Humidity: '+cityresultsObj.humidity);
        $('#windSpeedDisplay').text('Wind Speed: '+cityresultsObj.windSpeed);


        var lat = response.coord.lat;
        var lon = response.coord.lon;

        // console.log(cityresultsObj.temp)
        // console.log(cityresultsObj.humidity)
        // console.log(cityresultsObj.windSpeed)
        // console.log(cityresultsObj.icon)
        // console.log(lat);
        // console.log(lon);

        ////////////////////ajax call to get uvindex  //////////////////////////////////////
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon + '&cnt=1',
            method: "GET"
        }).then(function (response) {

            cityresultsObj.uvIndex = response[0].value;
            $('#uvIndexDisplay').text('UV Index: '+cityresultsObj.uvIndex)
            // console.log(cityresultsObj.uvIndex);
        })

        cityArr.push([city, cityresultsObj]);
        console.log(cityArr);

        // console.log(response.main)
        // console.log(response.weather)
    });
    ///////////////assign h# elements///////////////
    // $('#cityDisplay').text(city);
    // $('#tempDisplay').text(cityresultsObj.temp);
    // $('#humidityDisplay').text(cityresultsObj.humidity);
    // $('#windSpeedDisplay').text(cityresultsObj.windSpeed);
    // $('#uvIndexDisplay').text(cityresultsObj.uvIndex)


})


