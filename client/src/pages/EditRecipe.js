import React ,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Container, CenterContent } from '../styles/PageLayout'
import { Title } from '../styles/Text'
import { BtnBorder } from '../styles/Buttons'
import Navigation from '../components/Navigation'
import { useLocation } from "react-router-dom";


const EditMethod = ({}) => {

  return (
    <Title color="#fff">Editing method</Title>
  )

}

const EditIngredients = ({}) => {

  return (
    <Title color="#fff">Editing ingredients</Title>
  )

}


const EditRecipe = ({
  isAuthenticated,
  recipe,
  user,
  error,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [altering, setAltering] = useState('');

  useEffect(() => {
    if(location.state === undefined) return
    if(location.state.altering === 'ingredients') setAltering('ingredients')
    if(location.state.altering === 'method') setAltering('method')
  },[])

  return (
    <Container>
      {isAuthenticated ? (

        <>
            <Navigation navigateTarget="recipe"></Navigation>
           
              <CenterContent>
                {altering === 'ingredients' && 
                  <EditIngredients></EditIngredients>
                }
                {altering === 'method' && 
                  <EditMethod></EditMethod>
                }
                {location.state === undefined && 
                  <p>Please select what you want to edit on the recipe screen of your own recipe</p>
                }
              </CenterContent>
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

export default connect(mapStateToProps, {})(EditRecipe) //redux connecting