import { combineReducers } from 'redux';
import LightsReducer from './reducer_lights';

const rootReducer = combineReducers({
  lights: LightsReducer, //<-- Lights
});

export default rootReducer;
