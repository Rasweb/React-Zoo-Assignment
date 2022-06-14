import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMoreAnimal } from "../models/IAnimals";
import { StyledFeedButton } from "./styledComponents/StyledButtons";
import { StyledAnimalCont, StyledImgDiv } from "./styledComponents/StyledDivs";
import { StyledImage } from "./styledComponents/StyledImages";
import {
  StyledAnimalFeedP,
  StyledAnimalP,
} from "./styledComponents/StyledParagraphs";

export const Animal = () => {
  const [animal, setAnimal] = useState<IMoreAnimal>({
    id: "",
    name: "",
    latinName: "",
    yearOfBirth: 0,
    imageUrl: "",
    longDescription: "",
    isFed: false,
    lastFed: "",
    medicine: "",
  });
  const [fedTime, setFedTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasBeenFed, setHasBeenFed] = useState(false);

  let params = useParams();

  useEffect(() => {
    const specificAnimal = localStorage.getItem("animals");
    if (specificAnimal) {
      const parsedSpecific: IMoreAnimal[] = JSON.parse(specificAnimal);

      // Loop through animal array.
      for (let i = 0; i < parsedSpecific.length; i++) {
        //  console.log(parsedSpecific[i].id);
        //  console.log(params.id);

        // if animal array id is the same as params.id.
        if (parsedSpecific[i].id == params.id) {
          // setAnimal with current animal.
          // console.log("Good");
          setAnimal(parsedSpecific[i]);
          // console.log(parsedSpecific[i], "The curent animal");

          return;
        } else {
          // console.log("Bad");
          // console.log(params.id, "Params");
          // console.log(parsedSpecific[i].id, "Specific ID");
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
    // .lastFed till ett date.object
    // date.now - lastFed i milisekunder
    // Sedan konvertera tillbaka tiden.
    const animalTime = localStorage.getItem("animals");
    if (animalTime) {
      const parseAnimalTime: IMoreAnimal[] = JSON.parse(animalTime);
      for (let i = 0; i < parseAnimalTime.length; i++) {
        if (parseAnimalTime[i].lastFed) {
          //   console.log(`${parseAnimalTime[i].lastFed} This is lastFed`);
          // Logs to console
          // console.log(
          //   `${currentTime.toLocaleTimeString()} This is currentTime`
          // );
          console.log("Good");
        } else {
          console.log("Bad");
        }

        // let timeLeft = Date.parse(parseAnimalTime[i].lastFed) - Date.now();
        // let timeLef =
        //   Date.parse(parseAnimalTime[i].lastFed) -
        //   Date.parse(currentTime.toLocaleTimeString());
        // // Logs to console
        // console.log(fedTime);

        // console.log(timeLeft, "hes");
        // console.log(timeLef);
      }
    }
  }, []);

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
          setHasBeenFed(true);
        }
      }
      console.log(parsedAnimal);
      console.log(fedTime.toLocaleTimeString());
    }
  };

  return (
    <StyledAnimalCont>
      <h2>
        {animal.name}, {animal.latinName}
      </h2>
      <StyledImgDiv>
        <StyledImage
          src={animal.imageUrl}
          alt={animal.name}
          onError={(e: ChangeEvent<HTMLImageElement>) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        ></StyledImage>
      </StyledImgDiv>
      <StyledAnimalP>Ålder: {animal.yearOfBirth}</StyledAnimalP>
      <StyledAnimalP>{animal.longDescription}</StyledAnimalP>

      {animal.medicine === "inga" ? (
        <StyledAnimalP>Ingen medicine</StyledAnimalP>
      ) : (
        <StyledAnimalP>medicine: {animal.medicine}</StyledAnimalP>
      )}
      {hasBeenFed || animal.isFed ? (
        <div>
          <StyledAnimalFeedP>{animal.name} är matad</StyledAnimalFeedP>
          <StyledAnimalFeedP>
            {animal.name} blev matad klockan: {animal.lastFed}
          </StyledAnimalFeedP>
          <StyledFeedButton disabled>
            {animal.name} har blivit matad
          </StyledFeedButton>
        </div>
      ) : (
        <div>
          <StyledAnimalFeedP>{animal.name} är inte matad</StyledAnimalFeedP>
          <StyledAnimalFeedP>
            {animal.name} har inte blivit matad förut
          </StyledAnimalFeedP>
          <StyledFeedButton onClick={feedAnimal}>
            Mata {animal.name}
          </StyledFeedButton>
        </div>
      )}
    </StyledAnimalCont>
  );
};
