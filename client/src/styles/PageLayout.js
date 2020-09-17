import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: rgb(238,180,98);
  background: linear-gradient(170deg, rgba(238,180,98,1) 0%, rgba(238,180,98,1) 23%, rgba(205,118,114,1) 100%);
  padding: 0;
  display: flex;
`;

export const ContentHalf = styled.div`
  height: 100vh;
  width: 50vw;
  background-color: #fff;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    width: 100vw;
  }
`;

export const ImageHalf = styled.div`
  height: 100vh;
  width: 50vw;
  background-image: url("https://source.unsplash.com/random");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: white;
  padding: 0;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const InputContainer = styled.div`
  margin: 25px 0px;
`

export const CenterContent = styled.div`
  align-self: center;
  margin: 0 auto;
  text-align: center;
`

export const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5vw 5vw;
  max-height: 50vh;
  overflow-y: scroll;
`