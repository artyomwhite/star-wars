import { IPlanet } from 'types/planets';
import { ISpecies } from 'types/species';

export interface IPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string[];
  url: string;
}

export interface IPeople {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[];
}

export interface SelectedPeople {
  male: number,
  female: number,
  other: number,
  idArray: string[],
}


export interface IFullPersonData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeWorld: IPlanet | null,
  species: ISpecies | null,
  url: string;
}
