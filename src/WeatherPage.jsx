import axios from "axios";
import React, { useState } from "react";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const [suggestions, setSuggestions] = useState([]);

  const WEATHER_API_KEY = "d0d3eed219316b96b41c8fb071ed65fb";

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${WEATHER_API_KEY}`
    );

    setSuggestions(res.data);
  };

  const getWeather = async (name) => {
    const cityName = name || city;

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
    );

    setWeather(res.data);
    setCity(cityName);
    setSuggestions([]);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="শহরের নাম লিখুন..."
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          fetchSuggestions(e.target.value);
        }}
      />
      //search button
      <button onClick={() => getWeather()}>Search</button>

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => getWeather(`${s.name}, ${s.country}`)}>
              {s.name}, {s.country}
            </li>
          ))}
        </ul>
      )}

      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;

