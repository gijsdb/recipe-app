import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BtnBorder } from '../styles/Buttons';
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
      <h1>{recipe.Title}</h1>
      <RecipeCardDetails>
        <RecipeCardDetail>
          <strong>Created by</strong> <br /> {recipe.AddedBy.Name}
        </RecipeCardDetail>
      </RecipeCardDetails>
      <BtnBorder
        onClick={viewRecipe}
        color="white"
        borderColor="white"
        className="btnHomeHover"
      >
        View Recipe
      </BtnBorder>
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
  @media (min-width: 425px) {
    margin: 10px 10px;
    width: 10vw;
  }
`;

export const RecipeCardDetails = styled.ul`
  list-style: none;
  padding: 0;
`;

export const RecipeCardDetail = styled.li`
  padding: 2px 0px;
`;
