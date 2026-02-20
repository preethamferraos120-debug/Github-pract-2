const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const statusMessage = document.getElementById('statusMessage');
const weatherCard = document.getElementById('weatherCard');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const windSpeed = document.getElementById('windSpeed');

const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  95: 'Thunderstorm',
};

function setLoadingState(isLoading) {
  searchButton.disabled = isLoading;
  searchButton.textContent = isLoading ? 'Loading...' : 'Search';

  if (isLoading) {
    statusMessage.textContent = 'Fetching weather details...';
    statusMessage.classList.add('loading');
  } else {
    statusMessage.classList.remove('loading');
  }
}

function showError(message) {
  statusMessage.textContent = message;
  weatherCard.classList.add('hidden');
}

async function fetchCityCoordinates(city) {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );

  if (!geoResponse.ok) {
    throw new Error('Unable to reach geocoding service. Please try again.');
  }

  const geoData = await geoResponse.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found. Please enter a valid city name.');
  }

  return geoData.results[0];
}

async function fetchWeather(latitude, longitude) {
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`
  );

  if (!weatherResponse.ok) {
    throw new Error('Unable to fetch weather right now. Please try again later.');
  }

  const weatherData = await weatherResponse.json();
  if (!weatherData.current) {
    throw new Error('Weather data is unavailable for this city right now.');
  }

  return weatherData.current;
}

function renderWeather(city, currentWeather) {
  cityName.textContent = `${city.name}, ${city.country_code}`;
  temperature.textContent = `${currentWeather.temperature_2m}°C`;
  condition.textContent = weatherCodeMap[currentWeather.weather_code] || 'Unknown condition';
  windSpeed.textContent = `${currentWeather.wind_speed_10m} km/h`;

  weatherCard.classList.remove('hidden');
  statusMessage.textContent = 'Weather updated successfully.';
}

async function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError('Please enter a city name before searching.');
    return;
  }

  setLoadingState(true);

  try {
    const cityData = await fetchCityCoordinates(city);
    const currentWeather = await fetchWeather(cityData.latitude, cityData.longitude);
    renderWeather(cityData, currentWeather);
  } catch (error) {
    showError(error.message || 'Something went wrong. Please try again.');
  } finally {
    setLoadingState(false);
  }
}

searchButton.addEventListener('click', handleSearch);
cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
