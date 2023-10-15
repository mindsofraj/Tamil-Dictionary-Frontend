import React from "react";
import "./EngMeaning.css";

const EngMeaning = ({ meaning, word }) => {
  return (
    <>
      {word && (
        <div className="engCard">
          <h1 className="word">{word}</h1>
          <div className="card">
            <p className="meaning">{meaning}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EngMeaning;
