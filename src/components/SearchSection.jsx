import { useRef } from "react"

const SearchSection = ({getData, inputRef, getLocation}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const cityName = inputRef.current.value.toLowerCase()
    getData(cityName)
  }

  

  return (
    <div className="search-section">
      <form action="#" className="search-form" onSubmit={handleSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="search" placeholder="Enter a city name"
          className="search-input" ref={inputRef} required />
      </form>
      <button className="location-button" onClick={getLocation}>
        <i className="fa-solid fa-location-crosshairs"></i>
      </button>
    </div>
  )
}

export default SearchSection