import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Weather from "./components/Weather";

function App() {
const [weatherInfo, setWeatherInfo] = useState(null)

  const sucess= (pos)=>{
    const lat= pos.coords.latitude
    const lon= pos.coords.longitude
    const API_KEY= "b105fc19badaf4554dba05c321756f97"
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    axios.get(url)
    .then(({data})=>setWeatherInfo(data))
    .catch((err)=>console.log(err))
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(sucess)
  }, [])
  
  return (
      <main className=" h-screen w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-lato flex justify-center items-center">
        <Weather weatherInfo={weatherInfo}/>
      </main>
  );
}

export default App;
