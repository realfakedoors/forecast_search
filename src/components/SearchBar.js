import React from "react";

const SearchBar = ({ grabPlaces, toggleUnits, units }) => {  
  return (
    <form className="search-bar" onSubmit={() => grabPlaces()}>
      <input id="enter-a-city" type="text" placeholder="Enter a City..." />
      <button className="search-submit">Get the Weather</button>
      <span className="switch-units" onClick={() => toggleUnits()}>
        <img
          src={`./assets/icons/${units}.svg`}
          alt={"Switch Units?"}
          className={"units-icon"}
        />
      </span>
    </form>
  );
};

export default SearchBar;
