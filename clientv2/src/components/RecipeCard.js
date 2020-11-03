import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../styles/Input';
import { Header } from '../styles/Text';
import { connect } from 'react-redux';
import { setCurrentRecipe } from '../redux/actions/recipeActions';

const RecipeCard = ({ recipe, setCurrentRecipe }) => {
  const history = useHistory();

  const viewRecipe = () => {
    setCurrentRecipe(recipe);
    history.push({
      pathname: '/recipe/',
    });
  };

  return (
    <RecipeCardDiv>
      <Header>{recipe.Title}</Header>
      <RecipeCardDetails>
        <RecipeCardDetail>
          <strong>Created by</strong> <br /> {recipe.AddedBy.Name}
        </RecipeCardDetail>
      </RecipeCardDetails>
      <RecipeCardBtn onClick={viewRecipe}>View Recipe</RecipeCardBtn>
    </RecipeCardDiv>
  );
};

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps, { setCurrentRecipe })(
  RecipeCard,
);

export const RecipeCardDiv = styled.div`
  padding: 1em 1em;
  color: #fff;
  margin: 10px auto;
  border: #fff solid 2px;
  border-radius: 10px;
  width: 20vw;
  @media (max-width: 800px) {
    width: 100%;
    margin: 10px 10px;
  }
`;

export const RecipeCardBtn = styled(Button)`
  height: 4em;
`;

export const RecipeCardDetails = styled.ul`
  list-style: none;
  padding: 0;
`;

export const RecipeCardDetail = styled.li`
  padding: 2px 0px;
`;
