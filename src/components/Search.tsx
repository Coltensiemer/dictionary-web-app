import { ChangeEvent, useEffect, useState } from "react";
import uuid from "react-uuid";

import PlayIcon from "../assets/images/icon-play.svg";
import SearchSvg from "../assets/images/icon-search.svg";
import SearchStorage from "./SearchStorage";

export default function Searchbar() {
  // Define the interface for WordData
  interface WordData {
    id: number;
    word: string;
    phonetic: string;
    sourceUrls: string[];
    meanings: {
      id: number;
      partOfSpeech: string;
      definitions: { id: number; definition: string }[];
      synonyms: string[];
    }[];
  }

  // Use useState hook to manage state
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const [isData, setData] = useState<WordData[]>([]);
  const [isWord, setWord] = useState("");

  const [isStorage, setStorage] = useState<string[]>([])

  function handleStorage() { 
    setStorage(prev => [isWord,...prev])
  }

  // This function handles the form submission
  const submitWord: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if the word is empty and set the error state accordingly
    if (isWord === "") {
      setError(true);
      setTimeout(() => setError(false), 300);
      setActive(false);
    } else if (isWord !== "") {
      // Check if the word is not empty and has more than 1 character
      try {
        // Make an API request to fetch the word definition
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${isWord}`
        ).then(handleError); // Handle errors in the response using the handleError function

        // Convert the response to JSON and update the data state with the fetched data
        const data = await response.json();
        setData(data);

        handleStorage()

        setActive(true);
        setTimeout(() => setActive(false), 300);

        // Set the error state to false to render the definition component
        setError(false);
        setNotFound(false);
      } catch (error) {
        // Catch errors that occur during the API request
        console.log("error", error);
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    }
  };

  // This function handles errors in the response
  function handleError(response: Response) {
    if (!response.ok) {
      // If the response is not ok, throw an error with the status text
      console.log("error");
      setNotFound(true);
      throw Error(response.statusText);
    }
    return response;
  }

  // Handles the Speech Utterance
  const handleSpeak = (e: string) => {
    // Create a new `SpeechSynthesisUtterance` object using the string argument
    const speaking = new SpeechSynthesisUtterance(e);
    // Start the speech synthesis process using the `speak` method of the `speechSynthesis` object
    speechSynthesis.speak(speaking);
  };

  // const handleRedError = isError ? null :

  console.log(isStorage);

  return (
    <div className="dark:bg-black-primary dark:text-white h-screen p-6 md:px-10 lg:px-80 overflow-y-auto">
      <div className="pb-10 ">
        <form onSubmit={submitWord} className="relative">
          <input
            type="text"
            placeholder="Search for any Word"
            className={`${isError ? "border-red-primary" : null} ${
              isActive ? "border-purple-primary" : null
            } relative input w-full bg-grey-light dark:bg-black-secondary dark:text-white text:grey-2d outline-none border-2 border-transparent round-md`}
            onChange={(e) => setWord(e.target.value)}
            // value={isData}
          />
          <button type="submit">
            <img src={SearchSvg} className="absolute z-10 right-4 top-4" />
          </button>
        </form>
        {isError == true && (
          <p className="text-red-primary">Whoops, can't be empty</p>
        )}
        <SearchStorage isStorage={isStorage}/>
      </div>
      {isNotFound === true && isWord != "" ? ( // Renders No Definitions
        <div className="flex flex-col justify-center pt-32 dark:bg-black-primary">
          <h2 className="self-center text-6xl h-auto pb-11">🙁</h2>
          <p className="self-center font-bold pb-6 lg:text-lg dark:text-white">
            No Definitions Found
          </p>
          <p className="self-center text-center text-grey-primary lg:text-lg">
            Sorry Pal, We couldn't find definitions for the word you were
            looking for. You can try the search again at later time or gead to
            the web instead.
          </p>
        </div>
      ) : (
        /// If there is a defination
        <ul className="overflow-hidden">
          {isData.map((data) => (
            <li key={uuid()}>
              <div className="flex justify-between">
                <h2 className="text-3xl md:text-6xl capitalize font-bold">
                  {data.word}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    handleSpeak(isWord);
                  }}
                >
                  <img
                    className="w-14 cursor-pointer"
                    src={PlayIcon}
                    alt="Play Speech"
                  />
                </button>
              </div>
              <p className="text-2x lg:text-2xl relative bottom-6 md:bottom-0 tracking-widest text-purple-primary pt-2 ">
                {data.phonetic}
              </p>

              <ul>
                {data.meanings.map((meaning) => (
                  <li key={uuid()}>
                    <h3 className=" md:text-lg  font-bold  italic py-6 ">
                      {meaning.partOfSpeech}
                    </h3>
                    <ul className="marker:text-purple-primary">
                      <h3 className="pb-4 text-grey-primary  md:text-lg">
                        Meaning
                      </h3>
                      {meaning.definitions.map((definition) => (
                        <ul
                          className="list-disc  mx-6 md:mx-10  md:text-lg py-3"
                          key={definition.definition}
                        >
                          <li>{definition.definition}</li>
                        </ul>
                      ))}
                      <div className=" pt-6 grid grid-cols-3 gap-4">
                        {meaning.synonyms.length >= 1 && (
                          <h4 className=" text-grey-primary ">Synonyms</h4>
                        )}
                        {meaning.synonyms.map((sym) => (
                          <ul key={uuid()}>
                            <li className="text-purple-primary font-bold">
                              {sym}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="pt-14 pb-20">
                <h5 className="underline underline-offset-4">Source</h5>
                <p className="underline underline-offset-4">
                  {data.sourceUrls}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
