import axios from 'axios';

//use cnt=5 to limit
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
  }
}

export default api;