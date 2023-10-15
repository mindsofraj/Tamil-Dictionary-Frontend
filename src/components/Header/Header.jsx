import React, { useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";

import "./Header.css";

const Header = ({ searchInput }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText) {
      searchInput(inputText);
      setInputText("");
    }
  };
  return (
    <div className="header">
      <div className="logo">
        <h1>
          Dict<span className="uniqueColor">o</span>.
        </h1>
      </div>
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Enter a word to define..."
            className="inputBox"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <img
            type="submit"
            onClick={handleSubmit}
            src={searchIcon}
            className="searchIcon noSelect"
          />
        </form>
      </div>
    </div>
  );
};

export default Header;
