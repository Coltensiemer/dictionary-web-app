import { useEffect, useState } from "react";

export default function Searchbar() {
  interface WordData {
    id: number;
    word: string;
    phonetic: string;
    meanings: {
      id: number;
      partOfSpeech: string;
      definitions: { id: number; definition: string }[];
    }[];
  }

  const [isLoaded, setLoaded] = useState(false);
  const [isData, setData] = useState<WordData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/keyboard"
      );
      const data = await response.json();
      setData(data);

      console.log(data);
    }

    loadData();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs"
      />
    <ul>
  {isData.map((data) => (
    <li key={data.id}>
      <h2>{data.word}</h2>
      <h3>{data.phonetic}</h3>
      <ul>
        {data.meanings.map((meaning) => (
          <li key={meaning.id}>
            <h3>{meaning.partOfSpeech}</h3>
            <ul>
				<h3>Meaning</h3>
              {meaning.definitions.map((definition) => (
                <ul key={definition.id}>
                  <li>{definition.definition}</li>
                </ul>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>
    </div>
  );
}
