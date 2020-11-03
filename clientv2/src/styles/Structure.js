import styled from 'styled-components';

export const CenterContent = styled.div`
  align-self: center;
  flex-wrap: wrap;
  margin: 0 auto;
  text-align: center;
`;

export const ContentItem = styled.div`
  padding: 0.5em 0em;
`;

export const FullWidth = styled.div`
  width: 100vw;
  margin-right: 1em;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
  min-height: 100vh;
  text-align: center;
`;

export const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const HeaderContainer = styled.div`
  width: 100vw;
  padding: 8em 0em 0em 0em;
  @media (max-width: 600px) {
    padding: 6em 0em 0em 0em;
  }
`;

export const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em 0em;
`;
