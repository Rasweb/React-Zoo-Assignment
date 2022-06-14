import styled from "styled-components";

export const StyledLists = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6%;
  @media screen and (min-width: 1024px) {
    margin: 0%;
  }
`;

export const StyledNavList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2%;
  font-size: 18px;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    font-size: 25px;
    margin: 1%;
  }
`;
