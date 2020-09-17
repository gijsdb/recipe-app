import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BtnBorder } from '../styles/Buttons';
import { connect } from "react-redux";
import { setCurrentRecipe } from '../redux/actions/recipeActions';

const RecipeCard  = ({
    recipe, 
    setCurrentRecipe
}) => {
    const history = useHistory();

    const viewRecipe = () => {
        setCurrentRecipe(recipe)
        history.push({
            pathname: '/recipe/',
        })
    }


      return(
        <RecipeCardDiv>
            <h1>{recipe.Title}</h1>
            <ul>
                <li><strong>Date created</strong> - {recipe.createdAt}</li>
                <li><strong>Created by</strong> - {recipe.AddedBy.Name}</li>
            </ul>
            <BtnBorder 
              onClick={viewRecipe}
              color="white"
              borderColor="white"
              className="btnHomeHover"
            >
              View Recipe
            </BtnBorder>
        </RecipeCardDiv>
      )
}

function mapStateToProps(state) { //redux mapping part
    return { 
     ...state
    }
  }
  

export default connect(mapStateToProps, {setCurrentRecipe})(RecipeCard) //redux connecting

export const RecipeCardDiv = styled.div`
  width: 20vw;
  padding: 1em 0em;
  color: #fff;
  margin: 10px 10px;
  border: #fff solid 2px;
  border-radius: 10px
`;

