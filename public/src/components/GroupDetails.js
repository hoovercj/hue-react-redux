import React, { Component, PropTypes } from 'react';
import { SliderPicker, ChromePicker } from 'react-color';

import LightsList from '../containers/LightsListContainer.js';


// IMPORTANT VALUES:
// Hue API
// Hue: 65535
// Sat: 254
// Bri: 254
// -----------
// color-react
// Hue: 359
// Sat: 100%
// L: 100%
const HUE_SCALAR = 65535 / 359;
const SAT_MAX = 254;
const BRI_MAX = 254;


class LightDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleColorChangeComplete = (color) => {
    this.props.updateGroup(this.props.group, 
      {
        action: {
          hue: Math.floor(color.hsl.h * HUE_SCALAR),
          sat: Math.floor(color.hsl.s * SAT_MAX),
          bri: Math.floor(color.hsl.l * BRI_MAX)
        }
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="col-md-12">
        <h3>{this.props.group.name}
          <small>
          <label className="switch">
            <input type="checkbox"
              checked={this.props.group.state.all_on}
              onChange={() => {
                this.props.updateGroup(this.props.group, 
                  {
                    state: {
                      all_on: !this.props.group.state.all_on
                    },
                    action: {
                      on: !this.props.group.state.all_on
                    }
                  }
                )
              }}
            />
            <div className="slider"></div>
          </label>
          </small>
        </h3>
        <ChromePicker 
          disableAlpha={ true }
          color={{h: this.props.group.action.hue / HUE_SCALAR, s: this.props.group.action.sat / SAT_MAX, l: this.props.group.action.bri / BRI_MAX}}
          onChangeComplete={this.handleColorChangeComplete}
        />
        <div className="row">
          <LightsList getLights={false} visibleLights={this.props.group.lights} />
        </div>
      </div>
    );
  }
}

export default LightDetails;
