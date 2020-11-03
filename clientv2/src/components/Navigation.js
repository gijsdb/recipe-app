import React from 'react';
import styled from 'styled-components';
import { Title } from '../styles/Text';
import { NavButton } from '../styles/Input';
import { logoutUser } from '../redux/actions/authActions';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Navigation = ({
  navigateTarget,
  isAuthenticated,
  logoutUser,
}) => {
  const history = useHistory();

  const logoutEvent = (e) => {
    logoutUser();
    history.push('/');
  };

  const navigateEvent = (navigateTarget) => {
    if (window.location.pathname === '/home') {
      return;
    }
    history.goBack();
  };

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <Title>Recipe App</Title>
      ) : (
        <>
          <NavButton onClick={navigateEvent}>Back</NavButton>

          <Link to="/">
            <Title>Recipe App </Title>
          </Link>

          <NavButton onClick={logoutEvent}>Logout</NavButton>
        </>
      )}
    </NavigationContainer>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    error: state.errorReducer,
  };
}

export default connect(mapStateToProps, { logoutUser })(Navigation);

export const NavigationContainer = styled.div`
  width: 100vw;
  padding: 1em 0em;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  display: flex;
  justify-content: center;
`;
