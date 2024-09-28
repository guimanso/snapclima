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

citySearchButton.addEventListener('click', () => {
    let cityName = citySearchBar.value;
    getCityWeather(cityName);
});

navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        getCurrentLocationWeather(lat, lon);
    },
    (err) => {
        if(err.code === 1) {
            alert('Localização negada pelo usuário. Busque manualmente pela barra de pesquisa.');
        } else{
            console.log(err);
        }
    }
);

function getCurrentLocationWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json()) //then = então converte a api em json
    .then((data) => displayWeather(data))
}

function getCityWeather(cityName) {
    weatherIcon.src = `../imgs/loading-icon.svg`
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json()) 
        .then((data) => displayWeather(data))
}

function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    } = data

    currentDate.textContent = formatDate(dt); // textContent != "innerHTML"
    cityName.textContent = name;

    weatherIcon.src = `../imgs/${icon}.svg`
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)} km`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formaTime(sunrise);
    sunsetTime.textContent = formaTime(sunset);
}

function zeroEsquerda(num){
    return num >= 10 ? num : `0${num}` ;
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000);
    let formattedDate = date.toLocaleDateString('pt-br', { month: 'long', day: 'numeric'})
    return `Hoje, ${formattedDate}`; 
}

function formaTime(epochTime) {
    let date = new Date(epochTime * 1000);
    let hours = zeroEsquerda(date.getHours());
    let minutes = zeroEsquerda(date.getMinutes());
    return `${hours}:${minutes}`
}