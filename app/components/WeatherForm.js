import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

class WeatherForm extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      location: '',
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  handleChange(e) {
    const input = e.target.value;

    this.setState(() => {
      return {
        location: input,
        redirect: false
      }
    })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      return this.setState({redirect: true});
  }
}
  
  render() {
    let location = this.state.location;
    //this is the recommended solution... produces a react warning
    if(this.state.redirect) {
      this.setState({redirect: false})
      return <Redirect push to={{pathname: '/forecast', state: location}} />
    }

    return (
      <form className={this.props.direction}>
      
        <label className='header' htmlFor='location'>
          {this.props.label}
        </label>
      
        <input
          className='input'
          id='location'
          placeholder='city i.e: los angeles'
          type='text'
          autoComplete='on'
          value={this.state.location}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        
        <Link
          className='button'
          type='submit'
          to={{
            pathname: '/forecast',
            state: location
          }}>
            Get Weather
        </Link>
        
      </form>
    )
  }
}

WeatherForm.propTypes = {
  label: PropTypes.string,
  direction: PropTypes.string
}

export default WeatherForm;