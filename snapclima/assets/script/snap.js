//Interação
const citySearchBar = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');

//Exibição
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentTemperature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const feelsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const api_key = "bb232fa4e7dbca936eea6aeb21ee9765";

//`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

citySearchButton.addEventListener('click', (e) => {
    let cityName = citySearchBar.value;
    getCityWeather(cityName);
});

function getCityWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json()) //then = então converte a api em json
        .then((data) => displayWeather(data))
}

function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ incon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    } = data

    currentDate.textContent = dt; // textContent != "innerHTML"
    cityName.textContent = name;

    weatherDescription.textContent = description;
    currentTemperature.textContent = temp;
    windSpeed.textContent = speed;
    feelsLikeTemperature.textContent = feels_like;
    currentHumidity.textContent = humidity;
    sunriseTime.textContent = sunrise;
    sunsetTime.textContent = sunset;
}