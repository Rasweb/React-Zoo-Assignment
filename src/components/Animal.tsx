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
    lastFed: "",
    medicine: "",
  });
  const [fedAnimal, setFedAnimal] = useState(false);
  const [fedTime, setFedTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasBeenFed, setHasBeenFed] = useState(false);

  let params = useParams();

  useEffect(() => {
    // Checks if animal exist
    // if (!animal) return;
    // if animal dosen't exist
    // Fetch data with axios
    // axios
    //   .get<IMoreAnimal>(
    //     "https://animals.azurewebsites.net/api/animals/" + params.id
    //   )
    //   // If response
    //   .then((data) => {
    //     // Change value of setAnimal to data.data
    //     setAnimal(data.data);
    //   })
    //   // If error
    //   .catch((error) => {
    //     // Console.log the error
    //     console.log("bad", error);
    //   });

    const specificAnimal = localStorage.getItem("animals");
    if (specificAnimal) {
      const parsedSpecific = JSON.parse(specificAnimal);

      for (let i = 0; i < parsedSpecific.length; i++) {
        if (parsedSpecific[i].id === params.id) {
          setAnimal(parsedSpecific);
          console.log(parsedSpecific[i]);
        } else {
          console.log("Bad");
          console.log(params.id, "Params");
          console.log(animal.id, "Specific ID");
        }
      }
    }
  }, []);

  useEffect(() => {
    // Check time every 1 second.
    const currentDate = setInterval(() => setCurrentTime(new Date()), 10000);
    let timer = setInterval(() => setFedTime(new Date()), 1000);
    // To restart the time process and avoid memory leaks
    return function cleanup() {
      clearInterval(timer);
      clearInterval(currentDate);
    };
  });

  useEffect(() => {
    const animalTime = localStorage.getItem("animals");
    if (animalTime) {
      const parseAnimalTime = JSON.parse(animalTime);
      console.log(parseAnimalTime);

      for (let i = 0; i < parseAnimalTime.length; i++) {
        if (parseAnimalTime[i].lastFed === animal.lastFed)
          console.log(`${parseAnimalTime[i].lastFed} This is lastFed`);
        console.log(`${currentTime.toLocaleTimeString()} This is currentTime`);

        let timeLeft = Date.parse(parseAnimalTime[i].lastFed) - Date.now();
        let timeLef =
          Date.parse(parseAnimalTime[i].lastFed) -
          Date.parse(currentTime.toLocaleTimeString());
        console.log(fedTime);

        console.log(timeLeft, "hes");
        console.log(timeLef);
      }
    }
  }, []);

  // useEffect(() => {
  //   const animalStored = localStorage.getItem("animals");
  //   // If animals exist
  //   if (animalStored) {
  //     // Parse animals from JSON
  //     const parsedAnimal = JSON.parse(animalStored);
  //     // Loop through animals
  //     for (let i = 0; i < parsedAnimal.length; i++) {
  //       // If current animals.id === animal.id
  //       if (parsedAnimal[i].isFed === true) {
  //         // Change boolean to true.
  //         setFedAnimal(true);
  //         setHasBeenFed(true);
  //       } else {
  //         setFedAnimal(false);
  //         setHasBeenFed(false);
  //       }
  //     }
  //     console.log(parsedAnimal);
  //     console.log(fedTime.toLocaleTimeString());
  //   }
  // });

  const feedAnimal = () => {
    // Get animals from localStorage
    const animalStored = localStorage.getItem("animals");
    // If animals exist
    if (animalStored) {
      // Parse animals from JSON
      const parsedAnimal = JSON.parse(animalStored);
      // Loop through animals
      for (let i = 0; i < parsedAnimal.length; i++) {
        // If current animals.id === animal.id
        if (parsedAnimal[i].id === animal.id) {
          // Change boolean to true.
          parsedAnimal[i].isFed = !animal.isFed;
          parsedAnimal[i].lastFed = fedTime.toLocaleTimeString();
          localStorage.setItem("animals", JSON.stringify(parsedAnimal));
          setFedAnimal(true);
          setHasBeenFed(true);
        }
      }
      console.log(parsedAnimal);
      console.log(fedTime.toLocaleTimeString());
    }
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
