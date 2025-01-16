import { useState, useEffect } from 'react';
import NoneFlag from "./assets/images/noneFlag.jpg"
import "./App.css"
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
    <section className='flex w-full h-full items-center justify-between'>
      <div className="flex flex-col ml-12">

        <h1 className='text-6xl font-bold'>Search your country</h1>
        <h2 className='text-2xl mt-5'>Get information on countries around the world.</h2>
        <div className='group relative'>
          <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
          </svg>
        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search...' className='relatve bg-white border-slate-500 focus:border-blue-500 border-2 z-10 w-80 h-12 mt-10 pl-10 rounded-lg font-semibold outline-none '/>
        </div>


      </div>
 
      <aside className='flex flex-col items-center w-72 h-96 mr-16 border-2 border-slate-500 rounded bg-white'>
        <img src={NoneFlag} alt="flag" className='w-44 h-28 mt-14' />
        <h2 className='text-center mt-2 text-2xl font-semibold w-64 overflow-clip'>{search? search : "Country"}</h2>
      </aside>
    </section>

  )
}