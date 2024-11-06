import SearchSection from './components/SearchSection'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import NoResultsDiv from './components/NoResultsDiv.jsx'
import { useState, useRef, useEffect } from 'react'
import { weatherCodes } from './constants.js'

const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY

  const [currentWeather, setCurrentWeather] = useState({})
  const [dailyForecast, setDailyForecast] = useState([])
  const [isAccess, setIsAccess] = useState(false)
  // const [fakeSkeleton, setFakeSceleton] = useState(false)
  const [hasNoResult, setHasNoResult] = useState(false)
  const inputRef = useRef()

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords
        getData(`${latitude},${longitude}`)
      },
      () => {
        alert('Location access denied. Please enable permissions to use this feature')
      }
    )
  }

  const getDailyForecast = (hourlyForecast) => {
    const currentTime = new Date().setMinutes(0, 0, 0)
    const next24Hours = currentTime + 24 * 60 * 60 * 1000

    const forecast24Hours = hourlyForecast.filter(({ time }) => {
      const forecastTime = new Date(time).getTime()
      return forecastTime >= currentTime && forecastTime <= next24Hours
    })

    setDailyForecast(forecast24Hours)
  }

  const getData = async (cityName) => {
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2`

    try {
      setIsAccess(true)
      setHasNoResult(false)

      const response = await fetch(API_URL)
      if (!response.ok) throw new Error()
      const data = await response.json()

      const currentTemp = Math.round(data.current.temp_c)
      const currentDescription = data.current.condition.text
      const currentIcon = Object.keys(weatherCodes)
        .find((state) => weatherCodes[state].includes(data.current.condition.code))

      // const hourlyForecast = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[0].hour];
      // const hourlyForecast = data.forecast.forecastday.flatMap((item) => item.hour)
      const hourlyForecast = [].concat(...data.forecast.forecastday.map(({ hour }) => hour))
      getDailyForecast(hourlyForecast)

      setCurrentWeather({ currentTemp, currentDescription, currentIcon })

      inputRef.current.value = data.location.name
    } catch (e) {
      setIsAccess(false)
      setHasNoResult(true)
      console.log(e);
    }
  }
  console.log('rendered');

  useEffect(() => {
    getLocation()
  }, [])

  return <div className="container">
    {/* search section */}
    <SearchSection getData={getData} inputRef={inputRef} getLocation={getLocation}/>

    {isAccess && (
      <div className="weather-section">
        <CurrentWeather currentWeather={currentWeather} />

        <div className="hourly-forecast">
          <ul className="weather-list">
            {
              dailyForecast.map(forecastWeather =>
              (
                <HourlyForecast key={forecastWeather.time_epoch} forecastWeather={forecastWeather} />
              )
              )
            }
          </ul>
        </div>
      </div>
    )}
    {hasNoResult && (
      <NoResultsDiv />
    )}

  </div>
}

export default App