import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { registerUser } from '../redux/actions/authActions'
import { clearErrors } from '../redux/actions/errorActions';
import { Container, ContentHalf, ImageHalf, InputContainer } from '../styles/PageLayout'
import { BtnBorder } from '../styles/Buttons'
import { RegisterTitle } from '../styles/Text'
import TextField from '@material-ui/core/TextField';
import '../styles/hover.css'

const Register = ({
  registerUser,
  isAuthenticated,
  error,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  
  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

 const handleSubmit = (e) => {
    e.preventDefault() // stops default reloading behaviour
    try {
      const user = {
        email,
        name,
        password
      }
      registerUser(user);
      history.push('/')
    } catch(err) {
      console.log(err)
    }
 }

  return (
    <Container>

          <ImageHalf></ImageHalf>

          <ContentHalf>
            <RegisterTitle>Register</RegisterTitle>
            <form onSubmit={handleSubmit}>
              <InputContainer>
                <TextField
                  label="Email" 
                  type="email" 
                  name="email"
                  onChange={handleChangeEmail}
                  variant="outlined"
                  autoComplete="off"
                />
              </InputContainer>
              <InputContainer>
                <TextField
                  label="Name" 
                  type="text" 
                  name="name"
                  onChange={handleChangeName}
                  variant="outlined"
                  autoComplete="off"
                />
              </InputContainer>
              <InputContainer>
                <TextField
                  label="Password" 
                  type="password" 
                  placeholder="Password"
                  name="password"
                  onChange={handleChangePassword}
                  variant="outlined"
                  autoComplete="off"
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
    </Container>
  );
}

function mapStateToProps(state) { //redux mapping part
  return { 
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.error
  }
}

export default connect(mapStateToProps, { registerUser, clearErrors })(
  Register
);

