import React, { useState } from "react";

import Location from "./Location";
import Forecast from "./Forecast";

import cityList from "../assets/city-list.json";

const App = () => {
  const [units, setUnits] = useState("imperial");
  const [display, setDisplay] = useState("");

  const api_key = "3a6f70508651c854d613ffe499c8360a";
  const countryList = require("../assets/country-names");

  async function grabPlaces() {
    try {
      const search = document.getElementById("enter-a-city").value;
      const potentialPlaces = await cityList.filter(
        (city) => city.name.toLowerCase() === search.toLowerCase()
      );
      setDisplay(displayPlaces(potentialPlaces, search));
    } catch (error) {
      console.log(error);
    }    
  }

  function displayPlaces(places, search) {
    return(
      <div className="display-places">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {places.length} results for '{search}'.
              </h1>
              <h2 className="subtitle">
                Did you mean...
              </h2>
            </div>
          </div>
        </section>
        {places.map((place, key) => {
          const formattedCountry = countryList[place.country];
          return(
            <Location
              key={key}
              cityName={place.name}
              country={formattedCountry}
              stateName={place.state}
              grabForecast={grabForecast}
              lat={place.coord.lat}
              lng={place.coord.lon}
            />
          );
        })}
      </div>
    );
  }

  async function grabForecast(city, lat, lon) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&appid=${api_key}`,
        { mode: "cors" }
      );
      const forecastData = await response.json();
      setDisplay(displayForecast(city, forecastData));
    } catch (error) {
      console.log(error);
    }
  }
  
  function displayForecast(city, data) {
    console.log(data);
    const weather = data.weather[0];
    return (
      <Forecast
        city={city}
        weatherConditionCode={weather.id}
        weatherCondition={weather.main}
        weatherDescription={weather.description}
        windSpeed={data.wind.speed}
        windDirection={data.wind.deg}
      />
    )
  }

  function switchUnits() {
    units === "imperial" ? setUnits("metric") : setUnits("imperial");
  }

  return (
    <div className="app">
      <div className="search-bar">
        <input id="enter-a-city" type="text" placeholder="Enter a City" />
        <button onClick={() => grabPlaces()}>Grab Places</button>
      </div>
      <div id="display">{display}</div>
    </div>
  );
};

export default App;
