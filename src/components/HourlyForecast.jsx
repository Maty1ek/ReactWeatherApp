import { weatherCodes } from '../constants.js'

const HourlyForecast = ({hourlyWeather}) => {
  const time = hourlyWeather.time.substr(-5, 5)
  const temp = Math.round(hourlyWeather.temp_c)
  const weatherIcon = Object.keys(weatherCodes)
        .find(icon => weatherCodes[icon].includes(hourlyWeather.condition.code))
  
  return (
    <li className="weather-item">
            <p className="time">{time}</p>
            <img src={`icons/${weatherIcon}.svg` }alt="" className="weather-icon" />
            <p className="temprature">{temp}°</p>
          </li>
  )
}

export default HourlyForecast