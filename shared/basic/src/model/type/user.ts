import { CardCollecterJSON, CardJSON } from "./basic";

export type User = {
  onHand: CardJSON[];
  size: number;
  getDeck: (deck: CardCollecterJSON) => void;
  getDeckIdList: () => number[];
  resetHand: () => void;
  getAllDeckOnHand: () => CardJSON[];
  sendDeckFromHand: (id: number) => CardJSON | null;
}