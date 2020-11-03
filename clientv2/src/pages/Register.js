import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import { CenterContent, ContentItem } from '../styles/Structure';
import { TextBox, Button } from '../styles/Input';
import { Header, ErrorText, Text } from '../styles/Text';

const Register = ({ registerUser, isAuthenticated, error }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || name === '' || password === '') {
      return;
    }
    try {
      const user = {
        email,
        name,
        password,
      };
      registerUser(user);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <CenterContent>
            <ContentItem>
              <Header>Register</Header>
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
                  placeholder="Name"
                  type="text"
                  onChange={handleChangeName}
                  autoComplete="off"
                />
                <TextBox
                  placeholder="Password"
                  type="password"
                  display="block"
                  onChange={handleChangePassword}
                ></TextBox>
                <Button type="submit">Register</Button>
              </form>
            </ContentItem>
            <Text>
              <Link to="/">Return to login</Link>
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
    error: state.errorReducer.msg.error,
  };
}

export default connect(mapStateToProps, {
  registerUser,
  clearErrors,
})(Register);
