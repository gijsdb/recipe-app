import {
  CREATE_RECIPE,
  // ADD_METHOD,
  // ADD_INGREDIENTS,
  SET_CURRENT_RECIPE,
  SET_USER_RECIPES,
  CLEAR_RECIPE,
} from '../actions/types';
const initialState = {
  currentRecipeId: '',
  userRecipes: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_RECIPE:
    case CREATE_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case CLEAR_RECIPE:
      return {
        ...state,
        currentRecipe: 0,
      };
    case SET_USER_RECIPES:
      return {
        ...state,
        userRecipes: action.payload,
      };
    default:
      return state;
  }
}
