import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { CenterContent, UnorderedList } from '../styles/Structure';
import { Header } from '../styles/Text';
import { HomeButton } from '../styles/Input';
import { AiFillGithub } from 'react-icons/ai';
import AddRecipe from '../components/AddRecipe';

const Home = ({ user, isAuthenticated, error }) => {
  const history = useHistory();

  return (
    <>
      {isAuthenticated ? (
        <>
          <CenterContent>
            <Header>Hello {user.Name}</Header>
            <UnorderedList>
              <li>
                <AddRecipe></AddRecipe>
              </li>
              <li>
                <HomeButton
                  color="white"
                  borderColor="white"
                  className="btnHomeHover"
                  onClick={() => {
                    history.push('/myrecipes');
                  }}
                >
                  Your Recipes
                </HomeButton>
              </li>
              <li>
                <HomeButton
                  color="white"
                  borderColor="white"
                  className="btnHomeHover"
                  onClick={() => {
                    history.push('/allrecipes');
                  }}
                >
                  All Recipes
                </HomeButton>
              </li>
            </UnorderedList>
            <div>
              <Header fontSize="2em" color="#fff">
                <AiFillGithub></AiFillGithub>
              </Header>
            </div>
          </CenterContent>
        </>
      ) : (
        history.push('/')
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Home);
