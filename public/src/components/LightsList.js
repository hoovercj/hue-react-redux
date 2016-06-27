import React, { Component } from 'react';
import { Link } from 'react-router';
import LightDetailsContainer from  '../containers/LightDetailsContainer.js'

class LightsList extends Component {
  componentWillMount() {
    if (this.props.getLights) {
      this.props.getLightsStart();
    }
  }

  renderLights(lights) {
    return Object.keys(lights).map((id) => {
      return (
        /* <LightDetailsContainer key={id} id={id}/> */
        <LightDetailsContainer key={id} id={id} light={lights[id]} />
      );
    });
  }

  render() {
    let { lights, loading, error } = this.props.lightsList;
    if (this.props.visibleLights) {
      let visibleLights = this.props.visibleLights.map((key) => {
        return lights[key];
      });
      lights = visibleLights;
    }

    if(loading) {
      return <div className="container"><h1>Lights</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Lights</h1>
        <div className="row">
          {this.renderLights(lights)}
        </div>
      </div>
    );
  }
}

export default LightsList;
