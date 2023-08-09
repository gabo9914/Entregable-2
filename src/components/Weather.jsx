import axios from "axios";
import { useState } from "react";
import { BsSearch } from 'react-icons/bs';

const Weather = ({weatherInfo}) => {
    const [isCelcius, setIsCelcius] = useState(true)
    const [city, setcity] = useState(null)
    const kelvinToCelsius=(tempKelvin)=>{
        return (tempKelvin - 273.15).toFixed(1)
    }
    
    const kelvinToFahrenheit=(tempKelvin)=>{
        return (((tempKelvin - 273.15)*9/5)+32).toFixed(1)
    }
    const handleChangeUnit=()=>{
        setIsCelcius(!isCelcius)
    }
    const handleSearch= (e)=>{
        e.preventDefault()
        const cityValue= e.target.search.value
        const API_KEY= "b105fc19badaf4554dba05c321756f97"
        const urlCountry= `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}` 
        
        axios.get(urlCountry)
        .then(({data})=>setcity(data))
        .catch((err)=>console.log(err))
    }
    const handleReset= (e)=>{
        e.target.parentElement.reset()
        setcity(null)
    }
    const infoValiu = city===null ? weatherInfo : city

    const resultTemp = isCelcius ? kelvinToCelsius(infoValiu?.main.temp) : kelvinToFahrenheit(infoValiu?.main.temp);

  return (
    <>
        <section className=" min-h-screen flex flex-col gap-5 justify-center items-center text-center">
                <div className=" flex flex-col">
                     <h1 className=" font-extrabold text-2xl">Weather App</h1>
                    <form className=" mt-7 flex flex-col justify-center items-center gap-1" onSubmit={handleSearch}>
                     <div className=" flex justify-center items-center gap-1 sm:">
                            <input id="search" className=" text-black" type='text' name="Search"/>
                            <button className=" text-black"><BsSearch></BsSearch></button>
                     </div>
                        <button className="  bg-green-400 rounded-md text-black font-medium" onClick={handleReset}>Reset</button>
                    </form>
                </div>
                <h2 className=" text-black font-bold">{infoValiu?.name}</h2>
                <section className=" grid gap-4 sm:grid-cols-[auto_auto]">
                 
                    {/*Section Superior*/}
                <section className="bg-white/60 text-black p-2 rounded-xl grid grid-cols-2 items-center ">
                 <h4 className=" col-span-2 text-center text-violet-900 font-bold">{infoValiu?.weather[0].description}</h4>
                    <span className=" text-center text-4xl  text-violet-900 font-bold">{resultTemp}°{isCelcius?"C" : "F"}</span>
                    <div>
                        <img src={`https://openweathermap.org/img/wn/${infoValiu?.weather[0].icon}@4x.png`}/>
                    </div>
                </section>
            {/*Section Inferior*/}
            <section className="bg-white/60 text-black p-2 py-4 rounded-xl grid grid-cols-3 items-center sm:grid-cols-1">
                <article className=" flex gap-2 justify-center">
                    <div>
                        <img src={"/images/wind.png"} alt="" />
                    </div>
                    <span className="  text-violet-900 font-bold">{infoValiu?.wind.speed}m/s</span>
                </article>
                <article className=" flex gap-2 justify-center">
                    <div>
                        <img src={"/images/humidity.png"} alt="" />
                    </div>
                    <span className="  text-violet-900 font-bold">{infoValiu?.main.humidity}%</span>
                </article>
                <article className=" flex gap-2 justify-center">
                    <div>
                        <img src= {"/images/pressure.png"} alt="" />
                    </div>
                    <span className=" text-violet-900 font-bold">{infoValiu?.main.pressure}hPa</span>
                </article>
                </section>
            </section>
            <button onClick={handleChangeUnit} className=" mt-4 bg-green-400 rounded-md text-black font-medium w-55">Change Unit</button>
        </section>
        
    </>
  )
}
export default Weather