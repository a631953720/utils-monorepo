import { CardJSON, GameLog, UserActions } from './basic';
import { CardCollecter } from './cardCollecter';
import { User } from './user';

export type NextRoundOptions = {
  action: UserActions;
  onAction?: (user: User | null) => void;
  onEnd?: () => void;
  stopWhenCardRunOut?: boolean;
};

export interface Game {
  cardCollecter: CardCollecter;
  playersCount: number;
  round: number;
  playerMap: Map<number, User>;
  deckOnThisGame: CardJSON[];
  GameLog: GameLog[];
  currentActiveUserIndex: number | null;
  init: () => void;
  reset: () => void;
  resetAll: () => void;
  nextRound: (options: NextRoundOptions) => void;
  setPlayerCount: (count: number) => boolean;
  getUserList: () => User[];
  getUser: (id: number) => User | null;
  getCurrendDeck: () => CardJSON[];
}
