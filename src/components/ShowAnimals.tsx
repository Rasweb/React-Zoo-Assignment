import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { IAnimals } from "../models/IAnimals";
import { StyledMoreButton } from "./styledComponents/StyledButtons";
import { StyledImgDiv } from "./styledComponents/StyledDivs";
import { StyledImage } from "./styledComponents/StyledImages";
import { StyledLists } from "./styledComponents/StyledLists";
import { StyledParagraphs } from "./styledComponents/StyledParagraphs";

interface IShowAnimals {
  animals: IAnimals;
}

export const ShowAnimals = (props: IShowAnimals) => {
  return (
    <StyledLists>
      <h2>{props.animals.name}</h2>
      <StyledImgDiv>
        <StyledImage
          src={props.animals.imageUrl}
          alt={props.animals.name}
          onError={(e: ChangeEvent<HTMLImageElement>) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
      </StyledImgDiv>
      <StyledParagraphs>{props.animals.shortDescription}</StyledParagraphs>
      <Link to={`/animals/${props.animals.id}`}>
        <StyledMoreButton>Läs Mer</StyledMoreButton>
      </Link>
    </StyledLists>
  );
};
