import { connect } from 'react-redux'
import { getLightsStart, getLightsSuccess, getLightsFailure } from '../actionCreators/lights';

import LightsList from '../components/LightsList';


const mapStateToProps = (state) => {
  return { 
    lightsList: state.lights.lightsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLightsStart: () => {
      dispatch(getLightsStart()).then((response) => {
        !response.error ? 
          dispatch(getLightsSuccess(response.payload)) : 
          dispatch(getLightsFailure(response.payload));
      });
    }
  }
}

const LightsListContainer = connect(mapStateToProps, mapDispatchToProps)(LightsList)

export default LightsListContainer
