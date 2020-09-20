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
    if(recipe.AddedBy._id === user._id) {
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
                    <h1>Ingredients</h1>
                    <ul>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                    </ul>
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
                    <h1>Method</h1>
                    <ul>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                        <li>3 Tsp salt</li>
                    </ul>
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