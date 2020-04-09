var apiKey = '819c140350303d362f2ba760003b1335'
var cityresultsObj = new Object();
var city = '';
var state = '';
var iconUrl = '';
function getTime() {
    return moment().format('L');
}
var fiveDayForecast = null;
var currentDate = getTime();







// var iconURL = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'



if (localStorage.getItem('city') !== null) {
    city = localStorage.getItem('city');
    queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'
    currentDate = getTime();

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

        $('#forecastImage').attr({
            'src': 'https://openweathermap.org/img/wn/' + cityresultsObj.icon + '@2x.png',
            'height': 'auto',
            'width': '75%',
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

            if (cityresultsObj.uvIndex <= 2) {
                $('#uvBlock').css({
                    'background-color': 'green',
                    'border-radius': '8px'
                })
            } else if (2 < cityresultsObj.uvIndex && cityresultsObj.uvIndex <= 5.9) {
                $('#uvBlock').css({
                    'background-color': 'yellow',
                    'border-radius': '8px'
                })

            } else if (5.9 < cityresultsObj.uvIndex && cityresultsObj.uvIndex <= 7.9) {
                $('#uvBlock').css({
                    'background-color': 'orange',
                    'border-radius': '8px'
                })

            } else if (7.9 < cityresultsObj.uvIndex) {
                $('#uvBlock').css({
                    'background-color': 'red',
                    'border-radius': '8px'
                })

            }

        })

        var newDiv = $('<div>').text(city);
        newDiv.addClass('prevSearch');
        newDiv.attr('id', city);
        $('#searched').prepend(newDiv);
        localStorage.setItem('city', city)


        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&cnt=5&appid=819c140350303d362f2ba760003b1335',
            method: "GET"
        }).then(function (response) {
            localStorage.setItem('fiveDay', JSON.stringify(response));
            var fiveDayForecast = response;

        });




        fiveDayForecast = JSON.parse(localStorage.getItem('fiveDay'));

        $('#forecastFiveD').empty()
        for (let i = 0; i < 5; i++) {

            var newDiv = $('<div>')
            var dateDiv = $('<div>').text(currentDate)
            dateDiv.addClass('fiveDiv');
            var tempDiv = $('<div>').text(Math.floor((fiveDayForecast.list[i].main.temp - 273.15) * (9 / 5) + 32) + ' F');
            tempDiv.addClass('fiveDiv');
            var humidityDiv = $('<div>').text(fiveDayForecast.list[i].main.humidity + '%');
            humidityDiv.addClass('fiveDiv');
            var iconDiv = $('<img>');
            iconDiv.attr({
                'src': 'https://openweathermap.org/img/wn/' + fiveDayForecast.list[i].weather[0].icon + '@2x.png',
                'width': '40%',
                'height': 'auto'
            })
            iconDiv.addClass('img-fluid');
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
    

    queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=819c140350303d362f2ba760003b1335'
    currentDate = getTime();

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
        $('#forecastImage').attr({
            'src': 'https://openweathermap.org/img/wn/' + cityresultsObj.icon + '@2x.png',
            'height': 'auto',
            'width': '75%',
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

            if (cityresultsObj.uvIndex <= 2) {
                $('#uvBlock').css({
                    'background-color': 'green',
                    'border-radius': '8px'
                })
            } else if (2 < cityresultsObj.uvIndex && cityresultsObj.uvIndex <= 5.9) {
                $('#uvBlock').css({
                    'background-color': 'yellow',
                    'border-radius': '8px'
                })

            } else if (5.9 < cityresultsObj.uvIndex && cityresultsObj.uvIndex <= 7.9) {
                $('#uvBlock').css({
                    'background-color': 'orange',
                    'border-radius': '8px'
                })

            } else if (7.9 < cityresultsObj.uvIndex) {
                $('#uvBlock').css({
                    'background-color': 'red',
                    'border-radius': '8px'
                })

            }

        })

    });
    //////////////////// Five Day Forecast ajax/////////////////////////
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&cnt=5&appid=819c140350303d362f2ba760003b1335',
        method: "GET"
    }).then(function (response) {
        localStorage.setItem('fiveDay', JSON.stringify(response));
        fiveDayForecast = response;



        fiveDayForecast = JSON.parse(localStorage.getItem('fiveDay'));
        $('#forecastFiveD').empty()
        for (let i = 0; i < 5; i++) {

            var newDiv = $('<div>')
            var dateDiv = $('<div>').text(currentDate)
            dateDiv.addClass('fiveDiv');
            var tempDiv = $('<div>').text(Math.floor((fiveDayForecast.list[i].main.temp - 273.15) * (9 / 5) + 32) + ' F');
            tempDiv.addClass('fiveDiv');
            var humidityDiv = $('<div>').text(fiveDayForecast.list[i].main.humidity + '%');
            humidityDiv.addClass('fiveDiv');            var iconDiv = $('<img>');
            iconDiv.attr({
                'src': 'https://openweathermap.org/img/wn/' + fiveDayForecast.list[i].weather[0].icon + '@2x.png',
                'width': '40%',
                'height': 'auto'
                
            })
            iconDiv.addClass('img-fluid');


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

$('#inputCity').on('click', function () {
    $(this).val('');
})

///////////////// click event on previous search results /////////////////////
$('#searched').on('click', function (event) {
    city = event.target.id;
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

            if (cityresultsObj.uvIndex <= 2) {
                $('#uvBlock').css({
                    'background-color': 'green',
                    'border-radius': '8px'
                })
            } else if (2 < cityresultsObj.uvIndex && cityresultsObj.uvIndex <= 5.9) {
                $('#uvBlock').css({
                    'background-color': 'yellow',
                    'border-radius': '8px'
                })

            } else if (5.9 < cityresultsObj.uvIndex && cityresultsObj.uvIndex <= 7.9) {
                $('#uvBlock').css({
                    'background-color': 'orange',
                    'border-radius': '8px'
                })

            } else if (7.9 < cityresultsObj.uvIndex) {
                $('#uvBlock').css({
                    'background-color': 'red',
                    'border-radius': '8px'
                })

            }
        })

        localStorage.setItem('city', city)

        //////////////////// Five Day Forecast ajax/////////////////////////
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&cnt=5&appid=819c140350303d362f2ba760003b1335',
            method: "GET"
        }).then(function (response) {
            localStorage.setItem('fiveDay', JSON.stringify(response));
            fiveDayForecast = response;



            fiveDayForecast = JSON.parse(localStorage.getItem('fiveDay'));
            $('#forecastFiveD').empty()
            for (let i = 0; i < 5; i++) {

                var newDiv = $('<div>')
                var dateDiv = $('<div>').text(currentDate)
                dateDiv.addClass('fiveDiv');
                var tempDiv = $('<div>').text(Math.floor((fiveDayForecast.list[i].main.temp - 273.15) * (9 / 5) + 32) + ' F');
                tempDiv.addClass('fiveDiv');
                var humidityDiv = $('<div>').text(fiveDayForecast.list[i].main.humidity + '%');
                humidityDiv.addClass('fiveDiv');                var iconDiv = $('<img>');
                iconDiv.attr({
                    'src': 'https://openweathermap.org/img/wn/' + fiveDayForecast.list[i].weather[0].icon + '@2x.png',
                    'width': '40%',
                    'height': 'auto'
                })
                iconDiv.addClass('img-fluid')


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

