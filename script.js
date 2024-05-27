document.getElementById('city').addEventListener('input', function () {
    var city = this.value;
    getWeather(city);
  });
  
  async function getWeather() {
    try {
        var city = document.getElementById('city').value;
        console.log('Şəhər adı:', city);
  
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: city,
                appid: '54a57bc234ad752a4f59e59cd372201d',
                units: 'metric'
            },
        });
        const currentTemperature = response.data.list[0].main.temp;
  
        document.querySelector('.weather-temp').textContent = Math.round(currentTemperature) + 'ºC';
  
        const forecastData = response.data.list;
  
        const dailyForecast = {};
        forecastData.forEach((data) => {
            const day = new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            if (!dailyForecast[day]) {
                dailyForecast[day] = {
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    icon: data.weather[0].icon,
  
  
                };
            } else {
                dailyForecast[day].minTemp = Math.min(dailyForecast[day].minTemp, data.main.temp_min);
                dailyForecast[day].maxTemp = Math.max(dailyForecast[day].maxTemp, data.main.temp_max);
            }
        });
  
        document.querySelector('.date-dayname').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
        const date = new Date().toUTCString();
        const extractedDateTime = date.slice(5, 16);
        document.querySelector('.date-day').textContent = extractedDateTime.toLocaleString('en-US');
  
        const currentWeatherIconCode = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].icon;
        const weatherIconElement = document.querySelector('.weather-icon');
        weatherIconElement.innerHTML = getWeatherIcon(currentWeatherIconCode);
  
        document.querySelector('.location').textContent = response.data.city.name;
        document.querySelector('.weather-desc').textContent = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
        document.querySelector('.humidity .value').textContent = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].humidity + ' %';
        document.querySelector('.wind .value').textContent = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].windSpeed + ' m/s';
  
  
        const dayElements = document.querySelectorAll('.day-name');
        const tempElements = document.querySelectorAll('.day-temp');
        const iconElements = document.querySelectorAll('.day-icon');
  
        dayElements.forEach((dayElement, index) => {
            const day = Object.keys(dailyForecast)[index];
            const data = dailyForecast[day];
            dayElement.textContent = day;
            tempElements[index].textContent = `${Math.round(data.minTemp)}º / ${Math.round(data.maxTemp)}º`;
            iconElements[index].innerHTML = getWeatherIcon(data.icon);
        });
  
    } catch (error) {
        console.error('Məlumat alınarkən səhv baş verdi:', error.message);
    }
  }
  
  function getWeatherIcon(iconCode) {
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconSize = '@2x.png';
    return `<img src="${iconBaseUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    getWeather();
    setInterval(getWeather, 900000);
  });


  document.getElementById('city').addEventListener('input', function () {
    var city = this.value;
    getWeather(city);
});

async function getWeather() {
    try {
        var city = document.getElementById('city').value;
        console.log('City name:', city);

        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: city,
                appid: '54a57bc234ad752a4f59e59cd372201d',
                units: 'metric'
            },
        });
        const currentTemperature = response.data.list[0].main.temp;

        document.querySelector('.weather-temp').textContent = Math.round(currentTemperature) + 'ºC';

        const forecastData = response.data.list;

        const dailyForecast = {};
        const hourlyForecast = [];

        forecastData.forEach((data, index) => {
            const dateTime = new Date(data.dt * 1000);
            const day = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
            const hour = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

            if (index < 10) {
                hourlyForecast.push({
                    hour: hour,
                    temp: data.main.temp,
                    icon: data.weather[0].icon
                });
            }

            if (!dailyForecast[day]) {
                dailyForecast[day] = {
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    icon: data.weather[0].icon,
                };
            } else {
                dailyForecast[day].minTemp = Math.min(dailyForecast[day].minTemp, data.main.temp_min);
                dailyForecast[day].maxTemp = Math.max(dailyForecast[day].maxTemp, data.main.temp_max);
            }
        });

        document.querySelector('.date-dayname').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });

        const date = new Date().toUTCString();
        const extractedDateTime = date.slice(5, 16);
        document.querySelector('.date-day').textContent = extractedDateTime.toLocaleString('en-US');

        const currentWeatherIconCode = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].icon;
        const weatherIconElement = document.querySelector('.weather-icon');
        weatherIconElement.innerHTML = getWeatherIcon(currentWeatherIconCode);

        document.querySelector('.location').textContent = response.data.city.name;
        document.querySelector('.weather-desc').textContent = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        document.querySelector('.humidity .value').textContent = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].humidity + ' %';
        document.querySelector('.wind .value').textContent = dailyForecast[new Date().toLocaleDateString('en-US', { weekday: 'long' })].windSpeed + ' m/s';

        const dayElements = document.querySelectorAll('.day-name');
        const tempElements = document.querySelectorAll('.day-temp');
        const iconElements = document.querySelectorAll('.day-icon');

        dayElements.forEach((dayElement, index) => {
            const day = Object.keys(dailyForecast)[index];
            const data = dailyForecast[day];
            dayElement.textContent = day;
            tempElements[index].textContent = `${Math.round(data.minTemp)}º / ${Math.round(data.maxTemp)}º`;
            iconElements[index].innerHTML = getWeatherIcon(data.icon);
        });

        // Update hourly forecast
        const hourlyListElement = document.querySelector('.hourly-list');
        hourlyListElement.innerHTML = '';
        hourlyForecast.forEach(hourData => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="hour">${hourData.hour}</span>
                <div class="hourly-icon">${getWeatherIcon(hourData.icon)}</div>
                <span class="hourly-temp">${Math.round(hourData.temp)}ºC</span>
            `;
            hourlyListElement.appendChild(listItem);
        });

    } catch (error) {
        console.error('An error occurred while fetching the data:', error.message);
    }
}

function getWeatherIcon(iconCode) {
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconSize = '@2x.png';
    return `<img src="${iconBaseUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
}

document.addEventListener("DOMContentLoaded", function () {
    getWeather();
    setInterval(getWeather, 900000); // Update every 15 minutes
});

const apikey = '5d1e4716ebf1b72d274eae7721d72481';

document.getElementById('currentLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;

            fetch(url).then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                return res.json();
            }).then((data) => {
                console.log(data);
                weatherReport(data);
            }).catch((error) => {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data. Please try again.');
            });
        }, (error) => {
            console.error('Geolocation error:', error);
            alert('Failed to retrieve your location. Please try again.');
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function weatherReport(data) {
    const currentTemperature = data.main.temp;
    document.querySelector('.weather-temp').textContent = Math.round(currentTemperature) + 'ºC';

    document.querySelector('.date-dayname').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const date = new Date().toUTCString();
    const extractedDateTime = date.slice(5, 16);
    document.querySelector('.date-day').textContent = extractedDateTime.toLocaleString('en-US');

    const weatherIconElement = document.querySelector('.weather-icon');
    weatherIconElement.innerHTML = getWeatherIcon(data.weather[0].icon);

    document.querySelector('.location').textContent = data.name;
    document.querySelector('.weather-desc').textContent = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    document.querySelector('.humidity .value').textContent = data.main.humidity + ' %';
    document.querySelector('.wind .value').textContent = data.wind.speed + ' m/s';
}

function getWeatherIcon(iconCode) {
    const iconBaseUrl = 'https://openweathermap.org/img/wn/';
    const iconSize = '@2x.png';
    return `<img src="${iconBaseUrl}${iconCode}${iconSize}" alt="Weather Icon">`;
}
