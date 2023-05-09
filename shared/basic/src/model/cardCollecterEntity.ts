import { CardEntity } from './cardEntity';
import { ColorType, CardCollecter, Card } from './type';

const numberOfCard = 13;
const suits: ColorType[] = ['hearts', 'diamonds', 'clubs', 'spades'];

export class CardCollecterEntity implements CardCollecter {
  public size: number;
  public deck: Card[];

  constructor() {
    this.deck = [];
    this.size = 0;
    this.init();
  }

  getNext() {
    if (this.size < 1) return null;
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
    const result: Card[] = [];
    // 1. 初始化
    for (let i = 0; i < suits.length; i++) {
      const suit = suits[i];
      for (let j = 0; j < numberOfCard; j++) {
        result.push(
          new CardEntity({
            id: result.length,
            value: j + 1,
            suit,
          })
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

  removeCard(id: number | number[]) {
    const set = new Set<number>(Array.isArray(id) ? id : [id]);
    this.deck = this.deck.filter((v) => !set.has(v.id));
    this.size = this.deck.length;
  }
}
