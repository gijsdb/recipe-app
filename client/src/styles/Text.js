import styled from 'styled-components';

export const Title = styled.h1`
  color:  ${props => props.color};
  font-size: 3em;
  font-weight: 800;

`;

export const LoginTitle = styled(Title)`
  position: absolute;
  margin-bottom: 7em;
  color: #212121;
  font-weight: 600
`
export const RegisterTitle = styled(Title)`
  position: absolute;
  margin-bottom: 8em;
  color: #212121;
  font-weight: 600
`


export const SubTitle = styled.h2`
  color:  ${props => props.color};
  font-size: ${props => props.fontSize || '2.25em'};
  font-weight: ${props => props.fontWeight || '800'};
`;

export const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  font-size:  ${props => props.fontSize || '2em'};
  font-weight: 400;
  color: ${props => props.color};
`