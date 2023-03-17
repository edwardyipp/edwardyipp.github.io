const apiKey = '5419d873aae005a11c5146108f3ddaa0';

function getWeather() {
  const location = document.getElementById('location').value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
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
      getUVIndex(data.coord.lat, data.coord.lon).then(index => {
        document.getElementById('uv-index').textContent = index;
        document.getElementById('uv-description').textContent = getUVDescription(index);
      });

      // Update rain value and description
      document.getElementById('rain-value').textContent = `${data.rain ? data.rain['1h'] : 0}%`;
      document.getElementById('rain-description').textContent = data.rain ? 'Wet' : 'Dry';

      // Update background color based on city name
      const backgroundColor = getBackgroundColor(data.name);
      document.body.classList.remove('new-york', 'london', 'paris', 'tokyo', 'sydney');
      document.body.classList.add(backgroundColor);
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

function getUVIndex(lat, lon) {
  return fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => data.value)
    .catch(error => console.log(error));
}

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
      return 'new-york';
    case 'london':
      return 'london';
    case 'paris':
      return 'paris';
    case 'tokyo':
      return 'tokyo';
    case 'sydney':
      return 'sydney';
    default:
      return '';
  }
}