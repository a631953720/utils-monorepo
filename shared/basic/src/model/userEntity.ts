import { cloneDeep } from 'lodash';
import { User, CardCollecter, Card } from './type';

export class UserEntity implements User {
  public id: number;
  public onHand: Card[];
  public size: number;

  constructor(id: number) {
    this.id = id;
    this.onHand = [];
    this.size = 0;
  }

  getDeck(deck: CardCollecter) {
    const card = deck.getNext();
    if (!card) return;
    card.setBelong(this.id);
    this.onHand.push(cloneDeep(card));
    this.size = this.onHand.length;

    this.onHand = this.onHand.sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      } else if (a.value < b.value) {
        return -1;
      } else {
        if (a.suit > b.suit) {
          return 1;
        } else if (a.suit < b.suit) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  getDeckIdList() {
    return this.onHand.map((v) => v.id);
  }

  resetHand() {
    this.onHand = [];
    this.size = 0;
  }

  getAllDeckOnHand() {
    return cloneDeep(this.onHand);
  }

  sendDeckFromHand(id: number) {
    const index = this.onHand.findIndex((v) => v.id === id);
    if (index < 0) return null;

    const result = this.onHand.splice(index, 1);
    this.size = this.onHand.length;
    return result[0];
  }

  getLastDeckOnHand() {
    if (!this.onHand.length) return null;
    return this.onHand[this.onHand.length - 1];
  }

  getDeckFromHand(cardId: number) {
    return this.onHand.find((v) => v.id === cardId) ?? null;
  }
}
