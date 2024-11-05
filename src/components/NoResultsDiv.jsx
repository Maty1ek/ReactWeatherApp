import React from 'react'

const NoResultsDiv = () => {
  return (
    <div className='no-results'>
        <img src="icons/no-result.svg" alt="" />
        <h3>Somethhing went wrong</h3>
        <p>We're unable to recieve the weather details. Enure you've entered a valid city name or try again later</p>
    </div>
  )
}

export default NoResultsDiv