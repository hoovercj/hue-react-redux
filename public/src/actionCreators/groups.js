import axios from 'axios';

import * as actionTypes from '../actionTypes/actionTypes';

const ROOT_URL = 'http://192.168.0.5/api/7p5rXcsTIbsHHlq1S3JJkVssEXYd2jKyVgN5bbBj';
const GROUPS_URL = `${ROOT_URL}/groups`;

// ACTION GROUP: GET GROUPS
export function getGroupsStart() {
  const request = axios({
    method: 'get',
    url: GROUPS_URL,
    headers: []
  });

  return {
    type: actionTypes.GET_GROUPS_START,
    payload: request
  };
}

export function getGroupsSuccess(groups) {
  return {
    type: actionTypes.GET_GROUPS_SUCCESS,
    payload: groups
  };
}

export function getGroupsFailure(error) {
  return {
    type: actionTypes.GET_GROUPS_FAILURE,
    payload: error
  };
}

export function setGroupStateStart(id, state) {
  const request = axios.put(`${GROUPS_URL}/${id}/action`, state.action).then(() => {
    return { id: id, newState: state};
  });
  return {
    type: actionTypes.SET_GROUP_STATE_START,
    payload: request
  };
}

export function setGroupStateSuccess() {
  return {
    type: actionTypes.SET_GROUP_STATE_SUCCESS,
    payload: null
  };
}

export function setGroupStateFailure(error, id, state) {
  return {
    type: actionTypes.SET_GROUP_STATE_FAILURE,
    payload: {error: error, id: id, oldState: state}
  };
}
