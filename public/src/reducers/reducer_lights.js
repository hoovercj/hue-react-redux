import * as actionTypes from '../actionTypes/actionTypes';
var update = require('react-addons-update');

const INITIAL_STATE = {
  lightsList: {lights: {}, error:null, loading: false},
  groupsList: {groups: {}, error:null, loading: false}
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
    return update(state, {lightsList: {lights: {[action.payload.id]: { state: { $merge: action.payload.newState || {} }}}}});
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
    return update(state, {lightsList: {error: error, lights: {[action.payload.id]: { state: { $merge: action.payload.oldState || {} }}}}})

  case actionTypes.GET_GROUPS_START:// start fetching groups and set loading = true
  	return { ...state, groupsList: {groups:{}, error: null, loading: true} }; 
  case actionTypes.GET_GROUPS_SUCCESS:// return list of groups and make loading = false
    return { ...state, groupsList: {groups: action.payload.data, error:null, loading: false} };
  case actionTypes.GET_GROUPS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, groupsList: {groups: {}, error: error, loading: false} };

  case actionTypes.SET_GROUP_STATE_START:
    let updatedGroups = update(state.groupsList.groups, 
      {
        [action.payload.id]: { 
          action: { $merge: action.payload.newState.action || {}},
          state: { $merge: action.payload.newState.state || {} }
        }
      }
    );

    let updatedLights = {};
    state.groupsList.groups[action.payload.id].lights.forEach((id) => {
      updatedLights[id] = update(state.lightsList.lights[id], 
        {
          state: { $merge: action.payload.newState.action || {} }
        }
      )
    });

    return { ...state, 
             groupsList: {
               error: null, loading:false, groups: {
                 ...state.groupsList.groups, ...updatedGroups
               }
             },
             lightsList: {
               error: null, loading:false, lights: { 
                 ...state.lightsList.lights, ...updatedLights 
               }
             }
           }
  case actionTypes.SET_GROUP_STATE_SUCCESS:
    return state;
  case actionTypes.SET_GROUP_STATE_FAILURE:
    // TODO: ripple changes down to lights -- model after above 
    //       OR extract into a function?
    error = action.payload.error || {message: action.payload.message};
    return update(state,
      {
        groupsList: 
          {
            error: error,
            groups: {
              [action.payload.id]: {
                action: { $merge: action.payload.oldState.action || {} },
                state: { $merge: action.payload.oldState.state || {} }
              }
            }
          }
        }
      );

  default:
    return state;
  }
}
