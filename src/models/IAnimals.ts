export interface IAnimals {
  id: number;
  name: string;
  shortDescription: string;
  imageUrl: string;
  isFed: boolean;
  imageError?: "https://via.placeholder.com/150";
}

export interface IMoreAnimal {
  id: number;
  name: string;
  latinName: string;
  yearOfBirth: number;
  imageUrl: string;
  longDescription: string;
  isFed: boolean;
  lastFed: string;
  medicine: string;
}
