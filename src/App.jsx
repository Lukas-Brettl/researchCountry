import { useState, useEffect, useRef } from 'react';
import NoneFlag from "./assets/images/noneFlag.jpg"
import ComboBox from "./components/combobox.jsx"
import "./App.css"
export default function App(){
  //all states
  const [search, setSearch] = useState("")
  const [flag, setFlag] = useState("")
  const [information, setInformation] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [comboInfo, setComboInfo] = useState()
  const [firstFour, setFirstFour] = useState()

  
  const isUserInput = useRef(true)

  function handleItemClick(code){
    console.log(code)

    setIsLoading(true)
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    .then(
      res => {
        if(!res.ok){
          console.log("Neplatný uživatelský vstup")
          setFlag("")
          setInformation("")
          setIsLoading(false) // if fatch fails set default flag, delete information and stop Loading
        }
        else{
          return res.json() // if data is ok continues
        }
    })
    .then(
      data =>{
        
        setFlag(data[0]["flags"]["svg"]) //set flag

        isUserInput.current = false
        setSearch(data[0]["name"]["common"])

        let capital = ""
        let currencies = ""
        const lastCity = data[0]["capital"][data[0]["capital"].length -1] 
        data[0]["capital"].map(item => item === lastCity ? capital += item : capital +=`${item}, `) //set capital cities (when is one city set one city, but when is more then one capital city set ",")

        let CurrenciesEntries = Object.entries(data[0]["currencies"])

        for(let [key, value] of CurrenciesEntries){ // (I don't know why but if I don't use the key it won't work)
            currencies ? currencies += ", ": null // when there is more then one currency set ","
            currencies += `${value["name"]} (${value["symbol"]})` // add currencies and symbol
        }

        setInformation(
          <div className='flex flex-col gap-2 ml-2 mt-4 w-64'>
            <h3>Capital city: {capital}</h3>
            <h3>Population: {data[0]["population"]}</h3>
            <h3>Region: {data[0]["region"]}</h3>
            <h3>Currency: {currencies}</h3>
            <a href={data[0]["maps"]["googleMaps"]} className=' w-36 ml-28 mt-4 text-center font-semibold bg-blue-500 text-white p-2 rounded-md' target='_blank'>Go to the map</a>
        </div>
        )
        console.log(search,capital,data[0]["population"],currencies)
        setIsLoading(false)
      }
    )

  }






  //fetch data
  useEffect(()=>{
    if (!isUserInput.current) {
      isUserInput.current = true
      return undefined
    }

    if(search.length > 2){ //input must be min 3 letters
      setIsLoading(true)
      fetch(`https://restcountries.com/v3.1/name/${search}`).then(
      res => {
        if(!res.ok){
          console.log("Neplatný uživatelský vstup")
          setFlag("")
          setInformation("")
          setIsLoading(false) // if input isn't country set default flag, delete information and stop Loading
        }
        else{
          return res.json() // if input is ok continues
        }
        
        
      })
      .then(
        data => {
          setComboInfo(null) //reset combobox (undex input)
          setFirstFour(data.slice(0, 4)) //get first four countries
          
          const newComboInfo = {}
          firstFour && firstFour.map(item => {
            
            newComboInfo[item["name"]["common"]] = {
              flag: item["flags"]["svg"], //set combobox informations key("country") : value("svg flag")
              code: item["ccn3"]
            } 
          })
          setComboInfo(newComboInfo)

          if(data && data[0]["flags"]["svg"] != flag){ // if flag changes

            setFlag(data[0]["flags"]["svg"]) //set flag

            let capital = ""
            let currencies = ""
            const lastCity = data[0]["capital"][data[0]["capital"].length -1] 
            data[0]["capital"].map(item => item === lastCity ? capital += item : capital +=`${item}, `) //set capital cities (when is one city set one city, but when is more then one capital city set ",")

            let CurrenciesEntries = Object.entries(data[0]["currencies"])

            for(let [key, value] of CurrenciesEntries){ // (I don't know why but if I don't use the key it won't work)
                currencies ? currencies += ", ": null // when there is more then one currency set ","
                currencies += `${value["name"]} (${value["symbol"]})` // add currencies and symbol
            }

            setInformation(
              <div className='flex flex-col gap-2 ml-2 mt-4 w-64'>
                <h3>Capital city: {capital}</h3>
                <h3>Population: {data[0]["population"]}</h3>
                <h3>Region: {data[0]["region"]}</h3>
                <h3>Currency: {currencies}</h3>
                <a href={data[0]["maps"]["googleMaps"]} className=' w-36 ml-28 mt-4 text-center font-semibold bg-blue-500 text-white p-2 rounded-md' target='_blank'>Go to the map</a>
            </div>
            )

            
          }

          if(data && data[0]["name"]["common"] != search){
            setSearch(data[0]["name"]["common"]) // compleate name country
            
          }
          },
        //ends loading
      )
    }
    else{
      //set default flag and delete informations
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
          <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-11 mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
          </svg>
        <input onChange={(e) => setSearch(e.target.value)}  type="text" placeholder='Search...' className='relatve bg-white border-slate-500 focus:border-blue-500 border-2 z-10 w-80 h-12 mt-10 pl-10 rounded-lg font-semibold outline-none '/> {/* Input for countries*/}
        {comboInfo && <ComboBox info={comboInfo} onItemClick={handleItemClick}/>} {/* set combobox*/}
        </div>


      </div>
 
      <aside className='relative flex flex-col items-center w-72 pb-3 mr-16 border-2 border-slate-500 rounded bg-white'> 
        <img src={flag ? flag : NoneFlag} alt="flag" className='w-auto h-32 mt-8 border shadow' /> 
        <h2 className='text-center mt-2 text-2xl font-semibold w-64 overflow-clip'>{search? search : "Country"}</h2>
        {isLoading ? (<h1 className='absolute flex justify-center items-center top-20 p-3 text-3xl font-semibold rounded-lg bg-white w-40'>Loading...</h1>) : (information && information)} {/* add loading text if it takes long time to load informations */}
      </aside>
    </section>

  )
}