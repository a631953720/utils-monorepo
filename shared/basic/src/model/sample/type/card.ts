import { ColorType, CardJSON, Rank } from './basic';

export interface Card {
  id: number;
  belongTo?: number;
  value: Rank;
  suit: ColorType;
  isUsed: boolean;
  setIsUsed: (v: boolean) => void;
  toJSON: () => CardJSON;
  compareTo: (other: CardJSON) => number;
  setBelong: (id: number) => void;
  resetBelong: () => void;
}
