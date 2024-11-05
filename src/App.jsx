import SearchSection from './components/SearchSection'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import NoResultsDiv from './components/NoResultsDiv.jsx'
import { useState, useRef, useEffect } from 'react'
import { weatherCodes } from './constants.js'

const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY

  const [currentWeather, setCurrentWeather] = useState({})
  const [forecast, setForecast] = useState([])
  const [hasNoResults, setHasNoResults] = useState(false)
  const searchInputRef = useRef(null)

  // const [isWeather, setIsWeather] = useState(false)

  const filterHourlyForecast = (hourlyData) => {
    const currentTime = new Date().setMinutes(0, 0, 0)
    const next24Hours = currentTime + 24 * 60 * 60 * 1000
    console.log(hourlyData);
    

    const forecas24HourData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime()      
      return forecastTime >= currentTime && forecastTime <= next24Hours
    })

    setForecast(forecas24HourData)
  }

  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false)

    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error()
      const data = await response.json()

      const currentTemp = Math.round(data.current.temp_c)
      const currentDescription = data.current.condition.text
      const weatherIcon = Object.keys(weatherCodes)
        .find(icon => weatherCodes[icon].includes(data.current.condition.code))

      const hourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]
      filterHourlyForecast(hourlyData)

      searchInputRef.current.value = data.location.name
      // qq
      // setForecast(forecastHours)      
      setCurrentWeather({ currentTemp, currentDescription, weatherIcon })
      // setIsWeather(true)
    } catch {
      setHasNoResults(true)
    }
  }

  useEffect(() => {
    const defaultCity = 'almaty'
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`
        getWeatherDetails(API_URL)
  }, [])

  return <div className="container">
    {/* search section */}
    <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />

    {/* {isWeather && (
      <div className="weather-section">
        <CurrentWeather currentWeather={currentWeather} />

        <div className="hourly-forecast">
          <ul className="weather-list">
            {forecast.map(hourlyWeather => (
              <HourlyForecast key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather} />
            ))}
          </ul>
        </div>
      </div>
    )} */}
    {hasNoResults ? (
      <NoResultsDiv />
    ) : (
      <div className="weather-section">
      <CurrentWeather currentWeather={currentWeather} />

      <div className="hourly-forecast">
        <ul className="weather-list">
          {forecast.map(hourlyWeather => (
            <HourlyForecast key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather}/>
          ))}
        </ul>
      </div>
    </div>
    )}

  </div>
}

export default App