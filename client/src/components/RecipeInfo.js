import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from '../styles/PageLayout';
import { Title, SubTitle, UnorderedList } from '../styles/Text';
import styled from 'styled-components';
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
  }, []);

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
            <SubTitle color="#fff">
              Serves: {recipe.IngredientList.Serves}
            </SubTitle>
          ) : (
            <></>
          )}
          <SubTitle color="#FFF">
            Created at: {recipe.createdAt}
          </SubTitle>
          <RecipeMethodAndIngredients>
            <HalfCol>
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
                        {x.amount} {x.measurement} {x.ingredient}
                      </li>
                    );
                  })}
                </UnorderedList>
              ) : (
                <p>No ingredients</p>
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
            <HalfCol>
              <SubTitle color="#FFF">Method</SubTitle>
              {recipe.Method ? (
                <UnorderedList
                  fontSize="1em"
                  color="#fff"
                  style={{ listStyleType: 'none' }}
                >
                  {recipe.Method.Steps.map((x, index) => {
                    return (
                      <li key={index}>
                        {index + 1} - {x}
                      </li>
                    );
                  })}
                </UnorderedList>
              ) : (
                <p>No method</p>
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
export const HalfCol = styled.div`
  width: 50%;
`;
