const apiKey = '5419d873aae005a11c5146108f3ddaa0';

// Retrieve weather information for a given city or location
function getWeather(city, lat, lon) {
  let url = '';
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  } else {
    console.log('No location information provided.');
    return;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Update city name, temperature, and weather description
      document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
      document.getElementById('weather-description').textContent = data.weather[0].description;

      // Update feel-like temperature and condition
      document.getElementById('feel-like-temperature').textContent = `${Math.round(data.main.feels_like)}°C`;
      document.getElementById('feel-like-condition').textContent = data.main.feels_like > data.main.temp ? 'Colder than actual temperature' : 'Warmer than actual temperature';

      // Update wind speed and description
      document.getElementById('wind-speed').textContent = `${Math.round(data.wind.speed)} km/h`;
      document.getElementById('wind-description').textContent = getWindDescription(data.wind.speed);

      // Update UV index and description
      document.getElementById('uv-index').textContent = getUVIndex(data.coord.lat, data.coord.lon);
      document.getElementById('uv-description').textContent = getUVDescription(getUVIndex(data.coord.lat, data.coord.lon));

      // Update rain value and description
      document.getElementById('rain-value').textContent = `${data.rain ? data.rain['1h'] : 0}%`;
      document.getElementById('rain-description').textContent = data.rain ? 'Wet' : 'Dry';

      // Update background color based on city name
      const backgroundColor = getBackgroundColor(data.name);
      document.body.style.backgroundColor = backgroundColor;
    })
    .catch(error => console.log(error));
}

function getWindDescription(speed) {
  if (speed < 10) {
    return 'Calm';
  } else if (speed < 30) {
    return 'Moderate';
  } else {
    return 'Strong';
  }
}

// Update UV index and description
getUVIndex(data.coord.lat, data.coord.lon)
  .then(uvIndex => {
    document.getElementById('uv-index').textContent = uvIndex;
    document.getElementById('uv-description').textContent = getUVDescription(uvIndex);
  })
  .catch(error => console.log(error));

function getUVDescription(index) {
  if (index <= 2) {
    return 'Low';
  } else if (index <= 5) {
    return 'Moderate';
  } else if (index <= 7) {
    return 'High';
  } else if (index <= 10) {
    return 'Very High';
  } else {
    return 'Extreme';
  }
}

function getBackgroundColor(cityName) {
  switch (cityName.toLowerCase()) {
    case 'new york':
      return '#f6c289';
    case 'london':
      return '#8fc1e3';
    case 'paris':
      return '#e8b8d2';
    case 'tokyo':
      return '#a8d8ea';
      case 'sydney':
        return '#f5b8c8';
        default:
        return '#fff';
        }
        }
        
        // Ask for user's location and display weather information
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // weather information for user's current location
        getWeather(null, latitude, longitude);
        }, error => {
        // Display error message if location cannot be retrieved
        console.log(error);
        document.getElementById('city-name').textContent = 'Error';
        document.getElementById('weather-description').textContent = 'Cannot retrieve location information.';
        document.getElementById('temperature').textContent = '';
        document.getElementById('feel-like-temperature').textContent = '';
        document.getElementById('feel-like-condition').textContent = '';
        document.getElementById('wind-speed').textContent = '';
        document.getElementById('wind-description').textContent = '';
        document.getElementById('uv-index').textContent = '';
        document.getElementById('uv-description').textContent = '';
        document.getElementById('rain-value').textContent = '';
        document.getElementById('rain-description').textContent = '';
        });
        } else {
        // Display error message if geolocation is not supported
        console.log('Geolocation is not supported.');
        document.getElementById('city-name').textContent = 'Error';
        document.getElementById('weather-description').textContent = 'Geolocation is not supported.';
        document.getElementById('temperature').textContent = '';
        document.getElementById('feel-like-temperature').textContent = '';
        document.getElementById('feel-like-condition').textContent = '';
        document.getElementById('wind-speed').textContent = '';
        document.getElementById('wind-description').textContent = '';
        document.getElementById('uv-index').textContent = '';
        document.getElementById('uv-description').textContent = '';
        document.getElementById('rain-value').textContent = '';
        document.getElementById('rain-description').textContent = '';
        }
        
        // Listen for form submission and retrieve weather information for the specified city
        const form = document.getElementById('form');
        form.addEventListener('submit', event => {
        event.preventDefault();
        const city = document.getElementById('location').value;
        getWeather(city);
        });
