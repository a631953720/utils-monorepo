import { CardEntity } from './cardEntity';
import { ColorType, CardCollecter, CardJSON } from './type';

const numberOfCard = 13;
const suits: ColorType[] = ['hearts', 'diamonds', 'clubs', 'spades'];

export class CardCollecterEntity implements CardCollecter {
  public size: number;
  public deck: CardJSON[];

  constructor() {
    this.deck = [];
    this.size = 0;
    this.init();
  }

  getNext() {
    const card = this.deck.pop();
    this.size = this.deck.length;
    return card ?? null;
  }

  getAll() {
    return this.deck;
  }

  init() {
    this.createDeck();
    this.shuffleDeck();
  }

  createDeck() {
    const result: CardJSON[] = [];
    // 1. 初始化
    for (let i = 0; i < suits.length; i++) {
      const suit = suits[i];
      for (let j = 0; j < numberOfCard; j++) {
        result.push(
          new CardEntity({
            id: (i + 1) * (j + 1),
            number: j + 1,
            suit,
          }).toJSON()
        );
      }
    }
    this.size = numberOfCard * suits.length;
    this.deck = result;
  }

  shuffleDeck() {
    for (let i = this.size - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
}
