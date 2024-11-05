const SearchSection = ({ getWeatherDetails, searchInputRef }) => {
  const API_KEY = import.meta.env.VITE_API_KEY

  const handleCitySearch = (e) => {
    e.preventDefault()
    const searchInput = e.target.querySelector('.search-input')
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`
    getWeatherDetails(API_URL)
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`
        getWeatherDetails(API_URL)
      },
      () => {
        alert('Location access denied. Please enable permissions to use this feature')
      }
    )
  }

  return (
    <div className="search-section">
      <form action="#" className="search-form" onSubmit={handleCitySearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="search" placeholder="Enter a city name"
          className="search-input" ref={searchInputRef} required />
      </form>
      <button className="location-button">
        <i className="fa-solid fa-location-crosshairs" onClick={getCurrentLocation}></i>
      </button>
    </div>
  )
}

export default SearchSection