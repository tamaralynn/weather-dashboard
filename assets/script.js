// variables for queries (weatherapp & coordinates)
const weatherQuery = "https://api.darksky.net/forecast/" + key + "/" + longitude + "," + latitude
const key = "98142a5d66a6aa980a2f045ed9382f95"

// funtion to check whether input is zip or city, state
function checkInputType() {
    let numbers = /^[0-9]+$/
    let $input = $("#location-search").val();
    if ($input.value.match(numbers)) {
        // postal_code = input, 
        //build geocode coordsquery
    }

}

// build coordinate query string based on input

// use coordinates to get weather query

// ajax calls daisy chained
function findCoords() {
    return $.ajax();
}

function findWeather(data, textStatus, jqXHR) {
    return $.ajax();
}

function main() {
    first().then(second);
}

// save coords & input data to local storage

// push local storage to search div (up to lost 10 cities) as a list item

// push todays weather to current-weather divs

// push next 5 days to 

// onclick, .val .trim input funtion, call ajax

// onclick(location already pushed), cal ajax?????