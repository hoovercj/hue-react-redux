import axios from 'axios';

import * as actionTypes from '../actionTypes/actionTypes';

const ROOT_URL = 'http://192.168.0.5/api/7p5rXcsTIbsHHlq1S3JJkVssEXYd2jKyVgN5bbBj';
const LIGHTS_URL = `${ROOT_URL}/lights`;

// ACTION GROUP: GET LIGHTS
export function getLightsStart() {
  const request = axios({
    method: 'get',
    url: LIGHTS_URL,
    headers: []
  });

  return {
    type: actionTypes.GET_LIGHTS_START,
    payload: request
  };
}

export function getLightsSuccess(lights) {
  return {
    type: actionTypes.GET_LIGHTS_SUCCESS,
    payload: lights
  };
}

export function getLightsFailure(error) {
  return {
    type: actionTypes.GET_LIGHTS_FAILURE,
    payload: error
  };
}

export function setLightStateStart(id, state) {
  const request = axios.put(`${LIGHTS_URL}/${id}/state`, state).then(() => {
    return { id: id, newState: state};
  });
  return {
    type: actionTypes.SET_LIGHT_STATE_START,
    payload: request
  };
}

export function setLightStateSuccess() {
  return {
    type: actionTypes.SET_LIGHT_STATE_SUCCESS,
    payload: null
  };
}

export function setLightStateFailure(error, id, state) {
  return {
    type: actionTypes.SET_LIGHT_STATE_FAILURE,
    payload: {error: error, id: id, oldState: state}
  };
}
