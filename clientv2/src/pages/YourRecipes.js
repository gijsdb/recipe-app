import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  RecipeContainer,
  HeaderContainer,
} from '../styles/Structure';
import { Header } from '../styles/Text';
import { retrieveMyRecipes } from '../redux/actions/recipeActions';
import RecipeCard from '../components/RecipeCard';
import { RecipeSearch } from '../components/RecipeSearch';

const YourRecipes = ({
  retrieveMyRecipes,
  isAuthenticated,
  userRecipes,
  user,
  error,
}) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    (async function fn() {
      await retrieveMyRecipes(user._id);
    })();
  }, []);

  const results = !searchTerm
    ? userRecipes
    : userRecipes.filter((recipe) =>
        recipe.Title.includes(searchTerm),
      );

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <HeaderContainer>
            <Header color="#FFF">Your recipes!</Header>
            <Header color="#FFF">
              Total recipes: {userRecipes.length}
            </Header>
            <RecipeSearch
              onChange={handleSearchChange}
            ></RecipeSearch>
          </HeaderContainer>
          <RecipeContainer>
            {userRecipes.length > 0 ? (
              results.map((recipe, index) => {
                return (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                );
              })
            ) : (
              <Header color="#FFF">
                You have not created any recipes!
              </Header>
            )}
          </RecipeContainer>
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
    userRecipes: state.recipeReducer.userRecipes,
  };
}

export default connect(mapStateToProps, { retrieveMyRecipes })(
  YourRecipes,
);
