import styled from 'styled-components';

export const TextBox = styled.input`
  padding: 12px;
  font-size: 17px;
  text-align: center;
  border-width: 2px;
  border-radius: 9px;
  border-style: solid;
  border-color: #ffffff;
  background-color: transparent;
  color: #ffffff;
  margin: 20px;
  width: ${(props) => props.width || 'auto'};
  display: ${(props) => props.display};
  transition: 0.1s;

  @media (max-width: 600px) {
    margin: 5px;
  }

  &:focus {
    transition: 0.1s;
    border-width: 5px;
  }
`;

export const Button = styled.button`
  font-size: 1em;
  border-radius: 15px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  padding: 1em 1em;
  transition: 0.5s;
  height: '100%';
  margin: ${(props) => props.margin || '10px auto'};

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    color: rgb(238, 180, 98);
    background-color: #fff;
  }
`;

export const DeleteButton = styled(Button)`
  color: red;
  border: 2px solid red;
  &:hover {
    color: #fff;
    background-color: red;
  }
`;

export const HomeButton = styled(Button)`
  font-size: 2em;
  width: 10em;
  padding: 1em 1em;
  @media (max-width: 400px) {
    padding: 0.5em 1em;
  }
`;

export const NavButton = styled(Button)`
  margin: 43px auto;
  width: 8em;
  @media (max-width: 600px) {
    width: auto;
    margin: 20px auto;
    padding: 1em 1em;
  }
`;

export const Select = styled.select`
  padding: 12px;
  font-size: 17px;
  text-align: center;
  border-width: 2px;
  border-radius: 9px;
  border-style: solid;
  border-color: #ffffff;
  background-color: transparent;
  color: #ffffff;
  margin-left: 0.5em;
  width: ${(props) => props.width || 'auto'};

  @media (max-width: 600px) {
    width: 30%;
    margin: 5px;
  }
`;

export const TextBoxLabel = styled.label`
  color: #fff;
  font-size: 1.25em;
  display: block;
`;
