import { Card } from './card';

export interface CardCollecter {
  size: number;
  deck: Card[];
  getAll: () => Card[] | null;
  getNext: () => Card | null;
  createDeck: () => void;
  shuffleDeck: () => void;
  init: () => void;
  removeCard: (id: number | number[]) => void;
}
