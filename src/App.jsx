import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton'

// 1. 앱 실행 하자마자 현재 위치 기반 날씨 표시
// 2. 도시, 섭씨, 화씨, 날씨 정보 표시
// 3. 5개 버튼(1개는 현재 위치, 다른 도시 4개)
// 4. 도시 버튼 클릭 시 도시별 날씨 정보 표시
// 5. 현재 위치 버튼 클릭 시 다시 현재 위치 기반의 날씨 정보 표시
// 6. 데이터를 들고오는 동안 로딩스피너

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d677db976f4eccd4723e34b0a03f16c&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    setWeather(data);
  };

  return (
    <div className='main'>
      <WeatherBox weather={weather}></WeatherBox>
      <WeatherButton></WeatherButton>
    </div>
  )
}

export default App
