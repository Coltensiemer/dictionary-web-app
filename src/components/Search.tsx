import { useEffect, useState } from "react";

export default function Searchbar() {
  const [isLoaded, setLoaded] = useState(false);
  const [isWord, setItems] = useState<{id: number; word: string}[]>([]);

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/world")
      .then((response) => response.json())
      .then(
        (data) => {
          setLoaded(true);
          setItems(data);
        
        },
        (error) => {
          setLoaded(true);
          console.log("there was an error");
        }
      );
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs"
      />
	  <ul>
		{isWord.map(word => ( 
			<li key={word.id}> 
			{word.word}
			</li>
		))}
	  </ul>
    </div>
  );
}
