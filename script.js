var apiKey = '819c140350303d362f2ba760003b1335'

var qURL = 'api.openweathermap.org/data/2.5/weather?q='


// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//   });
function getTime() {
    // moment().add(10, 'days').calendar();
    return moment().format("MMM Do YY");
}

var currentDate = getTime();
console.log(currentDate);
console.log(currentDate.length)
