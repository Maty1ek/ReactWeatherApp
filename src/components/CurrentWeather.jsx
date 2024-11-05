const WeatherSection = ({currentWeather}) => {
  return (
    <div className="current-weather">
      <img src={`icons/${currentWeather.weatherIcon}.svg`} alt="" className="weather-icon" />
      <h2 className="temprature">
      {currentWeather.currentTemp} <span>°C</span>
      </h2>
      <p className="description">{currentWeather.currentDescription}</p>
    </div>
  )
}

export default WeatherSection