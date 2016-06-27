import React, { Component } from 'react';
import { Link } from 'react-router';
import GroupDetailsContainer from  '../containers/GroupDetailsContainer.js'

class GroupsList extends Component {
  componentWillMount() {
    this.props.getLightsAndGroups();
  }

  renderGroups(groups) {
    return Object.keys(groups).map((id) => {
      return (
        <GroupDetailsContainer key={id} id={id}/>
      );
    });
  }

  render() {
    const { groups, loading, error } = this.props.groupsList;

    if(loading) {
      return <div className="container"><h1>Groups</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Groups</h1>
        <div className="row">
          {this.renderGroups(groups)}
        </div>
      </div>
    );
  }
}

export default GroupsList;
