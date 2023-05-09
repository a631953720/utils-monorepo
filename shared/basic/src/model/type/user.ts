import { CardCollecterJSON } from './basic';
import { Card } from './card';

export interface User {
  id: number;
  onHand: Card[];
  size: number;
  getDeck: (deck: CardCollecterJSON) => void;
  getDeckIdList: () => number[];
  resetHand: () => void;
  getAllDeckOnHand: () => Card[];
  sendDeckFromHand: (id: number) => Card | null;
  getLastDeckOnHand: () => Card | null;
  getDeckFromHand: (cardId: number) => Card | null;
}
