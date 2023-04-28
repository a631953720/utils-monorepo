export type ColorType = 'diamonds' | 'hearts' | 'spades' | 'clubs';

export type CardJSON = {
  id: number;
  number: number;
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
