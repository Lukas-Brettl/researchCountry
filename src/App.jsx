import { useState, useEffect } from 'react';
import NoneFlag from "./assets/images/noneFlag.jpg"
import "./App.css"
export default function App(){

  const [search, setSearch] = useState("")
  const [flag, setFlag] = useState("")
  const [information, setInformation] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    if(search.length > 2){
      setIsLoading(true)
      fetch(`https://restcountries.com/v3.1/name/${search}`).then(
      res => {
        if(!res.ok){
          console.log("Neplatný uživatelský vstup")
          setFlag("")
          setInformation("")
          setIsLoading(false)
        }
        else{
          return res.json()
        }
        
        
      })
      .then(
        data => {
          if(data && data[0]["flags"]["png"] != flag){

            setFlag(data[0]["flags"]["png"])
            let capital = ""
            let currencies = ""
            const lastCity = data[0]["capital"][data[0]["capital"].length -1]
            data[0]["capital"].map(item => item === lastCity? capital += item : capital +=`${item}, `)
            let CurrenciesEntries = Object.entries(data[0]["currencies"])

            for(let [key, value] of CurrenciesEntries){ //I don't know why but if I don't use the key it won't work
                currencies ? currencies += ", ": null
                currencies += `${value["name"]} (${value["symbol"]})`
            }

            setInformation(
              <div className='flex flex-col gap-2 ml-10 mt-4 w-full'>
                <h3>Capital city: {capital}</h3>
                <h3>Population: {data[0]["population"]}</h3>
                <h3>Region: {data[0]["region"]}</h3>
                <h3>Currency: {currencies}</h3>
                <a href={data[0]["maps"]["googleMaps"]} className=' w-36 ml-28 mt-4 text-center font-semibold bg-blue-500 text-white p-2 rounded-md' target='_blank'>Go to the map</a>
            </div>
            )

            
          }

          if(data && data[0]["name"]["common"] != search){
            setSearch(data[0]["name"]["common"])
            
          }
          },
        setIsLoading(false)
      )
    }
    else{
      setFlag("")
      setInformation("")
    }
},[search])
  return(
    <section className='flex w-full h-full items-center justify-between'>
      <div className="flex flex-col ml-12">

        <h1 className='text-6xl font-bold'>Search your country</h1>
        <h2 className='text-2xl mt-5'>Get information on countries around the world.</h2>
        <div className='group relative'>
          <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
          </svg>
        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search...' className='relatve bg-white border-slate-500 focus:border-blue-500 border-2 z-10 w-80 h-12 mt-10 pl-10 rounded-lg font-semibold outline-none '/>
        </div>


      </div>
 
      <aside className='flex flex-col items-center w-72 pb-2 mr-16 border-2 border-slate-500 rounded bg-white'>
        <img src={flag ? flag : NoneFlag} alt="flag" className='w-auto h-32 mt-8 border shadow' />
        <h2 className='text-center mt-2 text-2xl font-semibold w-64 overflow-clip'>{search? search : "Country"}</h2>
        {isLoading ? (<h1>Loading</h1>) : (information && information)}
      </aside>
    </section>

  )
}