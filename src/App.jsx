import Map from './assets/images/map.svg';
import { useState, useEffect } from 'react';
export default function App(){

  const [search, setSearch] = useState("")

  useEffect(()=>{
    fetch(`https://restcountries.com/v3.1/name/${search}`).then(
    res => {
      if(!res.ok){
        throw new Error("Neplatný uživatelský vstup")
      }
      return res.json()
      
    }
  )
  .then(
    data => data.map(item => console.log(item["name"]["common"]))
  )
  },[search])
  return(
    <div className="flex flex-col h-full w-full justify-center items-center">
      {/* <h1 className='font-bold text-xl'>Research country</h1>*/}
      <img  src={Map} alt="" className='h-full absolute ' style={{filter: "blur(2px)"}}/>
      <h2> {search}</h2>
      <input onChange={(e) => setSearch(e.target.value)} type="text" className='bg-white border-gray-500 z-10 w-1/5 h-12 border-4 rounded-lg font-semibold outline-none pl-2 shadow-black shadow-2xl'/>

    </div>
  )
}