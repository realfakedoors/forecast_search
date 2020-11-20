import React from "react";

const Forecast = ({
  city,
  weatherConditionCode,
  weatherCondition,
  weatherDescription,
  windSpeed,
  windDirection
}) => {
  function setIcon(conditionCode) {
    switch (true) {
      case [200, 201, 210, 211, 230, 231, 232].includes(conditionCode):
        return "thunder";
      case [202, 212, 221].includes(conditionCode):
        return "heavythunder";
      case [300, 301, 310, 311, 500].includes(conditionCode):
        return "lightrain";
      case [302, 312, 313, 314, 321, 501, 520, 521].includes(conditionCode):
        return "rainy";
      case [502, 503, 504, 522, 531].includes(conditionCode):
        return "heavyrain";
      case [511, 611, 612, 613].includes(conditionCode):
        return "snowflake";
      case [600, 601, 615, 616, 620, 621].includes(conditionCode):
        return "snowy";
      case [602, 622].includes(conditionCode):
        return "blizzard";
      case [701, 711, 721, 741, 751, 761, 762].includes(conditionCode):
        return "fog-haze";
      case [731, 781].includes(conditionCode):
        return "tornado";
      case [801, 802].includes(conditionCode):
        return "cloudy";
      case [803, 804].includes(conditionCode):
        return "overcast";
      case conditionCode === 771:
        return "windy";
      case conditionCode === 800:
        return "sunny";
      default:
        return "sitelogo";
    }
  }
  
  function displayWind(speed, direction){
    let arrow;
    let displayDirection;
    
    switch (true) {
      case (339 <= direction && direction <= 359) || (0 <= direction && direction <= 23):
        arrow = '↑';
        displayDirection = 'N';
        break;
      case 24 <= direction && direction <= 69:
        arrow = '↗';
        displayDirection = 'NE';
        break;
      case 70 <= direction && direction <= 114:
        arrow = '→';
        displayDirection = 'E';
        break;
      case 115 <= direction && direction <= 159:
        arrow = '↘';
        displayDirection = 'SE';
        break;
      case 160 <= direction && direction <= 204:
        arrow = '↓';
        displayDirection = 'S';
        break;
      case 205 <= direction && direction <= 247:
        arrow = '↙';
        displayDirection = 'SW';
        break;
      case 248 <= direction && direction <= 293:
        arrow = '←';
        displayDirection = 'W';
        break;
      case 294 <= direction && direction <= 338:
        arrow = '↖';
        displayDirection = 'NW';
        break;
      default:
        arrow = '';
   }
    return `Wind: ${speed} ${displayDirection} ${arrow}`;
  }

  return (
    <div className="forecast">
      <div className="box">
        <p className="title is-4">
          {city.cityName}{city.stateName ? `, ${city.stateName}` : ""}<br />{city.country}
        </p>
        <img
          src={`./assets/icons/${setIcon(weatherConditionCode)}.svg`}
          alt={weatherCondition}
          className="forecast-icon"
        />
        <p className="subtitle is-5">
          {weatherDescription}
        </p>
        <p className="subtitle is-6">
          {displayWind(windSpeed, windDirection)}
        </p>
      </div>
    </div>
  );
};

export default Forecast;
