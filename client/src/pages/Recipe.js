import React ,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Container, CenterContent } from '../styles/PageLayout'
import { Title } from '../styles/Text'
import { BtnBorder } from '../styles/Buttons'
import Navigation from '../components/Navigation'
import RecipeInfo from '../components/RecipeInfo'

const Recipe = ({
  isAuthenticated,
  recipe,
  user,
  error,
}) => {
  const history = useHistory();
  const [recipeSelected, setRecipeSelected] = useState(false);

  useEffect(() => {
    if(recipe !== undefined) {
      console.log(recipe)
      setRecipeSelected(true);
    }
  },[])


  return (
    <Container>
      {isAuthenticated ? (

        <>

          {recipeSelected ? (
            <>
            <Navigation navigateTarget="home"></Navigation>
           
              <CenterContent>
                <RecipeInfo></RecipeInfo>
              </CenterContent>
            </>
          ) :
            <p>No recipe selected</p>
          }

        </>

    ) : 
      history.push('/')
    }
    </Container>
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

export default connect(mapStateToProps, {})(Recipe) //redux connecting