import { ColorType, CardJSON } from "./basic";

export type Card = {
  id: number;
  number: number;
  suit: ColorType;
  isUsed: boolean;
  setIsUsed: (v: boolean) => void;
  toJSON: () => CardJSON;
}