import "./LangSelector.css";
import doubleArrow from "../../assets/Double Arrow.svg";
import { useState } from "react";

import { ColorRing } from "react-loader-spinner";

const LangSelector = ({ tamilLoading, handleBtnFunction, engBtnClicked }) => {
  const [rotate, setRotate] = useState(false);
  const [btnDisable, setBtnDisable] = useState({
    en: true,
    ta: false,
  });

  const disableStyle = {
    backgroundColor: "#d9d9d9",
    color: "#898989",
    boxShadow: "0 4px 4px #bfbfbf",
  };
  const enableStyle = {
    backgroundColor: "#f16821",
    color: "#fff",
    fontWeight: "600",
    boxShadow: "0 4px 4px #fab95b",
  };

  const handleClick = (text) => {
    if (text == "EN") {
      setBtnDisable({ en: true, ta: false });
      setRotate(false);
      handleBtnFunction(true, false);
    } else {
      setBtnDisable({ en: false, ta: true });
      setRotate(true);
      handleBtnFunction(false, true);
    }
  };

  return (
    <>
      <div className="langBox noSelect">
        <button
          onClick={() => handleClick("EN")}
          style={btnDisable.en || engBtnClicked ? enableStyle : disableStyle}
          className="engBtn btn"
        >
          EN
        </button>
        <img
          src={doubleArrow}
          style={rotate ? { rotate: "180deg" } : { rotate: "0deg" }}
          className="doubleArrow"
        />
        <button
          disabled={tamilLoading}
          onClick={() => handleClick("த")}
          style={btnDisable.ta ? enableStyle : disableStyle}
          className="tamBtn btn"
        >
          {tamilLoading ? (
            <ColorRing
              visible={true}
              height="25"
              width="25"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#1a3263", "#1a3263", "#1a3263", "#1a3263", "#1a3263"]}
            />
          ) : (
            "த"
          )}
        </button>
      </div>
    </>
  );
};

export default LangSelector;
