import LightDetails from '../components/LightDetails.js';
import * as actionTypes from '../actionTypes/actionTypes';
import { setLightStateStart, setLightStateSuccess, setLightStateFailure } from '../actionCreators/lights'
import { connect } from 'react-redux';

function mapStateToProps(globalState, ownProps) {
  return { light: globalState.lights.lightsList.lights[ownProps.id], lightId: ownProps.id };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
     updateLight: (oldState, newState) => {
        dispatch(setLightStateStart(ownProps.id, newState))
         .then((data) => {
           !data.error ?
             dispatch(setLightStateSuccess()) :
             dispatch(setLightStateFailure(ownProps.id, oldState));
         });
     },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LightDetails);
