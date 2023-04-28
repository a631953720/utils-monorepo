import { ColorType, Card } from './type';

export class CardEntity implements Card {
  public id: number;
  public number: number;
  public suit: ColorType;
  public isUsed: boolean;

  constructor(data: Pick<Card, "number" | "suit" | "id">) {
    this.number = data.number;
    this.suit = data.suit;
    this.isUsed = false;
    this.id = this.number;
  }

  public setIsUsed(next) {
    this.isUsed = next;
  }

  public toJSON() {
    return {
      number: this.number,
      suit: this.suit,
      isUsed: this.isUsed,
      id: this.id,
    };
  }
}
