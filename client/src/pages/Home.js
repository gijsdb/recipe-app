import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import { Container, CenterContent } from '../styles/PageLayout';
import { UnorderedList } from '../styles/Text';
import { Title, SubTitle } from '../styles/Text';
import { BtnBorder } from '../styles/Buttons';
import { AiFillGithub } from 'react-icons/ai';
import AddRecipe from '../components/AddRecipe';

import '../styles/padding.css';

const Home = ({ user, logoutUser, isAuthenticated, error }) => {
  const history = useHistory();

  const logoutEvent = (e) => {
    logoutUser();
    history.push('/');
  };

  return (
    <Container>
      {isAuthenticated ? (
        <>
          <CenterContent>
            <Title color="#fff">Hello {user.Name}</Title>
            <UnorderedList>
              <li className="listItemPadding">
                <AddRecipe></AddRecipe>
              </li>
              <li className="listItemPadding">
                <BtnBorder
                  color="white"
                  borderColor="white"
                  className="btnHomeHover"
                  onClick={() => {
                    history.push('/myrecipes');
                  }}
                >
                  Your Recipes
                </BtnBorder>
              </li>
              <li className="listItemPadding">
                <BtnBorder
                  color="white"
                  borderColor="white"
                  className="btnHomeHover"
                  onClick={() => {
                    history.push('/allrecipes');
                  }}
                >
                  All Recipes
                </BtnBorder>
              </li>
            </UnorderedList>
            <BtnBorder
              onClick={logoutEvent}
              color="white"
              borderColor="white"
              className="btnHomeHover"
            >
              Logout
            </BtnBorder>
            <div>
              <SubTitle fontSize="2em" color="#fff">
                <AiFillGithub></AiFillGithub>
              </SubTitle>
            </div>
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
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.error,
  };
}

export default connect(mapStateToProps, { logoutUser })(Home);
