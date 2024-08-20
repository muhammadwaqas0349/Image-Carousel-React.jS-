import { useState } from 'react'

import './App.css'
import { useEffect } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async() => {
    setLoading(true);
    const url = 'https://www.reddit.com/r/aww/top/.json?t=all'; 
    const res = await fetch(url); 
    const result = await res.json();
    const data = result.data.children;
    // console.log(data);
    const list = data.filter( (item) => item.data.url_overridden_by_dest.includes(".jpg"))
    .map( (item) => item.data.url_overridden_by_dest); 
    setImages(list);     
    setLoading(false);
  }
  // console.log(images);

  const handleClick = (dir) => {
  //  console.log("Index", index);
   const lastIndex = images.length - 1;

   if(dir === "left"){
    if(index === 0){
      console.log(lastIndex);
      setIndex(lastIndex);
    }
    else{
      setIndex( (prev) => prev -1); 
     }
   }

   else if(dir === "right"){
    if(lastIndex === index){
      setIndex(0);
    }
    else{
      setIndex( (prev) => prev+1)
    }
   }
   
  }  
  
  useEffect( () => {

    fetchImages();
  }, []);

  useEffect(() => {
    const tid = setInterval(() => {
      handleClick('right');
    }, 1000);

    return () => {
      clearInterval(tid);
    }
  }, [index])

  return (
    <>
      <div className="App">
        {loading ? <div>Loading ....</div> : 
        <>
          <button onClick={ () => handleClick("left")}>{"<"}</button>
          <img src={images[index]} alt='not found' />
          <button onClick={ () => handleClick("right")}
          className='right'>{">"}</button>
        </>
         }
      </div>
    </>
  )
}

export default App
