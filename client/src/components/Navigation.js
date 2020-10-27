import React from 'react';
import styled from 'styled-components';
import { BtnBorder } from '../styles/Buttons';
import { logoutUser } from '../redux/actions/authActions';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

export const Navigation = ({ navigateTarget, logoutUser }) => {
  const history = useHistory();

  const logoutEvent = (e) => {
    logoutUser();
    history.push('/');
  };

  const navigateEvent = (navigateTarget) => {
    history.push('/' + navigateTarget);
  };

  return (
    <NavigationContainer>
      <BtnBorder
        onClick={logoutEvent}
        color="white"
        borderColor="white"
        className="btnHomeHover"
      >
        Logout
      </BtnBorder>

      <BtnBorder
        onClick={() => {
          navigateEvent(navigateTarget);
        }}
        color="white"
        borderColor="white"
        className="btnHomeHover"
        marginLeft="10px"
      >
        Back
      </BtnBorder>
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
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
`;
