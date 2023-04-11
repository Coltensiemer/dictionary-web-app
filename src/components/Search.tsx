import { ChangeEvent, useEffect, useState } from "react";
import uuid from 'react-uuid';

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

	const [isError, setError] = useState<boolean>(false)
	const [isLoaded, setLoaded] = useState(false);
	const [isData, setData] = useState<WordData[]>([]);
	const [isWord, setWord] = useState("");

  console.log(isWord);

// This function handles the form submission
const submitWord = async (event: React.ChangeEvent<HTMLInputElement>) => {
	event.preventDefault(); // Prevent the default form submission behavior
  
	// Check if the word is empty and set the error state accordingly
	if (isWord === "") { 
	  setError(true);
	} else if (isWord.length > 1 && isWord !== "") { // Check if the word is not empty and has more than 1 character
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
	  } catch (error) { // Catch errors that occur during the API request
		console.log("error", error);
	  }
	} 
  };
  
  // This function handles errors in the response
  function handleError(response: Response) { 
	if (!response.ok) { // If the response is not ok, throw an error with the status text
	  console.log("error");
	  throw Error(response.statusText);
	}
	return response;
  }
  
  return (
    <div>
      <div className="pb-10">
        <form onSubmit={submitWord}>
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
		{ isError == true && <p className="text-red-primary">Whoops, can't be empty</p> } 
      </div>
      <ul>
        {isData.map((data) => (
          <li key={uuid()}>
            <div className="flex justify-between">
              <h2 className="text-3xl md:text-6xl">{data.word}</h2>
              <img className="" src={PlayIcon} />
            </div>
            <p className="text-2x relative bottom-10 text-purple-primary pt-2 ">
              {data.phonetic}
            </p>

            <ul>
              {data.meanings.map((meaning) => (
                <li key={uuid()}>
                  <h3 className="text-xl font-bold  italic ">
                    {meaning.partOfSpeech}
                  </h3>
                  <ul>
                    <h3 className="pb-4 text-grey-primary">Meaning</h3>
                    {meaning.definitions.map((definition) => (
                      <ul
                        className="list-disc mx-6 md:mx-10 py-3"
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
              <p className="underline underline-offset-4">{data.sourceUrls}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
