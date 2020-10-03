import React ,{useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Container, CenterContent } from '../styles/PageLayout'
import { Title, SubTitle } from '../styles/Text'
import { BtnBorder } from '../styles/Buttons'
import Navigation from '../components/Navigation'
import { useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { UnorderedList } from '../styles/Text';
import { AiOutlineDelete } from 'react-icons/ai';
import {IngredientInput} from '../components/IngredientInput';
import {setIngredients, setMethod} from '../redux/actions/recipeActions';

const EditMethod = ({recipe, setMethod}) => {
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState([]);
  const stepInput = useRef(null);
  const handleChangeStep = (e) => setStep(e.target.value);
  
  const handleAddStep = () => {
    if(step === '') {
      alert('Please enter a step')
      throw new Error('You must enter a step');
    }
    
    try {
      setSteps(steps.concat(step))
      stepInput.current.children[1].firstChild.value = ''
    } catch(e) {
      throw new Error(e.message)
    }
  }

  document.body.onkeydown = function(e) {
    if (e.key == 'Enter') {
      handleAddStep();
    }
  };

  async function handleConfirm () {
    console.log('Send method to server with recipe id', recipe._id)
    await setMethod(steps, recipe._id)
  }

  const handleDeleteStep = (index) => {
    var stepsCopy = [...steps];

    if (index !== -1) {
      stepsCopy.splice(index, 1);
    }
    setSteps(stepsCopy);
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
          onClick={handleAddStep}
       >Add
       </BtnBorder>
       {steps.length > 0 ? (
        <>
          <UnorderedList color="#fff" fontSize="1.5em">
            {steps.map((step, index) => {
              return(
                <li key={index}><p>{index + 1} - {step} <AiOutlineDelete className="methodDeleteHover" onClick={() => handleDeleteStep(index)}/></p></li>
              )
            })}
          </UnorderedList>

          <BtnBorder
          color="white"
          borderColor="white"
          className="btnHomeHover"
          fontSize="1em"
          marginTop="0.5em"
          onClick={handleConfirm}
          >Confirm
          </BtnBorder>
        </>
        ) : 
          <></> 
       }
      
    </>
  )

}

const EditIngredients = ({recipe, setIngredients}) => {
  const [ingredientsList, setIngredientsList] = useState([]);

  const addIngredient = (newIngredient) => {
    setIngredientsList(ingredientsList.concat(newIngredient));
  }

  const handleDeleteIngredient = (index) => {
    var ingredientsCopy = [...ingredientsList];

    if (index !== -1) {
      ingredientsCopy.splice(index, 1);
    }

    setIngredientsList(ingredientsCopy)
  }

  async function handleConfirm () {
    console.log('Send ingredients list to server with recipe id', recipe._id)
    setIngredients(ingredientsList)
  }


  return (
    <>
      <Title color="#fff">Editing ingredients</Title>
      <SubTitle color="#fff">Editing for: {recipe.Title}</SubTitle>

      <IngredientInput onSubmit={addIngredient}></IngredientInput>
      {ingredientsList.length > 0 ? (
        <>
          <UnorderedList color="#fff" fontSize="1.5em">
            {ingredientsList.map((ingredient, index) => {
              
              return(
                <li key={index}><p>{ingredient.amount} {ingredient.measurement} {ingredient.ingredient} <AiOutlineDelete className="methodDeleteHover" onClick={() => handleDeleteIngredient(index)}/></p></li>
              )
            })}
          </UnorderedList>

          <BtnBorder
          color="white"
          borderColor="white"
          className="btnHomeHover"
          fontSize="1em"
          marginTop="0.5em"
          onClick={handleConfirm}
          >Confirm
          </BtnBorder>
        </>
        ) : 
          <></> 
       }
    </>
  )

}


const EditRecipe = ({
  setMethod,
  setIngredients,
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
                  <EditIngredients  setIngredients={setIngredients} recipe={recipe}></EditIngredients>
                }
                {altering === 'method' && 
                  <EditMethod setMethod={setMethod} recipe={recipe}></EditMethod>
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

export default connect(mapStateToProps, {setMethod, setIngredients})(EditRecipe) //redux connecting