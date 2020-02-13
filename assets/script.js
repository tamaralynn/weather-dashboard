// variables for queries (weatherapp & coordinates)
let cityHistory = {};
const weatherKey = "ac7e8d5cd0e691ecaeb866925df30a70";


// push local storage to search div (up to lost 10 cities) as a list item

let cityList = null;

// push next 5 days to 

// onclick, .val .trim input funtion, call ajax
$(".btn-small").on("click", function() {
    var cityInput = encodeURI($("#location-search").val())

    //.replace(/\s/g, '');
    console.log(cityInput);

    const weatherQuery = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput},US&appid=${weatherKey}`;
    const forecastQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},US&appid=${weatherKey}`;

    //append to page
    let cityItem = $("#location-search").val();
    console.log(cityItem);

    // check if there's already that city, delete & replace at top
    $('button:contains("' + cityItem + '")').remove()

    var button = $("<a class='waves-effect waves-light btn-large'>" + cityItem + "</a>");
    $("#citiesList").append(button)

    button.click(function() {
        // if city is clicked, it's searched like it is enetered in input
        $("#location-search").val(button.text());
        $("#search-btn").click()

    });
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

        console.log(response.coord);

        /*                 $.ajax({
                            url: uvQuery,
                            method: "GET"
                        }).then(function(response) {
                            console.log(uvQuery);
                            console.log(response);
                        }) */

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

        //push all info to 5 day forecast
        for (let i = 0; i < 5; i++) {
            $(temp[i]).text("Temp: " + Math.floor(((response.list[i * 4].main.temp - 273) * 1.80 + 32)) + "°F");
            $(humidity[i]).text("Humidity: " + response.list[i * 4].main.humidity + "%");
            $(windSpeed[i]).text("Windspeed: " + response.list[i * 4].wind.speed + "MPH");
            $(icon[i]).attr("src", "https://openweathermap.org/img/w/" + response.list[i * 4].weather[0].icon + ".png");
            $(date[i]).text(((moment().month()) + 1) + "/" + ((moment().date()) + parseInt([i]) + 1) + "/" + (moment().year()));
        }
    });

    //call for UV index
    const uvQuery = "ftyihjhyguyiujhgui"
});