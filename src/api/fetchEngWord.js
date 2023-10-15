import axios from "axios";

const fetchEngWord = async (word) => {
  const meaning = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  return meaning;
};
export default fetchEngWord;
