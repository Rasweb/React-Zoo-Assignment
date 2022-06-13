import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimals } from "../models/IAnimals";
import { ShowAnimals } from "./ShowAnimals";
import { StyledUl } from "./styledComponents/StyledUls";

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimals[]>([]);

  useEffect(() => {
    // Checks if animals exist in localStorage
    let animalInLS = localStorage.getItem("animals");
    // If animals exist
    if (animalInLS) {
      // Parse animals
      let animalParse = JSON.parse(animalInLS);
      // Change setAnimals value to animalParse
      setAnimals(animalParse);
    }
  }, []);

  useEffect(() => {
    // Checks if animals is in localstorage
    const storedData = localStorage.getItem("animals");
    // If animals is not in localStorage
    if (!storedData) {
      // Fetch data with axios
      axios
        .get<IAnimals[]>("https://animals.azurewebsites.net/api/animals")
        // If response
        .then((response) => {
          // Set animals with response.data
          setAnimals(response.data);
          // Set localStorage with response.data
          localStorage.setItem("animals", JSON.stringify(response.data));
          // Console.log the response
          console.log("Good", response);
        })
        // If error
        .catch((error) => {
          // Console.log the error
          console.log("Bad", error);
        });
    }
  });

  let animalsHtml = animals.map((animal) => {
    return <ShowAnimals animals={animal} key={animal.id} />;
  });

  return (
    <>
      <StyledUl>{animalsHtml}</StyledUl>
    </>
  );
};
