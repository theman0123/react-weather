import React from 'react';
import { ReactRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './Home';
import Forecast from './Forecast';
import WeatherForm from './WeatherForm';
import Details from './Details';

const NavBar = (props) => {
  return (
    <div className='navBar'>
      <h1>
        {props.title}
      </h1>
      {props.children}
    </div>
  )
}

NavBar.default = {
  title: 'Clever Thing'   
}
    
NavBar.propTypes = {
  title: PropTypes.string.isRequired
}

const offLimits = () => {
  return <div> HEY!! THIS IS OFF LIMITS, NERD! </div>
}


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
      
          <NavBar title='CityWeather'>
            <WeatherForm direction='row' />
          </NavBar>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/forecast' component={Forecast} />
            <Route path='/details' component={Details} />
            <Route render={offLimits} />
          </Switch>
      
        </div>
      </BrowserRouter>
    )
  }
}

export default App;