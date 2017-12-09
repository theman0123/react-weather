import React from 'react';
import PropTypes from 'prop-types';
import kelvinToFahrenheit from 'kelvin-to-fahrenheit';
import ReactSVG from 'react-svg';

const Details = (props) => {
  const city = props.location.state.city;
  const day = props.location.state.day;
  const weather = day.weather[0];
  const weekday = props.location.state.weekday;

  return (
    <div className='column'>
      <ul className='details'>
        <li> 
          <ReactSVG
              path={`../app/images/weather-icons/${weather.icon}.svg`}
              style={{height:'150px', width:'150px'}}
            />
        </li>
        <li className=''> {weekday} </li>
        
        <li className='cityDetails' style={{fontSize: '40px'}}> {city.name} </li>
        <li> {weather.description} </li>
        <li> temp: {kelvinToFahrenheit(day.main.temp)} </li>
        <li> humidity: {day.main.humidity}% </li>
      </ul>
    </div>
  )
}

//location is from react-router passing prev state
Details.propTypes = {
  location: PropTypes.object.isRequired
}

export default Details;