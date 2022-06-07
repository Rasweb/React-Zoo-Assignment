export interface IAnimals {
  id: number;
  name: string;
  shortDescription: string;
  imageUrl: string;
}

export interface IMoreAnimal {
  id: number;
  name: string;
  latinName: string;
  yearOfBirth: number;
  imageUrl: string;
  longDescription: string;
  isFed: boolean;
  lasFed: string;
  medicine: string;
}
