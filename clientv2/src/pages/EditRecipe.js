import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Title, Header, Text } from '../styles/Text';
import { Button, TextBox } from '../styles/Input';
import {
  UnorderedList,
  HeaderContainer,
  FullWidth,
} from '../styles/Structure';
import { AiOutlineDelete } from 'react-icons/ai';
import { IngredientInput } from '../components/IngredientInput';
import {
  setIngredients,
  setMethod,
} from '../redux/actions/recipeActions';
import styled from 'styled-components';

const EditMethod = ({ recipe, setMethod }) => {
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState([]);
  const history = useHistory();
  const stepInput = useRef(null);
  const handleChangeStep = (e) => setStep(e.target.value);

  useEffect(() => {
    if (recipe.Method) {
      setSteps(recipe.Method.Steps);
    }
  }, [recipe.Method]);

  const handleAddStep = () => {
    if (step === '') {
      alert('Please enter a step');
      throw new Error('You must enter a step');
    }

    try {
      setSteps(steps.concat(step));
      stepInput.current.value = '';
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleAddStep();
    }
  };

  async function handleConfirm() {
    const success = await setMethod(steps, recipe._id);
    if (success) {
      history.push('/recipe');
    }
  }

  const handleDeleteStep = (index) => {
    var stepsCopy = [...steps];
    if (index !== -1) {
      stepsCopy.splice(index, 1);
    }
    setSteps(stepsCopy);
  };

  return (
    <>
      <HeaderContainer>
        <Title>{recipe.Title}</Title>
        <Header>Editing Method</Header>
      </HeaderContainer>
      <FullWidth>
        <TextBox
          type="text"
          placeholder="Enter Step"
          name="step"
          onChange={handleChangeStep}
          autoComplete="off"
          onKeyPress={handleEnterKey}
          ref={stepInput}
        />
        <Button onClick={handleAddStep}>Add</Button>
      </FullWidth>

      {steps.length > 0 ? (
        <>
          <FullWidth>
            <UnorderedList color="#fff" fontSize="1.5em">
              {steps.map((step, index) => {
                return (
                  <li key={index}>
                    <p>
                      {index + 1} - {step}{' '}
                      <AiOutlineDelete
                        className="methodDeleteHover"
                        onClick={() => handleDeleteStep(index)}
                      />
                    </p>
                  </li>
                );
              })}
            </UnorderedList>
          </FullWidth>
          <FullWidth>
            <Button onClick={handleConfirm}> Confirm</Button>
          </FullWidth>
        </>
      ) : (
        <>
          <p>No steps</p>
          <Button onClick={handleConfirm}>Confirm</Button>
        </>
      )}
    </>
  );
};

const EditIngredients = ({ recipe, setIngredients }) => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [serves, setServes] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (recipe.IngredientList) {
      setIngredientsList(recipe.IngredientList.List);
      setServes(recipe.IngredientList.Serves);
    }
  }, [recipe.IngredientList]);

  const addIngredient = (newIngredient) => {
    setIngredientsList(ingredientsList.concat(newIngredient));
  };

  const handleChangeServes = (e) => {
    setServes(e.target.value);
  };

  const handleDeleteIngredient = (index) => {
    var ingredientsCopy = [...ingredientsList];

    if (index !== -1) {
      ingredientsCopy.splice(index, 1);
    }

    setIngredientsList(ingredientsCopy);
  };

  async function handleConfirm() {
    const recipeId = recipe._id;
    const lcserves = serves;
    if (lcserves === '') {
      alert(
        'Please set an amount of servings for this ingredients list',
      );
      return;
    }
    const success = setIngredients(ingredientsList, recipeId, serves);
    if (success) {
      history.push('/recipe');
    }
  }

  return (
    <>
      <HeaderContainer>
        <Title>{recipe.Title}</Title>
        <Header>Editing Ingredients</Header>
        <ServesContainer>
          <Header>Serves: </Header>
          <TextBox
            type="number"
            name="serves"
            onChange={handleChangeServes}
            autoComplete="off"
            label="Serves"
            value={serves}
            width="3em"
          />
        </ServesContainer>
      </HeaderContainer>

      <IngredientContainer>
        <IngredientInput onSubmit={addIngredient}></IngredientInput>

        {ingredientsList.length > 0 ? (
          <>
            <UnorderedList color="#fff" fontSize="1.5em" padding="">
              {ingredientsList.map((ingredient, index) => {
                return (
                  <li key={index}>
                    <p>
                      {ingredient.amount} {ingredient.measurement}{' '}
                      {ingredient.ingredient}{' '}
                      <AiOutlineDelete
                        className="methodDeleteHover"
                        onClick={() => handleDeleteIngredient(index)}
                      />
                    </p>
                  </li>
                );
              })}
            </UnorderedList>

            <Button onClick={handleConfirm}>Confirm</Button>
          </>
        ) : (
          <>
            <Text margin="30px 0px">No ingredients</Text>
            <Button onClick={handleConfirm}>Confirm</Button>
          </>
        )}
      </IngredientContainer>
    </>
  );
};

export const IngredientContainer = styled.div`
  display: inline;
`;
export const ServesContainer = styled.div`
  padding-bottom: 3em;
  border-bottom: 1px solid #fff;
`;

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
    if (location.state === undefined) return;
    if (location.state.altering === 'ingredients')
      setAltering('ingredients');
    if (location.state.altering === 'method') setAltering('method');
  }, [location.state]);

  return (
    <>
      {isAuthenticated ? (
        <>
          {altering === 'ingredients' && (
            <EditIngredients
              setIngredients={setIngredients}
              recipe={recipe}
            ></EditIngredients>
          )}
          {altering === 'method' && (
            <EditMethod
              setMethod={setMethod}
              recipe={recipe}
            ></EditMethod>
          )}
          {location.state === undefined && (
            <p>
              Please select what you want to edit on the recipe screen
              of your own recipe
            </p>
          )}
        </>
      ) : (
        history.push('/')
      )}
    </>
  );
};

function mapStateToProps(state) {
  //redux mapping part
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    error: state.errorReducer,
    recipe: state.recipeReducer.currentRecipe,
  };
}

export default connect(mapStateToProps, {
  setMethod,
  setIngredients,
})(EditRecipe); //redux connecting
