import axios from "axios";
import React, { useState } from "react";

const WeatherPage = () => {
  // 🟢 ইউজার যে শহরের নাম ইনপুট করবে
  const [city, setCity] = useState("");

  // 🟢 Weather ডেটা এখানে রাখা হবে
  const [weather, setWeather] = useState(null);

  // 🟢 শহরের সাজেশন লিস্ট
  const [suggestions, setSuggestions] = useState([]);

  const WEATHER_API_KEY = "d0d3eed219316b96b41c8fb071ed65fb";

  // 🟢 শহরের নাম লিখলে মিল আছে এমন শহরের সাজেশন দেখানো
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      // দুই অক্ষরের কম হলে সাজেশন দেখাবে না
      setSuggestions([]);
      return;
    }

    // এই API শহরের নাম অনুযায়ী সাজেশন ফেরত দেয়
    const res = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${WEATHER_API_KEY}`
    );

    setSuggestions(res.data); // সাজেশন লিস্ট সেট করা
  };

  // 🟢 শহর সিলেক্ট করলে বা সার্চ চাপলে Weather ডেটা আনা
  const getWeather = async (name) => {
    const cityName = name || city; // সাজেশন ক্লিক করলে সেই নাম ব্যবহার করবে

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
    );

    setWeather(res.data); // Weather ডেটা সেট
    setCity(cityName); // ইনপুট বক্সে সিলেক্টেড শহরের নাম দেখানো
    setSuggestions([]); // সাজেশন বন্ধ করা
  };

  return (
    <div>
      <h1>Weather App</h1>

      {/* 🟢 ইনপুট: ইউজার শহরের নাম টাইপ করবে */}
      <input
        type="text"
        placeholder="শহরের নাম লিখুন..."
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          fetchSuggestions(e.target.value); // সাথে সাথে সাজেশন দেখাবে
        }}
      />

      {/* 🟢 সার্চ বাটন */}
      <button onClick={() => getWeather()}>Search</button>

      {/* 🟢 সাজেশন লিস্ট */}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => getWeather(`${s.name}, ${s.country}`)}>
              {s.name}, {s.country}
            </li>
          ))}
        </ul>
      )}

      {/* 🟢 Weather ডেটা থাকলে দেখানো হবে */}
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
