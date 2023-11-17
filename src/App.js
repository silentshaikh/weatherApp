import React, { useEffect, useState } from 'react';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { Divider } from 'antd';
import {GiSunset} from 'react-icons/gi';
import {WiHumidity} from 'react-icons/wi';
import {IoThunderstormOutline} from 'react-icons/io5';
import {RiSpeedUpLine} from 'react-icons/ri';
import './App.css';

function App() {
  const [inputValue,updInputValue] = useState('karachi');
  const [weatObj,upWeatObj] = useState('');
  const weatherData = async () => {
    try {
      let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`;
     let myFetch = await fetch(weatherUrl);
     let myData = await myFetch.json();
     console.log(myData) 
      let {temp,humidity,pressure} = myData.main;
      let {main} = myData.weather[0];
      let {name} = myData;
      let {speed} = myData.wind; 
      let {country,sunset} = myData.sys;
      console.log(country);
      const weatherObject = {
        temp,
        humidity,
        pressure,
        main,
        name,
        speed,
        country,
        sunset,
      };
      upWeatObj(weatherObject);
    } catch (error) {
      alert('This is not Available')
    }
  }
  useEffect(() => {
    weatherData();
  },[])
  let sun = weatObj.sunset;
  let cityDate = new Date(sun*1000);
  let setTimeCity = `${cityDate.getHours()}:${cityDate.getMinutes()}`;
  return (
  <>
  <h1 className='weatHead'>Our Weather Application</h1>
      <div className="searchBar">
      <input type="text" name="" id="" value={inputValue} onChange={(e) => updInputValue(e.target.value)}  autoFocus placeholder='Search Here...' />
      <button onClick={() => weatherData()}>Search</button>
      </div>
      <div className="weatherData">
      <div className="weatIcon">
        <TiWeatherPartlySunny className='icon'/>
      </div>
      <div className="wetCont">
      <div className="wetData">
        <h1 style={{fontFamily:`"Cherry Bomb One", cursive`,}}>{weatObj.temp}&deg;</h1>
        <div className="city">
          <h1>{weatObj.main}</h1>
          <h5>{weatObj.name}, {weatObj.country}</h5>
        </div>
      </div>
      <div className="wetTime">
        {new Date().toLocaleString()}
      </div>
      </div>
      <Divider/>
      <div className="detail">
    <div className="boxOne">
      <GiSunset className='detIcon'/>
      <div className="para">
        <p>{setTimeCity} {cityDate.getHours() > 11 ? 'PM' : 'AM'}</p> <p className='pres'>Sunset</p>
      </div>
    </div>
    <div className="boxOne">
      <WiHumidity className='detIcon'/>
      <div className="para">
        <p>{weatObj.humidity}</p> <p className='pres'>Humidity</p>
      </div>
    </div>
    <div className="boxOne">
      <IoThunderstormOutline className='detIcon'/>
      <div className="para">
        <p>{weatObj.pressure}</p> <p className='pres'>Pressure</p>
      </div>
    </div>
    <div className="boxOne">
      <RiSpeedUpLine className='detIcon'/>
      <div className="para">
        <p>{weatObj.speed}</p> <p className='pres'>Speed</p>
      </div>
    </div>
      </div>
      </div>
  </>
  );
}

export default App;
