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
  const [fedAnimal, setFedAnimal] = useState(false);
  const [fedTime, setFedTime] = useState(new Date());
  const [hasBeenFed, setHasBeenFed] = useState(false);

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

  useEffect(() => {
    // Check time every 1 second.
    let timer = setInterval(() => setFedTime(new Date()), 1000);
    // To restart the time process and avoid memory leaks
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const feedAnimal = () => {
    setFedAnimal(true);
    setHasBeenFed(true);
    console.log("Animal is fed");
    console.log(fedTime.toLocaleTimeString());
  };

  return (
    <div>
      <h3>
        {animal.name}, {animal.latinName}
      </h3>
      <StyledImage src={animal.imageUrl} alt={animal.name}></StyledImage>
      <p>Ålder: {animal.yearOfBirth}</p>
      <p>{animal.longDescription}</p>

      {animal.medicine === "inga" ? (
        <p>Ingen medicine</p>
      ) : (
        <p>medicine: {animal.medicine}</p>
      )}
      {fedAnimal ? (
        <p>{animal.name} är matad</p>
      ) : (
        <p>{animal.name} är inte matad</p>
      )}
      {hasBeenFed ? (
        <p>
          {animal.name} blev matad klockan:
          {fedTime.toLocaleTimeString()}
        </p>
      ) : (
        <p>{animal.name} har inte blivit matad förut</p>
      )}
      {fedAnimal ? (
        <button disabled>{animal.name} har blivit matad</button>
      ) : (
        <button onClick={feedAnimal}>Mata {animal.name}</button>
      )}
    </div>
  );
};
