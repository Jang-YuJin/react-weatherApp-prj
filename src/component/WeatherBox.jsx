import React from 'react'

const WeatherBox = ({weather, choice}) => {
    let icon = weather?.weather[0].icon;

  return (
    <div className='weather-container'>
      <div className='location'>{weather?.name}</div>
      { choice === 'weather' ?
      <div className='temp-container'>
        <div>{weather?.main.temp}°C</div>
        <div>{(weather?.main.temp*1.8+32).toFixed(2)}°F</div>
      </div> :
      <div className='temp-container'>
        <div>{weather?.wind.speed}m/s</div>
        <div>{weather?.wind.deg}°</div>
      </div> 
      }
      <div className='weather-main'>{weather?.weather[0].description} {weather && <img className='weather-img' src={icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''} alt={weather?.weather[0].main}></img>}</div>
      
    </div>
  )
}

export default WeatherBox
