import React ,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Container } from '../styles/PageLayout'
import { Title, SubTitle } from '../styles/Text'
import styled from 'styled-components';
import { BtnBorder } from '../styles/Buttons'


const RecipeInfo = ({
  isAuthenticated,
  recipe,
  user,
  error,
}) => {
  const history = useHistory();
  const [isOwnRecipe, setIsOwnRecipe] = useState(false);
 
  useEffect(() => {
    if(recipe.AddedBy._id === user._id || recipe.AddedBy === user.id) {
      setIsOwnRecipe(true);
    }
  },[])



  return (
    <>
      {isAuthenticated ? (

        <>
            <Title color="#FFF">
                {recipe.Title}
            </Title>
            <SubTitle color="#FFF">
                {/* Added by: {recipe.AddedBy.Name} */}
                {/* {console.log(recipe.AddedBy)} */}
            </SubTitle>
            <SubTitle color="#FFF">
                Created at: {recipe.createdAt}
            </SubTitle>
            <RecipeMethodAndIngredients>
                <HalfCol>
                    <SubTitle color="#FFF">Ingredients</SubTitle>
                    {recipe.IngredientList ? (
                    <ul style={{listStyleType: 'none'}}>
                        {recipe.IngredientList.List.map((x, index) => {
                          return <li key={index}>{x.amount} {x.measurement} {x.ingredient}</li>;
                        })}
                    </ul>
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
                        state: {altering: 'ingredients'}
                      })
                     }}
                    >Change Ingredients
                    </BtnBorder>
                    ) :
                    <></>
                    }
                </HalfCol>
                <HalfCol>
                  <SubTitle color="#FFF">Method</SubTitle>
                  {recipe.Method ? (
                    <ul style={{listStyleType: 'none'}}>
                        {recipe.Method.Steps.map((x, index) => {
                          return <li key={index}>{index + 1} - {x}</li>;
                        })}
                    </ul>
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
                        state: {altering: 'method'}
                      })
                     }}
                    >Change Method
                    </BtnBorder>
                    ) :
                    <></>
                    }
                </HalfCol>
            </RecipeMethodAndIngredients>
        </>

    ) : 
      history.push('/')
    }
    </>
  );
}

function mapStateToProps(state) { //redux mapping part
  return { 
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    error: state.errorReducer,
    recipe: state.recipeReducer.currentRecipe
  }
}

export default connect(mapStateToProps, {})(RecipeInfo) //redux connecting


export const RecipeMethodAndIngredients = styled.div`
  display: flex
`;
export const HalfCol = styled.div`
  width: 50%;
`;