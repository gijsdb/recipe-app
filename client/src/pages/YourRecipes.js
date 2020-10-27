import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  CenterContent,
  RecipeContainer,
} from '../styles/PageLayout';
import { Title, SubTitle } from '../styles/Text';
import { retrieveMyRecipes } from '../redux/actions/recipeActions';
import RecipeCard from '../components/RecipeCard';
import Navigation from '../components/Navigation';
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
    (async function anyNameFunction() {
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
    <Container>
      {isAuthenticated ? (
        <>
          <Navigation navigateTarget="home"></Navigation>
          <CenterContent>
            <Title color="#FFF">Your recipes!</Title>
            <SubTitle color="#FFF">
              Total recipes: {userRecipes.length}
            </SubTitle>
            <RecipeSearch
              onChange={handleSearchChange}
            ></RecipeSearch>
            <RecipeContainer>
              {userRecipes.length > 0 ? (
                results.map((recipe, index) => {
                  return (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                  );
                })
              ) : (
                <SubTitle color="#FFF">
                  You have not created any recipes!
                </SubTitle>
              )}
            </RecipeContainer>
          </CenterContent>
        </>
      ) : (
        history.push('/')
      )}
    </Container>
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
