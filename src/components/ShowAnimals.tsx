import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { IAnimals } from "../models/IAnimals";
import { StyledImage } from "./styledComponents/StyledImages";

interface IShowAnimals {
  animals: IAnimals;
}

export const ShowAnimals = (props: IShowAnimals) => {
  return (
    <li>
      <h3>{props.animals.name}</h3>
      <StyledImage
        src={props.animals.imageUrl}
        alt={props.animals.name}
        onError={(e: ChangeEvent<HTMLImageElement>) => {
          e.target.src = "https://via.placeholder.com/150";
        }}
      />
      <p>{props.animals.shortDescription}</p>
      <Link to={`/animals/${props.animals.id}`}>
        <button>Läs Mer</button>
      </Link>
    </li>
  );
};
