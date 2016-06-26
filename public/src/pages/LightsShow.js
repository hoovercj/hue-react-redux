import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LightDetailsContainer from '../containers/LightDetailsContainer.js';

class LightsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div className='container'>
        <LightDetailsContainer id={this.props.params.id}/>
      </div>
    );
  }
}

export default LightsShow;
