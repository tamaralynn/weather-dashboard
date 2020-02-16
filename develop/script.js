// variables for queries (weatherapp & coordinates)
let cityHistory = [];
let cityList = null;
const weatherKey = "ac7e8d5cd0e691ecaeb866925df30a70";

$(".weather-div").hide();

// push local storage to search div (up to lost 10 cities) as a list item

// push next 5 days to

// onclick, .val .trim input funtion, call ajax
$(".btn-small").on("click", function() {
    var cityInput = encodeURI($("#location-search").val());

    $(".weather-div").show();

    console.log(cityInput);
    const weatherQuery = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput},US&appid=${weatherKey}`;
    const forecastQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},US&appid=${weatherKey}`;

    /*//append to page
    let cityItem = $("#location-search").val();
    console.log(cityItem);

    // check if there's already that city, delete & replace at top
    $('button:contains("' + cityItem + '")').remove();

    var button = $(
        "<a class='waves-effect waves-light btn-large'>" + cityItem + "</a>"
    );
    $("#citiesList").append(button);

    button.on("click", function() {
        // if city is clicked, it's searched like it is enetered in input
        $("#location-search").val(button.text());
        $("#search-btn").click();
    });*/
    //call for todays weather
    $.ajax({
        url: weatherQuery,
        method: "GET"
    }).then(function(response) {
        console.log(weatherKey);
        console.log(weatherQuery);
        console.log(response.name)

        // push todays weather to current-weather divs
        $(".today-city").html(response.name);
        $(".today-temp").html(
            `${Math.floor((response.main.temp - 273.15) * 1.8 + 32)}°F<span class="today-low"> | ${Math.floor((response.main.temp_min - 273.15) * 1.8 + 32)}°F</>`
        );
        $(".today-low").attr("color", "rgb(90, 90, 90)")
        $(".today-humidity").html(`<i class="tiny material-icons">opacity</i>Humidity: ${response.main.humidity} %`);
        $(".today-icon").attr(
            "src",
            "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
        );
        $(".today-windspeed").html(`<i class="tiny material-icons">toys</i>Windspeed: ${response.wind.speed} MPH`);
        $(".today-date").text(
            moment().month() + 1 + "/" + moment().date() + "/" + moment().year()
        );
        const lat = response.coord.lat;
        const lon = response.coord.lon;

        //call for UV index
        const uvQuery = `http://api.openweathermap.org/data/2.5/uvi?appid=${weatherKey}&lat=${lat}&lon=${lon}`;
        console.log(response.coord);
        //todays UV-Index
        $.ajax({
            url: uvQuery,
            method: "GET"
        }).then(function(response) {
            console.log(uvQuery);
            console.log(response.value);
            $(".today-uv-index").html(
                `<span class="color" id="color"><i class="material-icons tiny">brightness_low</i> UV Index:${response.value}</span>`
            );
            if (response.value >= 0 || response.value < 3) {
                $("span.color").attr("class", "green");
            } else if (response.value >= 3 || response.value < 6) {
                $("span.color").attr("class", "yellow");
            } else if (response.value >= 6 || response.value < 8) {
                $("span.color").attr("class", "orange");
            } else if (response.value >= 8 || response.value < 11) {
                $("span.color").attr("class", "red");
            } else {
                $("span.color").attr("class", "purple");
            }
        });
    });
    //call for six* day forecast
    $.ajax({
        url: forecastQuery,
        method: "GET"
    }).then(function(response) {
        console.log(forecastQuery);
        console.log(response);
        //push all temperatures in F to their divs

        temp = [".temp1", ".temp2", ".temp3", ".temp4", ".temp5", ".temp6"];
        humidity = [
            ".humidity1",
            ".humidity2",
            ".humidity3",
            ".humidity4",
            ".humidity5",
            ".humidity6"
        ];
        windSpeed = [
            ".windspeed1",
            ".windspeed2",
            ".windspeed3",
            ".windspeed4",
            ".windspeed5",
            ".windspeed6"
        ];
        icon = [".icon1", ".icon2", ".icon3", ".icon4", ".icon5", ".icon6"];
        date = [".date1", ".date2", ".date3", ".date4", ".date5", ".date6"];

        //push all info to 5 day forecast
        for (let i = 0; i < 6; i++) {
            $(temp[i]).text(
                `${Math.floor((response.list[i * 4].main.temp - 273) * 1.8 + 32)} °F`
            );
            $(humidity[i]).html(
                `<i class="tiny material-icons">opacity</i>
                ${response.list[i * 4].main.humidity} %`
            );
            $(windSpeed[i]).html(
                `<i class="tiny material-icons">toys</i> ${response.list[i * 4].wind.speed} MPH`
            );
            $(icon[i]).attr(
                "src",
                "https://openweathermap.org/img/w/" +
                response.list[i * 4].weather[0].icon +
                ".png"
            );
            $(date[i]).text(
                moment().month() +
                1 +
                "/" +
                (moment().date() + parseInt([i]) + 1) +
                "/" +
                moment().year()
            );
        }
    });
});