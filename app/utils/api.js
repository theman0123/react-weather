import React from 'react';
import axios from 'axios';

import Icon01d from '../images/weather-icons/Icon01d.js';
import Icon01n from '../images/weather-icons/Icon01n.js';
import Icon02d from '../images/weather-icons/Icon02d.js';
import Icon02n from '../images/weather-icons/Icon02n.js';
import Icon03d from '../images/weather-icons/Icon03d.js';
import Icon03n from '../images/weather-icons/Icon03n.js';
import Icon04d from '../images/weather-icons/Icon04d.js';
import Icon04n from '../images/weather-icons/Icon04n.js';
import Icon09d from '../images/weather-icons/Icon09d.js';
import Icon09n from '../images/weather-icons/Icon09n.js';
import Icon10d from '../images/weather-icons/Icon10d.js';
import Icon10n from '../images/weather-icons/Icon10n.js';
import Icon11d from '../images/weather-icons/Icon11d.js';
import Icon11n from '../images/weather-icons/Icon11n.js';
import Icon13d from '../images/weather-icons/Icon13d.js';
import Icon13n from '../images/weather-icons/Icon13n.js';
import Icon50d from '../images/weather-icons/Icon50d.js';
import Icon50n from '../images/weather-icons/Icon50n.js';




//firebase[hosting] requires all paths to be relative.
//By 'import' we are accomplishing that.
//it also means that we can't use them directly {variableForSVG='absolute-path'}, but transform them instead to a component
//hence the use of an iconArray

const iconArray = [
  {key: '01d', icon: <Icon01d height='125px' width='125px'/>},
  {key: '01n', icon: <Icon01n height='150px' width='150px'/>},
  {key: '02d', icon: <Icon02d height='150px' width='150px'/>},
  {key: '02n', icon: <Icon02n height='150px' width='150px'/>},
  {key: '03d', icon: <Icon03d height='150px' width='150px'/>},
  {key: '03n', icon: <Icon03n height='150px' width='150px'/>},
  {key: '04d', icon: <Icon04d height='150px' width='150px'/>},
  {key: '04n', icon: <Icon04n height='150px' width='150px'/>},
  {key: '09d', icon: <Icon09d height='150px' width='150px'/>},
  {key: '09n', icon: <Icon09n height='150px' width='150px'/>},
  {key: '10d', icon: <Icon10d height='150px' width='150px'/>},
  {key: '10n', icon: <Icon10n height='150px' width='150px'/>},
  {key: '11d', icon: <Icon11d height='150px' width='150px'/>},
  {key: '11n', icon: <Icon11n height='150px' width='150px'/>},
  {key: '13d', icon: <Icon13d height='150px' width='150px'/>},
  {key: '13n', icon: <Icon13n height='150px' width='150px'/>},
  {key: '50d', icon: <Icon50d height='150px' width='150px'/>},
  {key: '50n', icon: <Icon50n height='150px' width='150px'/>},
  

];

const APIKEY = 'de66b7d619a71b1465dc3b20177fb469';
const api = {
  getWeather: (location) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${APIKEY}&cnt=56`)
      .then(response => {
        const eat = response.data;
        const city = eat.city;

        const forecast = eat.list.filter(weather => {
          let justPastNoon = weather.dt_txt.split(' ');
          if(justPastNoon[1] === "15:00:00")
            return justPastNoon;
        })
        
        return{
          forecast: forecast,
          city: city
        }
        
    })
      .catch(error => {
        return error.toString();
    })
  },
  getIcons: (iconKey) => {
    return iconArray.filter(icon => icon.key === iconKey)
  } 
}

export default api;