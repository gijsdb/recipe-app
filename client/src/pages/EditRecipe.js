import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, CenterContent } from '../styles/PageLayout';
import { Title, SubTitle, Text } from '../styles/Text';
import { BtnBorder } from '../styles/Buttons';
import Navigation from '../components/Navigation';
import { useLocation } from 'react-router-dom';
import { TextBox } from '../styles/Input';
import { UnorderedList } from '../styles/PageLayout';
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
      <Title color="#fff">Editing method for {recipe.Title}</Title>
      <TextBox
        type="text"
        placeholder="Enter Step"
        name="step"
        onChange={handleChangeStep}
        autoComplete="off"
        onKeyPress={handleEnterKey}
        width="30vw"
        margin="1em"
        ref={stepInput}
      />
      <BtnBorder
        color="white"
        borderColor="white"
        className="btnHomeHover"
        fontSize="1em"
        marginTop="0.5em"
        onClick={handleAddStep}
      >
        Add
      </BtnBorder>
      {steps.length > 0 ? (
        <>
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

          <BtnBorder
            color="white"
            borderColor="white"
            className="btnHomeHover"
            fontSize="1em"
            marginTop="0.5em"
            onClick={handleConfirm}
          >
            Confirm
          </BtnBorder>
        </>
      ) : (
        <>
          <p>No steps</p>
          <BtnBorder
            color="white"
            borderColor="white"
            className="btnHomeHover"
            fontSize="1em"
            marginTop="0.5em"
            onClick={handleConfirm}
          >
            Confirm
          </BtnBorder>
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
      <Title color="#fff">
        Editing ingredients for {recipe.Title}
      </Title>
      <ServesContainer>
        <SubTitle display="inline" color="#fff">
          Serves:{' '}
        </SubTitle>
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

      <IngredientContainer>
        {/* <HalfCol> */}
        <IngredientInput onSubmit={addIngredient}></IngredientInput>
        {/* </HalfCol> */}
        {/* <HalfCol margin="0em 1em;"> */}
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

            <BtnBorder
              color="white"
              borderColor="white"
              className="btnHomeHover"
              fontSize="1em"
              marginTop="0.5em"
              onClick={handleConfirm}
            >
              Confirm
            </BtnBorder>
          </>
        ) : (
          <>
            <Text margin="30px 0px">No ingredients</Text>
            <BtnBorder
              color="white"
              borderColor="white"
              className="btnHomeHover"
              fontSize="1em"
              marginTop="0.5em"
              onClick={handleConfirm}
            >
              Confirm
            </BtnBorder>
          </>
        )}
        {/* </HalfCol> */}
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
    <Container>
      {isAuthenticated ? (
        <>
          <Navigation navigateTarget="recipe"></Navigation>

          <CenterContent>
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
                Please select what you want to edit on the recipe
                screen of your own recipe
              </p>
            )}
          </CenterContent>
        </>
      ) : (
        history.push('/')
      )}
    </Container>
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
