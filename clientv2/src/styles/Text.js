import styled from 'styled-components';

export const Title = styled.h1`
  color: #fff;
  font-size: 2em;
  font-weight: 800;

  @media (min-width: 600px) {
    font-size: 3em;
  }
`;

export const Header = styled.h1`
  color: #fff;
  font-size: 2em;
  font-weight: 600;

  @media (min-width: 600px) {
    font-size: 2.5em;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 1em;
  font-weight: 600;
`;

export const Text = styled.p`
  color: #fff;
  font-size: 1.25em;
`;
