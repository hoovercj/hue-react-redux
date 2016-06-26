import * as actionTypes from '../actionTypes/actionTypes';
var update = require('react-addons-update');

const INITIAL_STATE = {
  lightsList: {lights: {}, error:null, loading: false}
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case actionTypes.GET_LIGHTS_START:// start fetching lights and set loading = true
  	return { ...state, lightsList: {lights:{}, error: null, loading: true} }; 
  case actionTypes.GET_LIGHTS_SUCCESS:// return list of lights and make loading = false
    return { ...state, lightsList: {lights: action.payload.data, error:null, loading: false} };
  case actionTypes.GET_LIGHTS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, lightsList: {lights: {}, error: error, loading: false} };

  case actionTypes.SET_LIGHT_STATE_START:
    return update(state, {lightsList: {lights: {[action.payload.id]: { state: { $merge: action.payload.newState }}}}});
    // The following is similar to the above line but for $set instead of $merge:
    // return {
    //   ...state,
    //   lightsList: {
    //     ...state.lightsList,
    //     lights: {
    //       ...state.lightsList.lights,
    //       [action.payload.id]: {
    //         ...state.lightsList.lights[action.payload.id],
    //         state: {
    //           ...state.lightsList.lights[action.payload.id].state,
    //           on: action.payload.on
    //         }
    //       }
    //     }
    //   }
    // };
  case actionTypes.SET_LIGHT_STATE_SUCCESS:
    return state;
  case actionTypes.SET_LIGHT_STATE_FAILURE:
    error = action.payload.error || {message: action.payload.message};
    return update(state, {lightsList: {error: error, lights: {[action.payload.id]: { state: { $merge: action.payload.oldState }}}}})
  default:
    return state;
  }
}
