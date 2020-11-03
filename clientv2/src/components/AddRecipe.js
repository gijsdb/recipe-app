import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextBox, Button, HomeButton } from '../styles/Input';
import { addRecipe } from '../redux/actions/recipeActions';

const AddRecipe = ({ addRecipe, isAuthenticated, user }) => {
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
    history.push({
      pathname: '/recipe/',
    });
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <div>
            {showButton ? (
              <HomeButton
                onClick={() => {
                  setShowTitleInput(true);
                  setShowButton(false);
                }}
              >
                Add Recipe
              </HomeButton>
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
                  onKeyPress={handleEnterKey}
                  onChange={handleChangeRecipeTitle}
                />
                <Button onClick={() => handleClick()}>Next</Button>
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
    recipe: state.recipeReducer.currentRecipe,
  };
}

export default connect(mapStateToProps, { addRecipe })(AddRecipe);
