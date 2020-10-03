import React ,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { BtnBorder } from '../styles/Buttons'
import TextField from '@material-ui/core/TextField';
import { addRecipe } from '../redux/actions/recipeActions';


const AddRecipe  = ({
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
  const [AddedBy] = useState(user._id)
  const handleChangeRecipeTitle = (e) => setRecipeTitle(e.target.value);
 
  async function handleClick () {
      try {
        if(Title === '') {
          throw new Error('You must set a title');
        }

        const Recipe = {
          Title,
          AddedBy,
        }
        await addRecipe(Recipe);
        await Navigate();
      } catch(err) {
        throw err
      }
  }

  async function Navigate() {
    setTimeout(function() {
      history.push({
        pathname: '/recipe/',
      })
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
                 setShowTitleInput(true)
                 setShowButton(false)
               }}
              >Add Recipe
              </BtnBorder>
             ) :
              <></>
            }
              
                {showTitleInput ? (
                  <>
                    <TextField 
                      type="text" 
                      placeholder="Recipe Title"
                      name="recipeTitle"
                      autoComplete="off"
                      label="Recipe Title" 
                      variant="outlined"
                      onChange={handleChangeRecipeTitle}
                    />
                    <BtnBorder
                      color="white"
                      borderColor="white"
                      className="btnHomeHover"
                      fontSize="0.5em"
                      marginLeft="0.5em"
                      onClick={() => handleClick()}
                    >Next
                    </BtnBorder>
                  </>
                ) : 
                  <></>                  
                }
            </div>    
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

export default connect(mapStateToProps, { addRecipe })(AddRecipe);