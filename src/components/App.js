import React, { useState } from "react";

import Location from "./Location";
import Forecast from "./Forecast";

import cityList from "../assets/city-list.json";

const App = () => {
  const [units, setUnits] = useState("imperial");
  const [display, setDisplay] = useState(displaySearchBar());
  const [errorMsg, setErrorMsg] = useState("");

  const api_key = "3a6f70508651c854d613ffe499c8360a";
  const countryList = require("../assets/country-names");

  function displayError(error) {
    console.log(error);
    setErrorMsg(
      <section className="hero error-window">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {JSON.stringify(error).replace(/"/g, "")}
            </h1>
          </div>
        </div>
      </section>
    );
  }

  async function grabPlaces() {
    try {
      const search = document.getElementById("enter-a-city").value;
      const potentialPlaces = await cityList.filter(
        (city) => city.name.toLowerCase() === search.toLowerCase()
      );
      setDisplay(displayPlaces(potentialPlaces, search));
    } catch (error) {
      displayError(error);
    }
  }

  function displaySearchBar() {
    return (
      <div className="search-bar">
        <input id="enter-a-city" type="text" placeholder="Enter a City" />
        <button onClick={() => grabPlaces()}>Get the Weather</button>
        <span onClick={() => switchUnits()}>
          <img
            src={`./assets/icons/${units}.svg`}
            alt={"Switch Units?"}
            className={"units-icon"}
          />
        </span>
      </div>
    );
  }

  function displayPlaces(places, search) {
    if (places.length === 0) {
      displayError("No Results Found.");
    } else if (places.length === 1) {
      const place = places[0];
      grabForecast(place.name, place.coord.lat, place.coord.lon);
    } else {
      return (
        <div className="display-places">
          <section className="hero">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  {places.length} results for '{search}'.
                </h1>
                <h2 className="subtitle">Did you mean...</h2>
              </div>
            </div>
          </section>
          {places.map((place, key) => {
            const formattedCountry = countryList[place.country];
            return (
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
  }

  async function grabForecast(cityName, lat, lon) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&appid=${api_key}`,
        { mode: "cors" }
      );
      const forecastData = await response.json();
      setDisplay(displayForecast(cityName, forecastData));
    } catch (error) {
      displayError(error);
    }
  }

  function displayForecast(cityName, data) {
    const weather = data.weather[0];
    return (
      <Forecast
        cityName={cityName}
        weatherConditionCode={weather.id}
        weatherCondition={weather.main}
        weatherDescription={weather.description}
        temperature={data.main.temp}
        humidity={data.main.humidity}
        cloudiness={data.clouds.all}
        windSpeed={data.wind.speed}
        windDirection={data.wind.deg}
        units={units}
      />
    );
  }

  function switchUnits() {
    units === "imperial" ? setUnits("metric") : setUnits("imperial");
  }

  return (
    <div className="app">
      <nav
        className="navbar site-nav"
        role="navigation"
        aria-label="site navigation"
      >
        <a className="navbar-brand" href={process.env.PUBLIC_URL}>
          <img
            className="navbar-item"
            src={`./assets/icons/sitelogo.svg`}
            alt="Forecast Search"
          />
        </a>
        <h5 className="navbar-item company-name">Forecast Search</h5>
      </nav>
      <div id="errors">{errorMsg}</div>
      <div id="display">{display}</div>
    </div>
  );
};

export default App;
