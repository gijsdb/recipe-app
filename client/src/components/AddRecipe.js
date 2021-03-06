import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { BtnBorder } from '../styles/Buttons';
import { TextBox } from '../styles/Input';
import { addRecipe } from '../redux/actions/recipeActions';

const AddRecipe = ({
  addRecipe,
  isAuthenticated,
  user,
  recipe,
  error,
}) => {
  const history = useHistory();
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [Title, setRecipeTitle] = useState('');
  const [AddedBy] = useState(user._id);
  const handleChangeRecipeTitle = (e) =>
    setRecipeTitle(e.target.value);

  async function handleClick() {
    try {
      if (Title === '') {
        alert('You must set a title');
        return;
      }

      const Recipe = {
        Title,
        AddedBy,
      };
      await addRecipe(Recipe);
      await Navigate();
    } catch (err) {
      throw err;
    }
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  async function Navigate() {
    setTimeout(function () {
      history.push({
        pathname: '/recipe/',
      });
    }, 500);
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <div>
            {showButton ? (
              <BtnBorder
                color="white"
                borderColor="white"
                className="btnHomeHover"
                onClick={() => {
                  setShowTitleInput(true);
                  setShowButton(false);
                }}
              >
                Add Recipe
              </BtnBorder>
            ) : (
              <></>
            )}

            {showTitleInput ? (
              <>
                <TextBox
                  type="text"
                  placeholder="Recipe Title"
                  name="recipeTitle"
                  autoComplete="off"
                  label="Recipe Title"
                  onKeyPress={handleEnterKey}
                  onChange={handleChangeRecipeTitle}
                />
                <BtnBorder
                  color="white"
                  borderColor="white"
                  className="btnHomeHover"
                  fontSize="0.5em"
                  marginLeft="0.5em"
                  onClick={() => handleClick()}
                >
                  Next
                </BtnBorder>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        history.push('/')
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    error: state.errorReducer,
    recipe: state.recipeReducer.currentRecipe,
  };
}

export default connect(mapStateToProps, { addRecipe })(AddRecipe);
