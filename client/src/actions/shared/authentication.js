import { createAction } from 'redux-actions';
import { tokensAPI, meAPI } from '../../api';
import createApiAction from '../helpers/createApiAction';
import humps from 'humps';
import { ApiClient } from '../../api/client';

const notificationId = 'LOGIN_NOTIFICATION';
const actions = {
  START_LOGIN: 'START_LOGIN',
  START_LOGOUT: 'START_LOGOUT',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_LOGIN_ERROR: 'SET_AUTH_ERROR',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW'
};


function generateErrorPayload(status = 401) {
  const heading = 'Login Failed';
  let level;
  let body;
  switch (status) {
    case 502:
    case 500:
      level = 2;
      body = 'The server was unreachable, or unable to fulfill your request. If' +
        ' you are sure that you are online, perhaps there is a problem with the Manifold ' +
        'backend';
      break;
    default:
      level = 1;
      body = 'The username or password you entered is incorrect';
      break;
  }
  const payload = { id: notificationId, level, heading, body };
  return payload;
}

// I have some doubts about whether this is the best spot for this logic. Could be easier
// to trace if we had some authentication middleware that saw the token get set, then
// dispatched the other actions (set user, set auth token)
export function startLogin(email, password, scope = "signInUp") {
  return (dispatch, getStateIgnored) => {
    dispatch(createAction(actions.START_LOGIN)());
    const promise = tokensAPI.createToken(email, password);
    promise.then((response) => {
      const { authToken, user } = response;
      if (!authToken) {
        dispatch({ type: 'SET_AUTH_ERROR', payload: generateErrorPayload(500) });
        return;
      }
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 90);
      document.cookie = `authToken=${authToken};path=/;expires=${expireDate.toUTCString()}`;
      dispatch(createAction(actions.SET_CURRENT_USER)(user));
      dispatch(createAction(actions.SET_AUTH_TOKEN)(authToken));
    }, (response) => {
      dispatch({ type: 'SET_AUTH_ERROR', payload: generateErrorPayload(response.status) });
    });
  };
}

export const getCurrentUser = createAction(actions.GET_CURRENT_USER, (dispatch, getState) => {
  const client = new ApiClient;
  const token = getState().authentication.authToken;
  const { endpoint, method, options } = meAPI.show();
  options.authToken = token;
  const promise = client.call(endpoint, method, options);
  dispatch(createAction(actions.GET_CURRENT_USER)(promise));
});

export function startLogout() {
  document.cookie = 'authToken=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
  return dispatch => {
    dispatch(createAction(actions.START_LOGOUT)());
  };
}

export const follow = createAction(actions.FOLLOW);
export const unfollow = createAction(actions.UNFOLLOW);
export const setAuthToken = createAction(actions.SET_AUTH_TOKEN);

export default {
  follow,
  unfollow,
  startLogout,
  startLogin,
  getCurrentUser,
  setAuthToken
};
