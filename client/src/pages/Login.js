import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import {
  Container,
  ContentHalf,
  ImageHalf,
  InputContainer,
} from '../styles/PageLayout';
import { LoginTitle } from '../styles/Text';
import { BtnBorder } from '../styles/Buttons';
import TextField from '@material-ui/core/TextField';
import '../styles/hover.css';

const Login = ({ loginUser, isAuthenticated, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    try {
      const user = {
        email,
        password,
      };
      await loginUser(user);
      // very naughty
      setTimeout(function () {
        history.push('/home');
      }, 1000);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return (
    <Container>
      {!isAuthenticated ? (
        <>
          <ImageHalf></ImageHalf>

          <ContentHalf>
            <LoginTitle>Login</LoginTitle>
            <form
              style={{ margin: '0 auto' }}
              onSubmit={handleSubmit}
            >
              <InputContainer>
                <TextField
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChangeEmail}
                  autoComplete="off"
                  label="Email"
                  variant="outlined"
                />
              </InputContainer>
              <InputContainer>
                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChangePassword}
                  autoComplete="off"
                  label="Password"
                  variant="outlined"
                />
              </InputContainer>
              <BtnBorder
                className="btnAuthHover"
                type="submit"
                color="green"
                borderColor="green"
              >
                Submit
              </BtnBorder>
            </form>
          </ContentHalf>
        </>
      ) : (
        history.push('/home')
      )}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.error,
  };
}

export default connect(mapStateToProps, { loginUser, clearErrors })(
  Login,
);
