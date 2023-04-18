# Frontend Mentor - Dictionary web app solution

This is a solution to the [Dictionary web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents


  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
   - [Built with](#built-with)
- [My process](#my-process)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)





### The challenge

Users should be able to:

- Search for words using the input field
- See the Free Dictionary API's response for the searched word
- See a form validation message when trying to submit a blank form
- Play the audio file for a word when it's available
- Switch between serif, sans serif, and monospace fonts
- Switch between light and dark themes
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


### Screenshot

![](./gifs/dictonary-intro%20gif%20.gif)


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)


### Built with

- Vite
- Typescript
- React 
- TailWindCSS 
- DaisyUI 



## My process

My goal was to develop a project using Typescript and React, which would be my first experience with Typescript. However, I faced a challenge as there were no video tutorials available for this project, only written documents, MDN web docs, and blogs. To gain a deeper understanding of both Typescript and React, I decided to dive deeper into their documentation. I believe that it is essential for developers to have a comprehensive understanding of the languages and libraries they use.

To start the project, I used Create-React-App with vite and installed TailwindCSS and DaisyUI. After verifying that the app runs correctly in development, I created a repository and pushed the new project to GitHub.

Next, I downloaded the front-end mentor files and added them to the project folder before pushing them to GitHub. When coding, I began by creating components and organizing the folder structure, dividing the components into Navbar and Search. I imported the Svgs, used flexbox to get a general outline, and then started working on the search function for the dictionary API.


Rendering the Search component became tricky when I had to use Typescript to reference the data that was going to be stored in state. Here is my Typescript interface that allowed me to type safe.


```Typescript 
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

  ///

  const [isData, setData] = useState<WordData[]>([]);
```

After that, I rendered the data using the Map method. However, it was not all so easy going. I had to troubleshoot to make sure I was fetching the correct parts of the JSON file and inputting it into the render properly.

Afterwards, I focused on the phonetic speech. This was very new to me, so using MDN was useful. Here is a section of code I am proud of writing after my research.

``` Typescript

  // Handles the Speech Utterance
  const handleSpeak = (e: string) => {
    // Create a new `SpeechSynthesisUtterance` object using the string argument
    const speaking = new SpeechSynthesisUtterance(e);
    // Start the speech synthesis process using the `speak` method of the `speechSynthesis` object
    speechSynthesis.speak(speaking);
  };


```


As I went through mapping the API fetches, I also used TailwindCSS to make sure everything was responsive and ready for Dark Mode (soon to come).

Once the search area was completed, I focused back on the Navbar where I created the dark mode. Passing the data props from Parent to child and having an event handler for the navbar search was not too difficult to accomplish. Being my first time with Typescript, having to make my props typesafe was a learning lesson.

``` TypeScript 
interface Props { 
  handleFontFamily: (select: string) => void
  isFontFamily: string; 
  darkModeTheme: boolean;  
  toggleDarkMode: (prev: boolean) => void 
}
```

After the dark mode, I had to be able to change the document fonts with one click. Simply using this code and passing it down as props for an onClick handler in the navbar, I was able to accomplish. 

```typescript
  function handleFontFamily(select: string) {
    setFontFamily(select);
    document.body.style.fontFamily = select;
  }
``` 


To enhance the user experience and my skills, I added a recent search section using localStorage. After reviewing relevant documents, I managed to search for data and store it in an array of state, which I then set inside the local storage. Additionally, I was able to create a function that clears the storage and resets the state. One line of code that I am particularly proud of is the following, which uses the useEffect hook to update the localStorage whenever the props.isStorage or props.clearStorage change:

``` Typescript 
useEffect(() => { 
		localStorage.setItem("isStorage",JSON.stringify(props.isStorage))	
	}, [props.isStorage, props.clearStorage])
	
	

```



### What I learned

As noted above, here is the summary of my biggest learning take ways. 

- API Fetchs/ Error Handling: 

- useEffect 

- Speach Synthesis

- Local Storage 


### Useful resources

- [TypeScript Handbook](https://www.typescriptlang.org/) - For my first time using typescript. Understanding annotations was a challenge when defining my types for functions. Also the use of interface delcation for object types for when passing in the dictonary APIs. 

- [MDN Web Docs: Speach Synthesis Utterance ](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) - To complete a speech request so clients can hear the word, I had to understand Speech Synthesis more.  

- [React Docs](https://react.dev/)

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)



