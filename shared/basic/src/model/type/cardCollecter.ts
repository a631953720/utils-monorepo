import { CardJSON } from "./basic";

export type CardCollecter = {
  size: number;
  deck: CardJSON[];
  getAll: () => CardJSON[] | null;
  getNext: () => CardJSON | null;
  createDeck: () => void;
  shuffleDeck: () => void;
  init: () => void;
};