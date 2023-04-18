import { useEffect } from "react";



interface Props { 
isStorage: string[]; 
clearStorage: () => void;
}



export default function SearchStorage(props: Props) {

	// const clearTheStorage = () => { 
	// 	// @ts-ignore
	// 	localStorage.removeItem("isStorage")
		
	//   }


	useEffect(() => { 
		localStorage.setItem("isStorage",JSON.stringify(props.isStorage))	
	}, [props.isStorage, props.clearStorage])
	
	

	
  return (
    <div>
		{props.isStorage.length >= 1 &&<p className="text-sm mt-2 text-grey-primary">Recents:</p> } 
      <ol className="flex justify center gap-2 text-sm text-grey-primary">
        {props.isStorage.map((item, index) => (
			<div key={index} className=" flex justify-around gap-2 border-2 px-2 mt-2 border-grey-primary hover:border-2 hover:border-red-primary">
          <li  className="">{item}</li>
		  <button className="w-2 h-2 relative bg-primary-red border-red-500 border-2 left-2"></button>
		  </div>
        ))}
      </ol>
	  {props.isStorage.length >= 1 && <button onClick={props.clearStorage} className="text-sm text-grey-primary hover:text-purple-primary">Clear All Recents</button> } 
    </div>
  );
}
