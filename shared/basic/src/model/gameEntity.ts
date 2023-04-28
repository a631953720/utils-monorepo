import { CardCollecterEntity } from './cardCollecterEntity';
import {
  CardCollecter,
  CardJSON,
  Game,
  GameLog,
  NextRoundOptions,
  User,
  UserActions,
} from './type';
import { UserEntity } from './userEntity';
import { Loggers } from '@myorg/winston-logger';

const testLogger = new Loggers({ type: 'GameEntity', isSaveLog: false });

type AddGameLogOptions = {
  userId: number;
  action: UserActions;
  card: CardJSON;
};

export class GameEntity implements Game {
  public cardCollecter: CardCollecter;
  public round: number;
  public playersCount: number;
  public playerMap: Map<number, User>;
  public deckOnThisGame: CardJSON[];
  public GameLog: GameLog[];
  public currentActiveUserIndex: number | null;
  private playerIdList: number[];
  private currentActiveUser: User | null;

  constructor(data: Pick<Game, 'playersCount'>) {
    this.round = 0;
    this.playersCount = data.playersCount;
    this.GameLog = [];
    this.deckOnThisGame = [];
    this.playerMap = new Map();
    this.currentActiveUserIndex = null;
    this.playerIdList = [];
    this.cardCollecter = new CardCollecterEntity();
    this.init();
  }

  init() {
    this.round = 0;
    for (let i = 0; i < this.playersCount; i++) {
      this.playerMap.set(i, new UserEntity(i));
      this.playerIdList.push(i);
    }
    this.currentActiveUserIndex = 0;
  }

  nextRound({ action, onEnd, onAction, stopWhenCardRunOut }: NextRoundOptions) {
    const userId = this.playerIdList[this.currentActiveUserIndex];
    this.round++;
    if (!this.playerMap.has(this.playerIdList[this.currentActiveUserIndex])) {
      testLogger.error('is not active user');
      return;
    }

    if (this.cardCollecter.size < 1) {
      let ids: number[] = [];
      this.getUserList().forEach((user) => {
        ids = ids.concat(user.getDeckIdList());
      });
      this.resetCardCollecter();

      this.cardCollecter.removeCard(ids);

      // 沒指定就往下繼續
      if (stopWhenCardRunOut) return onEnd();
    }

    switch (action) {
      case 'get':
        // eslint-disable-next-line no-case-declarations
        const newCard = this.userGetCard(userId);
        this.addGameLog({
          userId,
          action,
          card: newCard,
        });
        break;
      default:
        testLogger.error('unknown user action');
        break;
    }

    onAction?.(this.currentActiveUser);

    this.nextRoundPlayer();
  }

  setPlayerCount(count: number) {
    if (count < 0) {
      testLogger.error('count must > 1');
      return false;
    }
    this.playersCount = count;
    return true;
  }

  reset() {
    this.round = 0;
    this.playerMap.forEach((user) => {
      user.resetHand();
    });
    this.resetCardCollecter();
    this.GameLog = [];
    this.currentActiveUserIndex = 0;
    this.currentActiveUser = null;
  }

  resetAll() {
    this.round = 0;
    this.playersCount = 0;
    this.playerMap.clear();
    this.resetCardCollecter();
    this.GameLog = [];
    this.currentActiveUserIndex = 0;
    this.currentActiveUser = null;
  }

  getUser(id: number) {
    return this.playerMap.get(id) ?? null;
  }

  getUserList() {
    const users: User[] = [];
    this.playerMap.forEach((user) => {
      users.push(user);
    });
    return users;
  }

  getCurrendDeck() {
    return this.cardCollecter.getAll();
  }

  private addGameLog(options: AddGameLogOptions) {
    this.GameLog.push(options);
  }

  private userGetCard(userId: number): CardJSON {
    const user = this.getUser(userId);
    if (!user) {
      testLogger.warning(`user ${userId} not found`);
      return;
    }
    user.getDeck(this.cardCollecter);
    return user.getLastDeckOnHand();
  }

  private nextRoundPlayer() {
    if (this.currentActiveUserIndex < this.playerIdList.length - 1) {
      this.currentActiveUserIndex++;
    } else {
      this.currentActiveUserIndex = 0;
    }
    this.currentActiveUser = this.playerMap.get(
      this.currentActiveUserIndex
    ) as User;
  }

  private resetCardCollecter() {
    this.cardCollecter.init();
  }
}
