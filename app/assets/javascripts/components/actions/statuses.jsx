import api from '../api';

import { deleteFromTimelines } from './timelines';

export const STATUS_FETCH_REQUEST = 'STATUS_FETCH_REQUEST';
export const STATUS_FETCH_SUCCESS = 'STATUS_FETCH_SUCCESS';
export const STATUS_FETCH_FAIL    = 'STATUS_FETCH_FAIL';

export const STATUS_DELETE_REQUEST = 'STATUS_DELETE_REQUEST';
export const STATUS_DELETE_SUCCESS = 'STATUS_DELETE_SUCCESS';
export const STATUS_DELETE_FAIL    = 'STATUS_DELETE_FAIL';

export const CONTEXT_FETCH_REQUEST = 'CONTEXT_FETCH_REQUEST';
export const CONTEXT_FETCH_SUCCESS = 'CONTEXT_FETCH_SUCCESS';
export const CONTEXT_FETCH_FAIL    = 'CONTEXT_FETCH_FAIL';

export function fetchStatusRequest(id) {
  return {
    type: STATUS_FETCH_REQUEST,
    id: id
  };
};

export function fetchStatus(id) {
  return (dispatch, getState) => {
    dispatch(fetchStatusRequest(id));

    api(getState).get(`/api/v1/statuses/${id}`).then(response => {
      dispatch(fetchStatusSuccess(response.data));
      dispatch(fetchContext(id));
    }).catch(error => {
      dispatch(fetchStatusFail(id, error));
    });
  };
};

export function fetchStatusSuccess(status, context) {
  return {
    type: STATUS_FETCH_SUCCESS,
    status: status,
    context: context
  };
};

export function fetchStatusFail(id, error) {
  return {
    type: STATUS_FETCH_FAIL,
    id: id,
    error: error
  };
};

export function deleteStatus(id) {
  return (dispatch, getState) => {
    dispatch(deleteStatusRequest(id));

    api(getState).delete(`/api/v1/statuses/${id}`).then(response => {
      dispatch(deleteStatusSuccess(id));
      dispatch(deleteFromTimelines(id));
    }).catch(error => {
      dispatch(deleteStatusFail(id, error));
    });
  };
};

export function deleteStatusRequest(id) {
  return {
    type: STATUS_DELETE_REQUEST,
    id: id
  };
};

export function deleteStatusSuccess(id) {
  return {
    type: STATUS_DELETE_SUCCESS,
    id: id
  };
};

export function deleteStatusFail(id, error) {
  return {
    type: STATUS_DELETE_FAIL,
    id: id,
    error: error
  };
};

export function fetchContext(id) {
  return (dispatch, getState) => {
    dispatch(fetchContextRequest(id));

    api(getState).get(`/api/v1/statuses/${id}/context`).then(response => {
      dispatch(fetchContextSuccess(id, response.data.ancestors, response.data.descendants));
    }).catch(error => {
      dispatch(fetchContextFail(id, error));
    });
  };
};

export function fetchContextRequest(id) {
  return {
    type: CONTEXT_FETCH_REQUEST,
    id
  };
};

export function fetchContextSuccess(id, ancestors, descendants) {
  return {
    type: CONTEXT_FETCH_SUCCESS,
    id,
    ancestors,
    descendants,
    statuses: ancestors.concat(descendants)
  };
};

export function fetchContextFail(id, error) {
  return {
    type: CONTEXT_FETCH_FAIL,
    id,
    error
  };
};
