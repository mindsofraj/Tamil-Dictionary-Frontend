import React from "react";
import "./TamMeaning.css";
import axios from "axios";

const TamMeaning = ({ words, meanings }) => {
  return (
    <div
      className="tamCards"
      style={{ display: meanings.length === 0 ? "none" : "flex" }}
    >
      <table>
        <thead>
          <tr>
            <th>வ. எண்</th>
            <th>சொல்</th>
            <th>பொருள்</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{word}</td>
              <td>{meanings[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TamMeaning;
