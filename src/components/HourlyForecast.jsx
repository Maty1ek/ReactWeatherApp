import { weatherCodes } from '../constants.js'

const HourlyForecast = ({ forecastWeather }) => {
  const forecastTime = forecastWeather.time.substr(-5, 5)
  // const forecastTime = forecastWeather.time.slice(-5, forecastWeather.time.length)

  const hourlyIcon = Object.keys(weatherCodes)
    .find((state) => weatherCodes[state].includes(forecastWeather.condition.code))

  return (
    <li className="weather-item">
      <p className="time">{forecastTime}</p>
      <img src={`icons/${hourlyIcon}.svg`} alt="" className="weather-icon" />
      <p className="temprature">{Math.round(forecastWeather.temp_c)}°</p>
    </li>
  )
}

export default HourlyForecast