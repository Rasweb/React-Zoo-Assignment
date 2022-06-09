import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimals } from "../models/IAnimals";
import { ShowAnimals } from "./ShowAnimals";
import { StyledUl } from "./styledComponents/StyledUls";

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimals[]>([]);

  useEffect(() => {
    // 1. Checks if animals exist in localStorage.
    // 2. If animals exist parse from JSON.
    // 3. Set the useState to the parsed value.
    let animalInLS = localStorage.getItem("animals");
    if (animalInLS) {
      let animalParse = JSON.parse(animalInLS);
      setAnimals(animalParse);
    }
  }, []);

  useEffect(() => {
    // 1. Checks if animals length is not 0.
    // 2. If animals length is 0 return.
    // 3. Uses axios to fetch data from api.
    // 4. Sets the response.data to the useState.
    // 5. Strigify response.data and sets it to LocalStorage.
    // 6. logs the response to the console.
    // 7. Catches the error and logs it.
    if (animals.length !== 0) return;
    axios
      .get<IAnimals[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        setAnimals(response.data);
        localStorage.setItem("animals", JSON.stringify(response.data));
        console.log("Good", response);
      })
      .catch((error) => {
        console.log("Bad", error);
      });
  });

  let animalsHtml = animals.map((animal) => {
    return <ShowAnimals animals={animal} key={animal.id} />;
  });

  return <StyledUl>{animalsHtml};</StyledUl>;
};
