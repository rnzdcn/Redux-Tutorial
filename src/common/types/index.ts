export interface City {
  name: string;
  population: number;
}

export interface State {
  code: string;
  name: string;
  cities: City[];
}

export interface Country {
  code: string;
  name: string;
  states: State[];
  id: string;
}
