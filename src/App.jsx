import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LangSelector from "./components/LangSelector/LangSelector";
import EngMeaning from "./components/EngMeaning/EngMeaning";
import fetchEngWord from "./api/fetchEngWord";
import TamMeaning from "./components/TamMeaning/TamMeaning";
import axios from "axios";

const App = () => {
  const [engMeaning, setEngMeaning] = useState([]);
  const [tamMeaning, setTamMeaning] = useState([]);
  const [tamWord, setTamWord] = useState([]);
  const [searchEngWord, setSearchEngWord] = useState("");
  const [tamBtnClicked, setTamBtnClicked] = useState(false);
  const [engBtnClicked, setEngBtnClicked] = useState(false);
  const [tamilLoading, setTamilLoading] = useState(false);

  const searchInput = async (searchText) => {
    setTamilLoading(true);

    try {
      // Fetching English Meaning and Updating variables
      const engRes = await fetchEngWord(searchText);
      setEngMeaning([...engRes.data[0].meanings[0].definitions]);
      setSearchEngWord(engRes.data[0].word);
      setEngBtnClicked(true);
      setTamBtnClicked(false);
      // Fetching Tamil Meaning and Updating variables
      const tamilRes = await axios.post(
        "https://tamil-dictionary-web-scrape.vercel.app/api/scrape",
        {
          searchText,
        }
      );
      setTamMeaning([...tamilRes.data.meaning]);
      setTamWord([...tamilRes.data.word]);
      setTamilLoading(false);
    } catch (err) {
      setTamilLoading(false);
      console.log("Something Went Wrong");
    }
  };

  const handleBtnFunction = (engClicked, tamClicked) => {
    setEngBtnClicked(engClicked);
    setTamBtnClicked(tamClicked);
  };
  return (
    <>
      <div className="main">
        <Header searchInput={searchInput} />
        {engMeaning.length != 0 && (
          <LangSelector
            tamilLoading={tamilLoading}
            handleBtnFunction={handleBtnFunction}
            engBtnClicked={engBtnClicked}
          />
        )}
        {engBtnClicked && (
          <EngMeaning
            meaning={engMeaning[0]?.definition}
            word={searchEngWord}
          />
        )}
        {tamBtnClicked && tamWord && (
          <TamMeaning words={tamWord} meanings={tamMeaning} />
        )}
      </div>
    </>
  );
};

export default App;
