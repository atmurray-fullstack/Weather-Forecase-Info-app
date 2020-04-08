var apiKey = '819c140350303d362f2ba760003b1335'
var cityresultsObj = new Object();
var cityArr = [];
var city = '';
var state = '';
var iconUrl = ''
function getTime() {
    return moment().format('L');
}
var fiveDayForecast = null;
var currentDate = getTime();







// var iconURL = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'
console.log(currentDate);
console.log(localStorage.getItem('city'))


if (localStorage.getItem('city') !== null) {
    city = localStorage.getItem('city');
    console.log(city);
    queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'
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

        $('#forecastImage').attr({
            'src': 'https://openweathermap.org/img/wn/' + cityresultsObj.icon + '@2x.png',
            'height': '100%',
            'width': 'auto',
            'margin-left': 'auto',
            'margin-right': 'auto',

        })

        $('#cityDisplay').text(city + '   ' + currentDate);
        $('#tempDisplay').text('Temperature: ' + cityresultsObj.temp + ' F');
        $('#humidityDisplay').text('Humidity: ' + cityresultsObj.humidity + ' %');
        $('#windSpeedDisplay').text('Wind Speed: ' + cityresultsObj.windSpeed + ' mph');


        ////////////////////ajax call to get uvindex  //////////////////////////////////////
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/uvi/forecast?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon + '&cnt=1',
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

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&cnt=5&appid=819c140350303d362f2ba760003b1335',
            method: "GET"
        }).then(function (response) {
            localStorage.setItem('fiveDay', JSON.stringify(response));
            var fiveDayForecast = response;
            console.log(fiveDayForecast);
            console.log(fiveDayForecast.list.length)
        });




        fiveDayForecast = JSON.parse(localStorage.getItem('fiveDay'));
        console.log(fiveDayForecast);
        $('#forecastFiveD').empty()
        for (let i = 0; i < 5; i++) {

            var newDiv = $('<div>')
            var dateDiv = $('<div>').text(currentDate);
            var tempDiv = $('<div>').text(fiveDayForecast.list[i].main.temp)
            var humidityDiv = $('<div>').text(fiveDayForecast.list[i].main.humidity)
            var iconDiv = $('<img>');
            iconDiv.attr({
                'src': 'https://openweathermap.org/img/wn/' + fiveDayForecast.list[i].weather[0].icon + '@2x.png',
                'height': '45%',
                'width': 'auto'
            })

            newDiv.addClass('col-2 mx-auto mt-1 text-left forecastBlock');
            newDiv.append(dateDiv)
            newDiv.append(iconDiv)
            newDiv.append(tempDiv)
            newDiv.append(humidityDiv)
            $('#forecastFiveD').append(newDiv);

        }





    })
}
///////search button on click event////////////////
$('#searchButton').on('click', function (event) {
    $('#forecastFiveD').empty()
    event.preventDefault();
    city = $('#inputCity').val().toUpperCase();
    console.log(city);
    queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'
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
        $('#forecastImage').attr({
            'src': 'https://openweathermap.org/img/wn/' + cityresultsObj.icon + '@2x.png',
            'height': '100%',
            'width': 'auto',
            'margin-left': 'auto',
            'margin-right': 'auto',

        })

        $('#cityDisplay').text(city + '   ' + currentDate);
        $('#tempDisplay').text('Temperature: ' + cityresultsObj.temp + ' F');
        $('#humidityDisplay').text('Humidity: ' + cityresultsObj.humidity + ' %');
        $('#windSpeedDisplay').text('Wind Speed: ' + cityresultsObj.windSpeed + ' mph');


        ////////////////////ajax call to get uvindex  //////////////////////////////////////

        cityArr.push([city, cityresultsObj]);
        // console.log(cityArr);

    });
    //////////////////// Five Day Forecast ajax/////////////////////////
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&cnt=5&appid=819c140350303d362f2ba760003b1335',
        method: "GET"
    }).then(function (response) {
        localStorage.setItem('fiveDay', JSON.stringify(response));
        fiveDayForecast = response;
        console.log(fiveDayForecast.list);



        fiveDayForecast = JSON.parse(localStorage.getItem('fiveDay'));
        console.log(fiveDayForecast);
        $('#forecastFiveD').empty()
        for (let i = 0; i < 5; i++) {

            var newDiv = $('<div>')
            var dateDiv = $('<div>').text(currentDate);
            var tempDiv = $('<div>').text(fiveDayForecast.list[i].main.temp)
            var humidityDiv = $('<div>').text(fiveDayForecast.list[i].main.humidity)
            var iconDiv = $('<img>');
            iconDiv.attr({
                'src': 'https://openweathermap.org/img/wn/' + fiveDayForecast.list[i].weather[0].icon + '@2x.png',
                'height': '45%',
                'width': 'auto'
            })


            newDiv.addClass('col-2 mx-auto mt-3 text-left forecastBlock');
            newDiv.append(dateDiv)
            newDiv.append(iconDiv)
            newDiv.append(tempDiv)
            newDiv.append(humidityDiv)
            $('#forecastFiveD').append(newDiv);

        }

    });


    ///////  APPEND NEW ELEMENTS INSIDE CLICK EVENT//////////
    var newDiv = $('<div>').text(city);
    newDiv.addClass('prevSearch');
    newDiv.attr('id', city);
    $('#searched').prepend(newDiv);
    localStorage.setItem('city', city);








})

///////////////// click event on previous search results /////////////////////
$('#searched').on('click', function (event) {
    city = event.target.id;
    // console.log(city);
    currentDate = getTime();
    queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'

    /////////////////  ajax call to get current forecast information set to cityresultsObj////////////////////
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

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
            url: 'https://api.openweathermap.org/data/2.5/uvi/forecast?appid=' + apiKey + '&lat=' + lat + '&lon=' + lon + '&cnt=1',
            method: "GET"
        }).then(function (response) {
            cityresultsObj.uvIndex = response[0].value;
            $('#uvIndexDisplay').text('UV Index: ' + cityresultsObj.uvIndex)
        })

        localStorage.setItem('city', city)

        //////////////////// Five Day Forecast ajax/////////////////////////
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&cnt=5&appid=819c140350303d362f2ba760003b1335',
            method: "GET"
        }).then(function (response) {
            localStorage.setItem('fiveDay', JSON.stringify(response));
            fiveDayForecast = response;
            console.log(fiveDayForecast.list);



            fiveDayForecast = JSON.parse(localStorage.getItem('fiveDay'));
            console.log(fiveDayForecast);
            $('#forecastFiveD').empty()
            for (let i = 0; i < 5; i++) {

                var newDiv = $('<div>')
                var dateDiv = $('<div>').text(currentDate);
                var tempDiv = $('<div>').text(fiveDayForecast.list[i].main.temp)
                var humidityDiv = $('<div>').text(fiveDayForecast.list[i].main.humidity)
                var iconDiv = $('<img>');
                iconDiv.attr({
                    'src': 'https://openweathermap.org/img/wn/' + fiveDayForecast.list[i].weather[0].icon + '@2x.png',
                    'height': '45%',
                    'width': 'auto'
                })


                newDiv.addClass('col-2 mx-auto mt-3 text-left forecastBlock');
                newDiv.append(dateDiv)
                newDiv.append(iconDiv)
                newDiv.append(tempDiv)
                newDiv.append(humidityDiv)
                $('#forecastFiveD').append(newDiv);

            }

        });







    })

});

