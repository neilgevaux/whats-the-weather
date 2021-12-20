//Define API key
const api = {
    key: "da09a77459d30fb4f3110ad9d7dc4ea0",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}
// Add event listener to search box to send request on pressing Enter
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

// Get results from Enter key (13)
function setQuery (evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

//Fetch request for results
function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

// Display results
function displayResults(weather) {

    // Display city results
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Get the current date and display it
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    // Get the current temperature at the selected location
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    // Get the current weather at the selected location
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    // Get the wind speed
    let windSpeed = document.querySelector('.wind-speed');
    windSpeed.innerText = `Windspeed: ${Math.round(weather.wind.speed)} mph`;

    // Get the high/low
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    
    // Get the Open Weather icons and convert them to Erik Flowers' awesome icon set :)
    let icon = weather.weather[0].icon;
    const img = document.querySelector('.weatherIcon');
    img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
}

// Build dates to display properly
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

//Change background colour based on time of day
const time = new Date().getHours();
if (time < 10) {
    document.body.style.backgroundColor='#FFECAA';
} else if (time < 20) {
    document.body.style.backgroundColor='#133253'
} else {
    document.body.style.backgroundColor='#07182b'
};

