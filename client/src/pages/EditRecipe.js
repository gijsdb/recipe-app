import React ,{useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Container, CenterContent } from '../styles/PageLayout'
import { Title, SubTitle } from '../styles/Text'
import { BtnBorder } from '../styles/Buttons'
import Navigation from '../components/Navigation'
import { useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { UnorderedList } from '../styles/Text'


const EditMethod = ({recipe}) => {
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState([]);
  const stepInput = useRef(null);
  const handleChangeStep = (e) => setStep(e.target.value);
  console.log(recipe)
   
  async function handleClick () {
    if(step === '') {
      throw new Error('You must enter a step');
    }
    
    try {
      setSteps(steps.concat(step))
      stepInput.current.children[1].firstChild.value = ''
    } catch(e) {
      throw new Error(e.message)
    }
   
  }


  return (
    <>
    <Title color="#fff">Editing method</Title>
    <SubTitle color="#fff">Editing for: {recipe.Title}</SubTitle>
      <TextField 
        type="text"    
        placeholder="Enter Step"
        name="step"
        onChange={handleChangeStep}
        autoComplete="off"
        label="Enter Step" 
        variant="outlined"
        fullWidth={true}
        ref={stepInput}
      />
       <BtnBorder
          color="white"
          borderColor="white"
          className="btnHomeHover"
          fontSize="1em"
          marginTop="0.5em"
          onClick={handleClick}
       >Add
       </BtnBorder>
       {steps.length > 0 ? (
        <>
          <UnorderedList color="#fff" fontSize="1.5em">
            {steps.map((step, index) => {
              return(
                <li><p key={index}>{index + 1} - {step}</p></li>
              )
            })}
          </UnorderedList>

          <BtnBorder
          color="white"
          borderColor="white"
          className="btnHomeHover"
          fontSize="1em"
          marginTop="0.5em"
          >Confirm
          </BtnBorder>
        </>
        ) : 
          <></> 
       }
      
    </>
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
                  <EditMethod recipe={recipe}></EditMethod>
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