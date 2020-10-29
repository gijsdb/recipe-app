import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Title, SubTitle, Text } from '../styles/Text';
import { UnorderedList, HalfCol } from '../styles/PageLayout';
import { BtnBorder } from '../styles/Buttons';

const RecipeInfo = ({ isAuthenticated, recipe, user, error }) => {
  const history = useHistory();
  const [isOwnRecipe, setIsOwnRecipe] = useState(false);

  useEffect(() => {
    if (
      recipe.AddedBy._id === user._id ||
      recipe.AddedBy === user.id
    ) {
      setIsOwnRecipe(true);
    }
  }, [recipe.AddedBy, user._id, user.id]);

  const handleDelete = () => {
    const result = window.confirm('Are you sure you want to delete?');
    if (!result) return;
    console.log('deleting');
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Title color="#FFF">{recipe.Title}</Title>
          {isOwnRecipe ? (
            <BtnBorder
              color="red"
              borderColor="red"
              className="btnDeleteHover"
              onClick={handleDelete}
            >
              Delete Recipe
            </BtnBorder>
          ) : (
            <></>
          )}
          {recipe.IngredientList ? (
            <>
              <SubTitle color="#fff">Serves:</SubTitle>
              <Text>{recipe.IngredientList.Serves}</Text>
            </>
          ) : (
            <></>
          )}
          <SubTitle color="#FFF">Created at:</SubTitle>
          <Text margin="0">{recipe.createdAt.split('T')[0]}</Text>
          <RecipeMethodAndIngredients>
            <HalfCol margin="0em 1em 0em 0em">
              <SubTitle color="#FFF">Ingredients</SubTitle>
              {recipe.IngredientList ? (
                <UnorderedList
                  fontSize="1em"
                  color="#fff"
                  style={{ listStyleType: 'none' }}
                >
                  {recipe.IngredientList.List.map((x, index) => {
                    return (
                      <li key={index}>
                        <Text>
                          {x.amount} {x.measurement} {x.ingredient}
                        </Text>
                      </li>
                    );
                  })}
                </UnorderedList>
              ) : (
                <Text margin="5px 0px">No Ingredients</Text>
              )}
              {isOwnRecipe ? (
                <BtnBorder
                  color="white"
                  borderColor="white"
                  className="btnHomeHover"
                  onClick={() => {
                    history.push({
                      pathname: '/recipe/edit',
                      state: { altering: 'ingredients' },
                    });
                  }}
                >
                  Change Ingredients
                </BtnBorder>
              ) : (
                <></>
              )}
            </HalfCol>
            <HalfCol margin="0em 0em 0em 1em">
              <SubTitle color="#FFF">Method</SubTitle>
              {recipe.Method || recipe.length === 0 ? (
                <UnorderedList
                  fontSize="1em"
                  color="#fff"
                  style={{ listStyleType: 'none' }}
                >
                  {recipe.Method.Steps.map((x, index) => {
                    return (
                      <li key={index}>
                        <Text margin="5px 0px">
                          {index + 1} - {x}
                        </Text>
                      </li>
                    );
                  })}
                </UnorderedList>
              ) : (
                <Text margin="5px 0px">No method</Text>
              )}
              {isOwnRecipe ? (
                <BtnBorder
                  color="white"
                  borderColor="white"
                  className="btnHomeHover"
                  onClick={() => {
                    history.push({
                      pathname: '/recipe/edit',
                      state: { altering: 'method' },
                    });
                  }}
                >
                  Change Method
                </BtnBorder>
              ) : (
                <></>
              )}
            </HalfCol>
          </RecipeMethodAndIngredients>
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
    user: state.authReducer.user,
    error: state.errorReducer,
    recipe: state.recipeReducer.currentRecipe,
  };
}

export default connect(mapStateToProps, {})(RecipeInfo);

export const RecipeMethodAndIngredients = styled.div`
  display: flex;
`;
