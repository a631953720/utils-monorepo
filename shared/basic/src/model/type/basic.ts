export type ColorType = 'diamonds' | 'hearts' | 'spades' | 'clubs';

export enum Rank {
  ACE = 14,
  TWO = 15,
  THREE = 3,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
}

export interface CardJSON {
  id: number;
  value: Rank;
  suit: ColorType;
  isUsed: boolean;
}

export interface CardCollecterJSON {
  size: number;
  deck: CardJSON[];
}

export type UserActions = 'get' | 'send';

export interface GameLog {
  userId: number;
  action: UserActions;
  card: CardJSON;
}
