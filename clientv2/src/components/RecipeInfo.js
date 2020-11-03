import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Text } from '../styles/Text';
import { Button } from '../styles/Input';

import { UnorderedList } from '../styles/Structure';

const RecipeInfo = ({ isAuthenticated, recipe, user }) => {
  const history = useHistory();
  const [isOwnRecipe, setIsOwnRecipe] = useState(false);
  const [methodInChunks, setMethodInChunks] = useState([]);
  const [ingredientsInChunks, setIngredientsInChunks] = useState([]);

  useEffect(() => {
    if (
      recipe.AddedBy._id === user._id ||
      recipe.AddedBy === user.id
    ) {
      setIsOwnRecipe(true);
    }
    if (recipe.Method) {
      const splitMethod = splitArray(recipe.Method.Steps);
      setMethodInChunks(splitMethod);
    }
    if (recipe.IngredientList) {
      const splitIngredients = splitArray(recipe.IngredientList.List);
      setIngredientsInChunks(splitIngredients);
    }
  }, [recipe.AddedBy, user._id, user.id, recipe]);

  const splitArray = (array) => {
    if (array.length < 10) {
      return [array];
    }

    let chunkSize = array.length / 2;
    chunkSize = Math.round(chunkSize);
    const groups = array
      .map((e, i) => {
        return i % chunkSize === 0
          ? array.slice(i, i + chunkSize)
          : null;
      })
      .filter((e) => {
        return e;
      });
    return groups;
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <MethodAndIngredients>
            <CollumnContainer>
              <CollumnHeader>
                <Header>Ingredients</Header>
                {isOwnRecipe ? (
                  <Button
                    onClick={() => {
                      history.push({
                        pathname: '/recipe/edit',
                        state: { altering: 'ingredients' },
                      });
                    }}
                  >
                    Change Ingredients
                  </Button>
                ) : (
                  <></>
                )}
              </CollumnHeader>
              {recipe.IngredientList ? (
                ingredientsInChunks.map((chunk) => {
                  return (
                    <UnorderedMethodList
                      fontSize="1em"
                      color="#fff"
                      style={{ listStyleType: 'none' }}
                    >
                      {chunk.map((x, index) => {
                        return (
                          <li key={index}>
                            <Text>
                              {x.amount} {x.measurement}{' '}
                              {x.ingredient}
                            </Text>
                          </li>
                        );
                      })}
                    </UnorderedMethodList>
                  );
                })
              ) : (
                <Text margin="5px 0px">No method</Text>
              )}
            </CollumnContainer>
            <CollumnContainer>
              <CollumnHeader>
                <Header>Method</Header>
                {isOwnRecipe ? (
                  <Button
                    onClick={() => {
                      history.push({
                        pathname: '/recipe/edit',
                        state: { altering: 'method' },
                      });
                    }}
                  >
                    Change Method
                  </Button>
                ) : (
                  <></>
                )}
              </CollumnHeader>
              {recipe.Method || !recipe.length === 0 ? (
                methodInChunks.map((chunk) => {
                  return (
                    <UnorderedMethodList
                      fontSize="1em"
                      color="#fff"
                      style={{ listStyleType: 'none' }}
                    >
                      {chunk.map((x, index) => {
                        return (
                          <li key={index}>
                            <Text>
                              {index + 1} - {x}
                            </Text>
                          </li>
                        );
                      })}
                    </UnorderedMethodList>
                  );
                })
              ) : (
                <Text margin="5px 0px">No method</Text>
              )}
            </CollumnContainer>
          </MethodAndIngredients>
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

export const MethodAndIngredients = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  @media (min-width: 800px) {
    width: 98vw;
  }
  @media (max-width: 600px) {
    text-align: start;
  }
  margin: 0em 1em;
`;

export const CollumnContainer = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  @media (max-width: 600px) {
    flex-basis: 100%;
  }
`;

export const CollumnHeader = styled.div`
  flex-basis: 100%;
  display: inline-block;
`;
export const UnorderedMethodList = styled(UnorderedList)`
  font-size: 1em;
  flex-basis: 50%;
  @media (max-width: 500px) {
    flex-basis: 100%;
  }
`;
