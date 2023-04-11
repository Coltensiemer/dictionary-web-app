import { ChangeEvent, useEffect, useState } from "react";

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
	const [isLoaded, setLoaded] = useState(false);
	const [isData, setData] = useState<WordData[]>([]);
	const [isWord, setWord] = useState("");

  console.log(isWord);

// Define the function that will be called when the user submits the form
  const submitWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (isWord.length > 1 && isWord !== "") { // Check if the word is not empty and has more than 1 character
      async function loadData() { // Define an asynchronous function to fetch the data
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${isWord}`
        );
        const data = await response.json(); // Convert the response to JSON
        setData(data); // Update the isData state with the fetched data
      }
      loadData(); // Call the asynchronous function to fetch the data
    }
  };


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
      </div>
      <ul>
        {isData.map((data) => (
          <li key={data.id}>
            <div className="flex justify-between">
              <h2 className="text-3xl md:text-6xl">{data.word}</h2>
              <img className="" src={PlayIcon} />
            </div>
            <p className="text-2x relative bottom-10 text-purple-primary pt-2 ">
              {data.phonetic}
            </p>

            <ul>
              {data.meanings.map((meaning) => (
                <li key={meaning.id}>
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
                        <ul key={sym}>
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
