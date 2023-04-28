import { ColorType, Card, CardJSON } from './type';

export class CardEntity implements Card {
  public id: number;
  public number: number;
  public suit: ColorType;
  public isUsed: boolean;
  public belongTo: number;

  constructor(data: Pick<Card, 'number' | 'suit' | 'id' | 'belongTo'>) {
    this.number = data.number;
    this.suit = data.suit;
    this.isUsed = false;
    this.id = data.id;
    this.belongTo = data.belongTo;
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

  public compareTo(other: CardJSON): number {
    if (this.number > other.number) {
      return 1;
    } else if (this.number < other.number) {
      return -1;
    } else {
      if (this.suit > other.suit) {
        return 1;
      } else if (this.suit < other.suit) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  public setBelong(id: number) {
    this.belongTo = id;
  }

  public resetBelong() {
    this.belongTo = undefined;
  }
}
