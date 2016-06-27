import React, { Component, PropTypes } from 'react';
import { SliderPicker, ChromePicker } from 'react-color';

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
    this.props.updateLight(this.props.light.state, 
      {
        hue: Math.floor(color.hsl.h * HUE_SCALAR),
        sat: Math.floor(color.hsl.s * SAT_MAX),
        bri: Math.floor(color.hsl.l * BRI_MAX)
      });
  }

  render() {
    console.log(this.props);
    return (
      <div className="col-md-4">
        <h3>{this.props.light.name}
          <small>
          <label className="switch">
            <input type="checkbox"
              checked={this.props.light.state.on}
              onChange={() => {this.props.updateLight(this.props.light.state, {on: !this.props.light.state.on})}}
            />
            <div className="slider"></div>
          </label>
          </small>
        </h3>
        <ChromePicker 
          disableAlpha={ true }
          color={{h: this.props.light.state.hue / HUE_SCALAR, s: this.props.light.state.sat / SAT_MAX, l: this.props.light.state.bri / BRI_MAX}}
          onChangeComplete={this.handleColorChangeComplete}
        />
      </div>
    );
  }
}

export default LightDetails;
