import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimals } from "../models/IAnimals";
import { ShowAnimals } from "./ShowAnimals";
import { StyledUl } from "./styledComponents/StyledUls";

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimals[]>([]);

  useEffect(() => {
    if (animals.length !== 0) return;
    axios
      .get<IAnimals[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        setAnimals(response.data);
        console.log(response.data);

        localStorage.setItem("animals", JSON.stringify(response.data));

        let value = JSON.parse(localStorage.getItem("animal") || "{}");

        console.log(`The new list:  ${value}`);
        console.log(value.id);
      });
  });

  let animalsHtml = animals.map((animal) => {
    //    return <Animal animals={animal} key={animal.id} />;
    return <ShowAnimals animals={animal} key={animal.id} />;
  });

  return <StyledUl>{animalsHtml};</StyledUl>;
};
