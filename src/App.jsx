import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton'
import WeatherOrWind from './component/WeatherOrWind';
import { ClipLoader } from "react-spinners";

// 1. 앱 실행 하자마자 현재 위치 기반 날씨 표시
// 2. 도시, 섭씨, 화씨, 날씨 정보 표시
// 3. 5개 버튼(1개는 현재 위치, 다른 도시 4개)
// 4. 도시 버튼 클릭 시 도시별 날씨 정보 표시
// 5. 현재 위치 버튼 클릭 시 다시 현재 위치 기반의 날씨 정보 표시
// 6. 데이터를 들고오는 동안 로딩스피너

function App() {
  const cities = ['Paris', 'London', 'Tokyo', 'Rome']; //도시들 배열

  const [weather, setWeather] = useState(null); //날씨 데이터 state
  const [city, setCity] = useState(null); //선택한 도시 state
  const [loading, setLoading] = useState(false); //로딩 상태 state
  const [choice, setChoice] = useState('weather'); //날씨정보인지 바람정보인지 선택하는 state
  const [cityActive, setCityActive] = useState(null); //클릭한 도시 버튼 active state
  const [choiceActive, setChoiceActive] = useState('weather'); //클릭한 날씨/바람 정보 버튼 active state
  const [err, setErr] = useState('');

  const getCurrentLocation = () => { //현재 도시 위치 위경도 찾는 함수
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon); //찾은 위경도로 날씨데이터를 찾는 함수 호출
    });
  };

  const getApiData = async(url) => { //API 호출하는 함수를 따로 뺌, 여기서만 로딩스피너 한번 코드로 쓸 수 있도록
    setLoading(true);
    try {
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('에러가 발생했습니다. 관리자에게 연락해주세요.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setErr(error.message);
    } finally{
      setLoading(false);
    }
  };

  const getWeatherByCurrentLocation = async(lat, lon) => {
    // let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d677db976f4eccd4723e34b0a03f16c&units=metric`;
    // const response = await fetch(url);
    // const data = await response.json();

    // setWeather(data);
    setWeather(await getApiData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d677db976f4eccd4723e34b0a03f16c&units=metric`));
    //비동기 작업이므로 API 호출하는 함수 await 필요!
  };

  const getWeatherbyCity = async(city) => {
    // let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d677db976f4eccd4723e34b0a03f16c&units=metric`;
    // const response = await fetch(url);
    // const data = await response.json();

    // setWeather(data);
    setWeather(await getApiData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d677db976f4eccd4723e34b0a03f16c&units=metric`));
    //비동기 작업이므로 API 호출하는 함수 await 필요!
  };

  useEffect(() => { //city state가 변경되고 ui가 랜더링 된 후
    if(city === null){
      getCurrentLocation();
      setCityActive(null);
    } else{
      getWeatherbyCity(city);
      setCityActive(city);
    }
  }, [city])

  useEffect(() => { //choice state가 변경되고 ui가 랜더링 된 후
    setChoiceActive(choice);
  }, [choice])

  return (
    <>
      {loading ? 
      <div className='main'>
        <ClipLoader
          color={'#fffff'}
          loading={loading}
          // cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div> : err == '' ?
      <div className='main'>
        <WeatherOrWind setChoice={setChoice} choiceActive={choiceActive}></WeatherOrWind>
        <WeatherBox weather={weather} choice={choice}></WeatherBox>
        <WeatherButton cities={cities} setCity={setCity} cityActive={cityActive} ></WeatherButton>
      </div> :
      alert(err)
      }
    </>
  )
}

export default App
