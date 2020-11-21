import React from "react";

const SearchBar = ({ grabPlaces, toggleUnits, units }) => {  
  return (
    <div className="search-bar">
      <input id="enter-a-city" type="text" placeholder="Enter a City..." />
      <button onClick={() => grabPlaces()}>Get the Weather</button>
      <span className="switch-units" onClick={() => toggleUnits()}>
        <img
          src={`./assets/icons/${units}.svg`}
          alt={"Switch Units?"}
          className={"units-icon"}
        />
      </span>
    </div>
  );
};

export default SearchBar;
