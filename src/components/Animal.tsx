import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMoreAnimal } from "../models/IAnimals";
import { StyledFeedButton } from "./styledComponents/StyledButtons";
import { StyledAnimalCont, StyledImgDiv } from "./styledComponents/StyledDivs";
import { StyledImage } from "./styledComponents/StyledImages";
import {
  StyledAnimalFeedP,
  StyledAnimalP,
  StyledFeedTime,
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
  const [hasBeenFed, setHasBeenFed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let params = useParams();

  useEffect(() => {
    const specificAnimal = localStorage.getItem("animals");
    if (specificAnimal) {
      const parsedSpecific: IMoreAnimal[] = JSON.parse(specificAnimal);
      // Loop through animal array.
      for (let i = 0; i < parsedSpecific.length; i++) {
        // if animal array id is the same as params.id.
        if (parsedSpecific[i].id == params.id) {
          console.log("Good");
          setAnimal(parsedSpecific[i]);
          return;
        } else {
          console.log("Bad");
        }
      }
    }
  }, []);

  useEffect(() => {
    const animalTime = localStorage.getItem("animals");
    if (animalTime) {
      const parseAnimalTime: IMoreAnimal[] = JSON.parse(animalTime);
      for (let i = 0; i < parseAnimalTime.length; i++) {
        if (parseAnimalTime[i].isFed) {
          const now = new Date();
          const timeFeed = parseInt(parseAnimalTime[i].lastFed);
          const timeNow = parseInt(now.toLocaleTimeString());

          const result = timeNow - timeFeed;
          if (result >= 3) {
            console.log('"3" hours');
            parseAnimalTime[i].isFed = false;
            parseAnimalTime[i].lastFed = "";
            localStorage.setItem("animals", JSON.stringify(parseAnimalTime));

            setAnimal(parseAnimalTime[i]);
            setHasBeenFed(false);
          }
          if (result >= 4) {
            console.log('"4" hours');
            setShowModal(true);
          }
        }
      }
    }
  }, []);

  const feedAnimal = () => {
    // Get animals from localStorage
    const animalStored = localStorage.getItem("animals");
    // If animals exist
    if (animalStored) {
      // Parse animals from JSON
      const parsedAnimal: IMoreAnimal[] = JSON.parse(animalStored);
      // Loop through animals
      for (let i = 0; i < parsedAnimal.length; i++) {
        const daDate = new Date();
        // If current animals.id === animal.id
        if (parsedAnimal[i].id === animal.id) {
          // Change boolean to true.
          parsedAnimal[i].isFed = !animal.isFed;
          parsedAnimal[i].lastFed = daDate.toLocaleTimeString();
          localStorage.setItem("animals", JSON.stringify(parsedAnimal));

          setAnimal(parsedAnimal[i]);
          setHasBeenFed(true);
        }
      }
    }
  };

  return (
    <StyledAnimalCont>
      {showModal && <StyledFeedTime>{animal.name} är hungrig!</StyledFeedTime>}
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
