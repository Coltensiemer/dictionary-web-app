import { ChangeEvent, useEffect, useState } from "react";
import uuid from "react-uuid";

import PlayIcon from "../assets/images/icon-play.svg";
import SearchSvg from "../assets/images/icon-search.svg";

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
  const [isLoaded, setLoaded] = useState(false);
  const [isData, setData] = useState<WordData[]>([]);
  const [isWord, setWord] = useState("");

  // This function handles the form submission
  const submitWord: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if the word is empty and set the error state accordingly
    if (isWord === "") {
      setError(true);
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

        // Set the error state to false to render the definition component
        setError(false);
        setNotFound(false);
      } catch (error) {
        // Catch errors that occur during the API request
        console.log("error", error);
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

console.log(isData)

  return (
    <div>
      <div className="pb-10">
        <form onSubmit= {submitWord}>
          <input
            type="text"
            placeholder="Search for any Word"
            className=" relative input w-full bg-grey-light text:grey-2d outline-none border-2 border-transparent active:border-purple-primary  round-md"
            onChange={(e) => setWord(e.target.value)}
            // value={isData}
          />
          <button type="submit" className="">
            <img src={SearchSvg} className="absolute right-10 top-[100px]" />
          </button>
        </form>
        {isError == true && (
          <p className="text-red-primary">Whoops, can't be empty</p>
        )}
      </div>
      {isNotFound === true ? ( // Renders No Definitions 
        <div className="flex flex-col justify-center">
          <h2 className="self-center text-6xl h-auto">🙁</h2>
          <p className="self-center">No Definitions Found</p>
          <p className="self-center text-center">
            Sorry Pal, We couldn't find definitions for the word you were
            looking for. You can try the search again at later time or gead to
            the web instead.
          </p>
        </div>
      ) : ( /// If there is a defination 
        <ul>
          {isData.map((data) => (
            <li key={uuid()}>
              <div className="flex justify-between">
                <h2 className="text-3xl md:text-6xl capitalize font-bold">{data.word}</h2>
                <img className="w-14" src={PlayIcon} />
              </div>
              <p className="text-2x relative bottom-6 tracking-widest text-purple-primary pt-2 ">
                {data.phonetic}
              </p>

              <ul>
                {data.meanings.map((meaning) => (
                  <li key={uuid()}>
                    <h3 className="text-xl font-bold  italic ">
                      {meaning.partOfSpeech}
                    </h3>
                    <ul className="marker:text-purple-primary">
                      <h3 className="pb-4 text-grey-primary">Meaning</h3>
                      {meaning.definitions.map((definition) => (
                        <ul
                          className="list-disc  mx-6 md:mx-10 py-3"
                          key={definition.definition}
                        >
                          <li>{definition.definition}</li>
                        </ul>
                      ))}
                      <div className="flex ">
                        {meaning.synonyms.length >= 1 && (
                          <h4 className="pr-6 text-grey-primary">Synonyms</h4>
                        )}
                        {meaning.synonyms.map((sym) => (
                          <ul key={uuid()}>
                            <li className="text-purple-primary">{sym}</li>
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
