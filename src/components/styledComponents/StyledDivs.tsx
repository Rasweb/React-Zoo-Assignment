import styled from "styled-components";

export const StyledImgDiv = styled.div`
  width: 150px;
  height: 150px;
  @media screen and (min-width: 1024px) {
    width: 300px;
    height: 250px;
  }
`;

export const StyledAnimalCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
