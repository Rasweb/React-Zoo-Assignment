import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMoreAnimal } from "../models/IAnimals";
import { StyledImage } from "./styledComponents/StyledImages";

export const Animal = () => {
  const [animal, setAnimal] = useState<IMoreAnimal>({
    id: 0,
    name: "",
    latinName: "",
    yearOfBirth: 0,
    imageUrl: "",
    longDescription: "",
    isFed: false,
    lasFed: "",
    medicine: "",
  });

  let params = useParams();

  useEffect(() => {
    if (Animal.length !== 0) return;
    axios
      .get<IMoreAnimal>(
        "https://animals.azurewebsites.net/api/animals/" + params.id
      )
      .then((data) => {
        setAnimal(data.data);
      });
  });

  return (
    <div>
      <h3>
        {animal.name}, {animal.latinName}
      </h3>
      <StyledImage src={animal.imageUrl} alt={animal.name}></StyledImage>
      <p>{animal.yearOfBirth}</p>
      <p>{animal.longDescription}</p>

      {animal.medicine === "inga" ? (
        <p>Ingen medicine</p>
      ) : (
        <p>{animal.medicine}</p>
      )}
      <p>Last fed: {animal.lasFed}</p>
      <p>Is fed: {animal.isFed}</p>
    </div>
  );
};
