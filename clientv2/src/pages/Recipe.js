import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderContainer } from '../styles/Structure';
import { Header, Text } from '../styles/Text';
import { DeleteButton } from '../styles/Input';
import RecipeInfo from '../components/RecipeInfo';
import styled from 'styled-components';

const Recipe = ({ isAuthenticated, recipe, user }) => {
  const history = useHistory();
  const [recipeSelected, setRecipeSelected] = useState(false);
  const [isOwnRecipe, setIsOwnRecipe] = useState(false);

  useEffect(() => {
    if (recipe !== undefined) {
      setRecipeSelected(true);
    }
    if (
      recipe.AddedBy._id === user._id ||
      recipe.AddedBy === user.id
    ) {
      setIsOwnRecipe(true);
    }
  }, [recipe]);

  const handleDelete = () => {
    const result = window.confirm('Are you sure you want to delete?');
    if (!result) return;
    console.log('deleting');
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          {recipeSelected ? (
            <>
              <HeaderContainer>
                <RecipeHeader>
                  <strong>{recipe.Title}</strong>
                </RecipeHeader>
                <Text>
                  <strong>Created by: </strong>
                  {recipe.AddedBy.Name}
                </Text>
                {recipe.IngredientList ? (
                  <>
                    <Text>
                      <strong>Serves: </strong>
                      {recipe.IngredientList.Serves}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
                {isOwnRecipe ? (
                  <DeleteButton onClick={handleDelete}>
                    Delete Recipe
                  </DeleteButton>
                ) : (
                  <></>
                )}
              </HeaderContainer>
              <RecipeInfo></RecipeInfo>
            </>
          ) : (
            <Text>No recipe selected</Text>
          )}
        </>
      ) : (
        history.push('/')
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    recipe: state.recipeReducer.currentRecipe,
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps, {})(Recipe);

export const RecipeHeader = styled(Header)`
  font-size: 3em;
`;
