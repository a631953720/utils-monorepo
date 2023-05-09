import { Card } from './card';
import { CardCollecter } from './cardCollecter';

export interface User {
  id: number;
  onHand: Card[];
  size: number;
  getDeck: (deck: CardCollecter) => void;
  getDeckIdList: () => number[];
  resetHand: () => void;
  getAllDeckOnHand: () => Card[];
  sendDeckFromHand: (id: number) => Card | null;
  getLastDeckOnHand: () => Card | null;
  getDeckFromHand: (cardId: number) => Card | null;
}
