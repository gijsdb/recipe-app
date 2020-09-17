import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  CREATE_RECIPE,
  SET_USER_RECIPES,
  SET_CURRENT_RECIPE
} from './types';

export const addRecipe = ({Title, AddedBy}) => (dispatch, getState) => {
  const token = getState().authReducer.token;

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
    };
    
    const body = JSON.stringify({ Title, AddedBy });
      axios
        .post('http://localhost:8000/api/recipes/add', body, config)
        .then(res => 
          dispatch({
            type: CREATE_RECIPE,
            payload: res.data
          }))
        .catch(err => {
          dispatch(
            returnErrors(err, err, 'LOGIN_FAIL')
          );
    });
}

export const retrieveMyRecipes = (AddedBy) => (dispatch, getState) => {
  const token = getState().authReducer.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token
    }
  };

  const body = JSON.stringify({AddedBy});
      axios
        .post('http://localhost:8000/api/recipes/created',body, config)
        .then(res =>
          dispatch({
            type: SET_USER_RECIPES,
            payload: res.data
          })
        )
        .catch(err => {
          console.log('error', err)
    });
}

export const setCurrentRecipe = (recipe) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_RECIPE,
    payload: recipe
  })
}