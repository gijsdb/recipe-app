import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import { CenterContent, ContentItem } from '../styles/Structure';
import { TextBox, Button } from '../styles/Input';
import { Header, ErrorText, Text } from '../styles/Text';

const Login = ({ loginUser, isAuthenticated, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      await loginUser(user);
      history.push('/home');
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return (
    <>
      {!isAuthenticated ? (
        <>
          <CenterContent>
            <ContentItem>
              <Header>Login</Header>
              <ErrorText>{error}</ErrorText>
            </ContentItem>
            <ContentItem>
              <form onSubmit={handleSubmit}>
                <TextBox
                  placeholder="Email"
                  type="email"
                  display="block"
                  onChange={handleChangeEmail}
                ></TextBox>
                <TextBox
                  placeholder="Password"
                  type="password"
                  display="block"
                  onChange={handleChangePassword}
                ></TextBox>
                <Button type="submit">Login</Button>
              </form>
            </ContentItem>
            <Text>
              Not registered?{' '}
              <Link to="/register">Register here</Link>
            </Text>
          </CenterContent>
        </>
      ) : (
        history.push('/home')
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.errorReducer.msg.message,
  };
}

export default connect(mapStateToProps, { loginUser, clearErrors })(
  Login,
);
