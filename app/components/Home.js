import React from 'react';

import WeatherForm from './WeatherForm';

const Home = () => {
    return (
      <div className='home'>
        <WeatherForm
          label='Enter The Name Of A City'
          direction='column'
        />
      </div>
    )
  }

export default Home;
