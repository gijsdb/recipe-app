import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  HeaderContainer,
  RecipeContainer,
} from '../styles/Structure';
import { Header } from '../styles/Text';
import RecipeCard from '../components/RecipeCard';
import { RecipeSearch } from '../components/RecipeSearch';

const fetchData = async (token) => {
  const res = await fetch('http://localhost:8000/api/recipes/', {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  });
  const json = await res.json();
  return json;
};

const AllRecipes = ({ isAuthenticated, token }) => {
  const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    fetchData(token).then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  const results = !searchTerm
    ? recipes
    : recipes.filter((recipe) => recipe.Title.includes(searchTerm));

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <HeaderContainer>
            <Header>All recipes</Header>
            <Header>Total recipes: {recipes.length}</Header>
            <RecipeSearch
              onChange={handleSearchChange}
            ></RecipeSearch>
          </HeaderContainer>
          <RecipeContainer>
            {recipes.length > 0 ? (
              results.map((recipe, index) => {
                return (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                );
              })
            ) : (
              <Header>No recipes found!</Header>
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
    token: state.authReducer.token,
  };
}

export default connect(mapStateToProps)(AllRecipes);
