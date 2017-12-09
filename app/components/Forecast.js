import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loading from './Loading';
import api from '../utils/api';

const Icon = (props) => {                        
  const daily = props.forecast;

  return daily.map(day => {
    const iconKey = day.weather[0].icon;
    const dayName = moment(day.dt_txt)._d;
    const abbr = dayName.toString().split(' ');
    const weekday = `${abbr[0]}, ${abbr[1]} ${abbr[2]}`;
    const city = props.city;
    const icon = api.getIcons(iconKey);

    return (
      <Link key={day.dt_txt} to={{ pathname: `/details/${props.city.name}`, state:{day:day, weekday: weekday, city: city} }}>
        
        <ul className='day'>
          <li className='weekday'> {weekday} </li>
          <li>
            {icon !== undefined 
              ? icon[0].icon 
              : <p>can't find image</p>}
          </li>
        </ul>
      
      </Link>
    )
  })
}

Icon.propTypes = {
  forecast: PropTypes.array.isRequired,
  city: PropTypes.object.isRequired
}


class Forecast extends React.Component {
  constructor(props) {
    super(props);
    
    this.state={
      city: null,
      forecast: [],
      details: null,
      error: null,
      loading: true
    }
  }
  
  callWeather(location) {
    
    api.getWeather(location)
      .then( response => {
        if(response.city.name) {

          return this.setState({
            city: response.city,
            forecast: response.forecast,
            loading: false,
            error: null
          })
        
        }
    }).catch(error => {
        return this.setState({error: 'input field blank or misspelled'})
    })
  }
  
  componentDidMount() {
    const location = this.props.location.state
    this.callWeather(location);
  }

  componentWillReceiveProps(nextProps) {
    const location = nextProps.location.state;
    if(location) {
      this.setState({error: null})
      if(location[1] !== this.state.city.name) {
        
        this.callWeather(location);
        
      }
    }
    else return this.setState({error: 'input field blank or misspelled'})
  }
  
  
  
  render() {
    const details = this.state.details;
    const error = this.state.error
    if(error) {
      return (
        <div className='header' style={{textAlign: 'center'}}>
          <p>{error.toString()}</p>
        </div>
      )
    }
    
    else if(this.state.loading) {
      return <Loading />
    }

    return (

      <div className='column'>
        <div className='header'>{this.state.city.name} </div>
        <div className='iconContainer'> 
          <Icon forecast={this.state.forecast} city={this.state.city} />
        </div>
      </div>

    )
  }
}

export default Forecast;