// variables for queries (weatherapp & coordinates)
let today = {};
const weatherKey = "886705b4c1182eb1c69f28eb8c520e20";


// push local storage to search div (up to lost 10 cities) as a list item



// push next 5 days to 

// onclick, .val .trim input funtion, call ajax
$(".btn-small").on("click", function() {
    var cityInput = $("#location-search").val().trim();
    console.log(cityInput);

    const weatherQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + weatherKey;
    const forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + weatherKey;
    //call for todays weather
    $.ajax({
        url: weatherQuery,
        method: "GET"
    }).then(function(response) {
        console.log(weatherKey);
        console.log(weatherQuery);
        // push todays weather to current-weather divs
        $(".city").text(response.name);
        $(".temp").text("Temp: " + Math.floor(((response.main.temp - 273.15) * 1.80 + 32)) + "°F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".icon").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $(".wind-speed").text("Windspeed: " + response.wind.speed + "MPH");
        $(".date").text(((moment().month()) + 1) + "/" + (moment().date()) + "/" + (moment().year()))
    });
    //call for five day forecast
    $.ajax({
        url: forecastQuery,
        method: "GET"
    }).then(function(response) {
        console.log(forecastQuery);
        console.log(response);
        //push all temperatures in F to their divs

        temp = [".temp1", ".temp2", ".temp3", ".temp4", ".temp5"]
        humidity = [".humidity1", ".humidity2", ".humidity3", ".humidity4", ".humidity5", ]
        windSpeed = [".wind-speed1", ".wind-speed2", ".wind-speed3", ".wind-speed4", ".wind-speed5"]
        icon = [".icon1", ".icon2", ".icon3", ".icon4", ".icon5"]
        date = [".date1", ".date2", ".date3", ".date4", ".date5"]


        for (let i = 0; i < 5; i++) {
            $(temp[i]).text("Temp: " + Math.floor(((response.list[i * 4].main.temp - 273) * 1.80 + 32)) + "°F");
            $(humidity[i]).text("Humidity: " + response.list[i * 4].main.humidity + "%");
            $(windSpeed[i]).text("Windspeed: " + response.list[i * 4].wind.speed + "MPH");
            $(icon[i]).attr("src", "https://openweathermap.org/img/w/" + response.list[i * 4].weather[0].icon + ".png");
            $(date[i]).text(((moment().month()) + 1) + "/" + ((moment().date()) + [i + 1]) + "/" + (moment().year()));
        }

        /*
                       //use moment js to make the dates & push them to their divs
                       $(".date1").text(((moment().month()) + 1) + "/" + ((moment().date()) + 1) + "/" + (moment().year()));
                       $(".date2").text(((moment().month()) + 1) + "/" + ((moment().date()) + 2) + "/" + (moment().year()));
                       $(".date3").text(((moment().month()) + 1) + "/" + ((moment().date()) + 3) + "/" + (moment().year()));
                       $(".date4").text(((moment().month()) + 1) + "/" + ((moment().date()) + 4) + "/" + (moment().year()));
                       $(".date5").text(((moment().month()) + 1) + "/" + ((moment().date()) + 5) + "/" + (moment().year())); */

    })
})

//for every search, save search input to an array
function renderButtons() {
    let cities = [];
    let $a = $(".cities-list");
    //clear the search area
    $a.empty();

    for (var i = 0; i < cities;)
    //give attributes
        $a.addClass("cities");
    $a.attr("data-name", cities[i]);
    $a.text(cities[i]);
    //push to div
    $(".cities-list").append($a);
}
renderButtons();


// onclick(location already pushed), cal ajax?????