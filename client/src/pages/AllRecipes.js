import React ,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Container, CenterContent, RecipeContainer } from '../styles/PageLayout';
import { Title, SubTitle } from '../styles/Text';
import  RecipeCard  from '../components/RecipeCard';
import Navigation from '../components/Navigation';
import { RecipeSearch } from '../components/RecipeSearch';


const fetchData = async (token) => {
    const res = await fetch('http://localhost:8000/api/recipes/', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
      })
    const json = await res.json()
    return json
}

const AllRecipes = ({
  isAuthenticated,
  user,
  token,
  error,
}) => {
  const history = useHistory();
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    fetchData(token).then(recipes => {
      setRecipes(recipes);
    });
  }, [])

  const results = !searchTerm ? recipes : recipes.filter(recipe => recipe.Title.includes(searchTerm));

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  return (
    <Container>
      {isAuthenticated ? (
        <>
        <Navigation navigateTarget="home"></Navigation>
        <CenterContent>
            <Title color="#FFF">All Recipes</Title>
            <SubTitle color="#FFF">Total recipes: {recipes.length}</SubTitle>
            <RecipeSearch onChange={handleSearchChange}></RecipeSearch>
            <RecipeContainer>

              {recipes.length > 0 ? (
                results.map((recipe, index) => {    
                  return(
                    <RecipeCard key={recipe._id}
                      recipe={recipe}
                    />
                  )})
              ) : (
                <SubTitle color="#FFF">No recipes found!</SubTitle>
              )}
            </RecipeContainer>
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
    token: state.authReducer.token,
    error: state.errorReducer,  }
}

export default connect(mapStateToProps, {})(AllRecipes) //redux connecting