import React, { Component } from 'react';
import LightsList from '../containers/LightsListContainer.js';

class LightsIndex extends Component {
  render() {
    return (
      <div>
        <LightsList getLights={true} />
      </div>
    );
  }
}


export default LightsIndex;
