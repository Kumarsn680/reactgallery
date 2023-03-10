import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
const ACCESS_KEY = "wNLZLEboBp9ux77jTpCT_kCI21Jt4z3nPleek55sbHE";

function App() {

  const [images,setImages] = useState([])
  // const [searchTerm,setSearchTerm] = useState("")
  const searchTerm = useRef('')
  const [finalSearchTerm, setFinalSearchTerm] = useState("coffee");


  const getData = async() =>{
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${finalSearchTerm}&client_id=${ACCESS_KEY}`);
    // const response = await fetch(`https://api.unsplash.com/me?client_id=${ACCESS_KEY}`);
    const imagelist = await response.json();
    console.log(imagelist);
    console.log("imagelist changed");
    setImages(imagelist.results);
  }
  useEffect(() => {
    console.log('useeffect called')
    console.log(finalSearchTerm)
    getData()
  }, [finalSearchTerm]);

  console.log(images);
  

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-evenly">
      <div className="mt-20 w-1/3 flex justify-between">
        <input
          className="p-3 outline-0 bg-slate-200 rounded-md w-4/5"
          type="text"
          placeholder="Search..."
          onChange={(e)=>{searchTerm.current = e.target.value}}
        ></input>
        <button className="bg-cyan-500 text-white p-2 rounded-md w-20" onClick={()=>{setFinalSearchTerm(searchTerm.current)}}>Submit</button>
      </div>

      <div className="flex  items-center  w-full h-full flex-wrap  justify-evenly">
        {images.map((image) => (
          <img
            className="mt-20 h-2/3 w-1/4 m-5 object-cover rounded-md"
            key={image.id}
            src={image.links.download}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
