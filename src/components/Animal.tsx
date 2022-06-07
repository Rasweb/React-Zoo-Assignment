import { IAnimals } from "../models/IAnimals";
import { StyledImage } from "./styledComponents/StyledImages";

interface IAnimal {
  animals: IAnimals;
}

export const Animal = (props: IAnimal) => {
  return (
    <li>
      <h2>{props.animals.name}</h2>
      <StyledImage src={props.animals.imageUrl} alt={props.animals.name} />
      <p>{props.animals.shortDescription}</p>
    </li>
  );
};
