import React from 'react'
import Button from 'react-bootstrap/Button';

const WeatherButton = ({cities, setCity, cityActive}) => {

  return (
    <div className='btn-container'>
      <Button variant="outline-dark" onClick={() => setCity(null)} active={cityActive === null ? true : false}>Current Location</Button>
      {cities.map((item, index) => (
          <Button variant="outline-dark" key={index} onClick={() => setCity(item)} active={item === cityActive ? true : false}>{item}</Button>//react bootstrap 버튼 active를 조작해서 클릭한 상태 표시
      ))}
    </div>
  )
}

export default WeatherButton
