import { ColorType, Card, CardJSON, Rank } from './type';

export class CardEntity implements Card {
  public id: number;
  public value: Rank;
  public suit: ColorType;
  public isUsed: boolean;
  public belongTo: number;

  constructor(data: Pick<Card, 'value' | 'suit' | 'id' | 'belongTo'>) {
    this.value = data.value;
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
      value: this.value,
      suit: this.suit,
      isUsed: this.isUsed,
      id: this.id,
    };
  }

  public compareTo(other: CardJSON): number {
    if (this.value > other.value) {
      return 1;
    } else if (this.value < other.value) {
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
