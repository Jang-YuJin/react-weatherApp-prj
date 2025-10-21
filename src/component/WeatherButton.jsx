import React from 'react'
import Button from 'react-bootstrap/Button';

const WeatherButton = () => {
  return (
    <div>
      <Button variant="outline-light">현재 위치</Button>
      <Button variant="outline-light">파리</Button>
      <Button variant="outline-light">도쿄</Button>
    </div>
  )
}

export default WeatherButton
