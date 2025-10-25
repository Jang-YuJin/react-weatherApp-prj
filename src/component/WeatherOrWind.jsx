import React from 'react'

const WeatherOrWind = ({setChoice, choiceActive}) => {
  return (
    <div className='choice-container'>
      <button className={`weather-btn ${choiceActive === 'weather' ? 'choice-btn' : ''}`} onClick={() => setChoice('weather')}><img className='weather-img' src={'/img/weather.png'}></img></button>
      <button className={`weather-btn ${choiceActive === 'wind' ? 'choice-btn' : ''}`} onClick={() => setChoice('wind')}><img className='wind-img' src={'/img/wind.png'}></img></button>
    </div>
  )
}

export default WeatherOrWind
