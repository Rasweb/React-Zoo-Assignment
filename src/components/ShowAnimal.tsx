import { IAnimal } from "../models/IAnimals";
import { StyledImage } from "./styledComponents/StyledImages";

interface IShowAnimal {
  animals: IAnimal;
}

export const ShowAnimal = (props: IShowAnimal) => {
  return (
    <li>
      <h2>{props.animals.name}</h2>
      <StyledImage src={props.animals.imageUrl} alt={props.animals.name} />
      <p>{props.animals.shortDescription}</p>
    </li>
  );
};
