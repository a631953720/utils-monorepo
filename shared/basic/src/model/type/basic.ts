export type ColorType = 'diamonds' | 'hearts' | 'spades' | 'clubs';

export enum Rank {
  ACE = 1,
  TWO,
  THREE,
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

export type CardJSON = {
  id: number;
  value: Rank;
  suit: ColorType;
  isUsed: boolean;
};

export type CardCollecterJSON = {
  size: number;
  deck: CardJSON[];
};

export type UserActions = 'get';

export type GameLog = {
  userId: number;
  action: UserActions;
  card: CardJSON;
};
