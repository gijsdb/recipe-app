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
  margin: ${(props) => props.margin || 'none'};
  width: ${(props) => props.width || 'auto'};
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
`;

export const TextBoxLabel = styled.label`
  color: #fff;
  font-size: 1.25em;
  display: block;
`;
