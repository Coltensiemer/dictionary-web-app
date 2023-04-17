import React from "react";


interface Props { 
isStorage: string[]
}


export default function SearchStorage(props: Props) {

	

//   const list = ["one", "two", "three", "four"];

  return (
    <div>
		<p className="text-sm">recents:</p>
      <ol className="flex justify center gap-2 text-sm ">
        {props.isStorage.map((item, index) => (
			<div className=" flex justify-around gap-2 border-2 px-2 mt-2 border-grey-primary hover:border-2 hover:border-red-primary">
          <li key={index} className="">{item}</li>
		  <button className="w-2 h-2 relative bg-primary-red border-red-500 border-2 left-2"></button>
		  </div>
        ))}
      </ol>
    </div>
  );
}
