import { User, CardCollecter, CardJSON } from "./type";

export class UserEntity implements User {
  public onHand: CardJSON[];
  public size: number;

  constructor() {
    this.onHand = [];
    this.size = 0;
  }

  getDeck(deck: CardCollecter) {
    this.onHand.push(deck.getNext())
    this.size = this.onHand.length;
  };

  getDeckIdList() {
    return this.onHand.map((v) => v.id);
  }

  resetHand() {
    this.onHand = [];
    this.size = 0;
  }

  getAllDeckOnHand() {
    return this.onHand;
  };

  sendDeckFromHand(id: number) {
    const index = this.onHand.findIndex((v) => v.id === id);
    console.log(index);
    if (index < 0) return null;

    const result = this.onHand.splice(index, 1);
    this.size = this.onHand.length;
    return result[0];
  };
}