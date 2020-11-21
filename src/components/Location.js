import React from "react";

const Location = ({ cityName, stateName, country, lat, lng, grabForecast }) => {  
  function findFlag() {
    const regex = new RegExp(/\s+/, "g");
    const formattedName = country.replace(regex, "-").toLowerCase();
    return `../assets/flags/${formattedName}.svg`;
  }
  
  return (
    <div className="location" onClick={() => grabForecast(cityName, lat, lng)}>
      <div className="box">
        <article className="media location-media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={findFlag()} alt={country} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{cityName}{stateName ? `, ${stateName}` : ""}</strong>
                <br />{country}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Location;
