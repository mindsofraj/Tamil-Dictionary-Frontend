import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tamilMeaning, setTamilMeaning] = useState([]);
  const [words, setWords] = useState([]);
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const fetchTamilMeaning = async (e) => {
    e.preventDefault();
    setTamilMeaning([]);
    setWords([]);
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
      setLoadingProgress(currentProgress);
      currentProgress += 1;
    }, 300);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/scrape", {
        inputData,
      });
      setTamilMeaning((prev) => [...prev, ...res.data.meaning]);
      setWords((prev) => [...prev, ...res.data.word]);
      setLoadingProgress(100);
      clearInterval(interval);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      clearInterval(interval);
    }
  };

  return (
    <>
      <form onSubmit={fetchTamilMeaning}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => {
            setInputData(e.target.value);
          }}
        />
        <button type="submit">Get Meaning</button>
      </form>
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <div
              className="loader-progress"
              style={{ width: `${loadingProgress}%` }}
            >
              {loadingProgress}%
            </div>
          </div>
        </div>
      ) : (
        <table>
          <tbody>
            {words.map((word, i) => (
              <tr key={i}>
                <td>{word}</td>
                <td>{tamilMeaning[i]}</td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default App;


// CSS
.loader-container {
    padding: 20px;
    width: 200px;
  }
  
  .loader {
    width: 100%;
    background-color: #f3f3f3;
  }
  
  .loader-progress {
    height: 30px;
    line-height: 30px;
    background-color: #392ff6;
    color: white;
    text-align: center;
    transition: width 0.5s ease; /* Smooth transition for progress updates */
  }
  