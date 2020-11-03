import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_RECIPE,
  CLEAR_ERRORS,
} from './types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get('http://localhost:8000/api/user/auth', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const registerUser = ({ email, name, password }) => (
  dispatch,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, name, password });
  axios
    .post('http://localhost:8000/api/user/register', body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      }),
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'REGISTER_FAIL',
        ),
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const loginUser = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  axios
    .post('http://localhost:8000/api/user/login', body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      }),
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'LOGIN_FAIL',
        ),
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_RECIPE,
  });
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  dispatch({
    type: CLEAR_ERRORS,
  });
  // return {
  //   type: LOGOUT_SUCCESS
  // };
};

export const tokenConfig = (getState) => {
  const token = getState().authReducer.token;
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
