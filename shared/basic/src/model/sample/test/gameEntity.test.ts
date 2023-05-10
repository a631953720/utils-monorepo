import { GameEntity } from '../gameEntity';

describe('GameEntity', () => {
  let game: GameEntity;

  beforeEach(() => {
    game = new GameEntity({ playersCount: 2 });
  });

  it('should create a new game object', () => {
    expect(game.round).toBe(0);
    expect(game.playersCount).toBe(2);
    expect(game.deckOnThisGame).toHaveLength(0);
    expect(game.currentActiveUserIndex).toBe(0);
    expect(game.GameLog).toHaveLength(0);
    expect(game.cardCollecter).toBeDefined();
    expect(game.playerMap).toBeDefined();
  });

  describe('init', () => {
    it('should initialize the game correctly', () => {
      expect(game.round).toBe(0);
      expect(game.playersCount).toBe(2);
      expect(game.GameLog).toEqual([]);
      expect(game.deckOnThisGame).toEqual([]);
      expect(game.currentActiveUserIndex).toBe(0);
      // expect(game.playerIdList).toEqual([0, 1]);
      expect(game.cardCollecter.size).toBe(52);
      expect(game.playerMap.size).toBe(2);
      expect(game.getUser(0)).not.toBeNull();
      expect(game.getUser(1)).not.toBeNull();
    });
  });

  describe('nextRound', () => {
    it('should not proceed if the user is not valid', () => {
      const onEnd = jest.fn();
      const onAction = jest.fn();
      // set unavailable user index
      game.currentActiveUserIndex = -1;
      game.nextRound({
        onEnd,
        onAction,
        stopWhenCardRunOut: false,
      });
      expect(onEnd).not.toHaveBeenCalled();
      expect(onAction).not.toHaveBeenCalled();
    });

    it('should proceed to the next round if the user is valid and has enough cards', () => {
      game.getUser(0)?.getDeck(game.cardCollecter);
      const onEnd = jest.fn();
      const onAction = jest.fn();
      game.nextRound({
        onEnd,
        onAction,
        stopWhenCardRunOut: false,
      });
      expect(onEnd).not.toHaveBeenCalled();
      expect(onAction).toHaveBeenCalled();
      expect(game.currentActiveUserIndex).toBe(1);
    });

    it('should reset the card collecter if it has run out of cards', () => {
      game.getUser(0)?.getDeck(game.cardCollecter);
      game.getUser(1)?.getDeck(game.cardCollecter);
      const allCards = game.cardCollecter.getAll() ?? [];
      game.cardCollecter.removeCard(allCards.map((c) => c.id));
      expect(game.cardCollecter.size).toBe(0);

      const onEnd = jest.fn();
      const onAction = jest.fn();
      game.nextRound({
        onEnd,
        onAction,
        stopWhenCardRunOut: false,
      });
      expect(onEnd).not.toHaveBeenCalled();
      expect(onAction).toHaveBeenCalled();
      expect(game.cardCollecter.size).toBe(52 - game.playersCount);
    });

    it('should end the game if stopWhenCardRunOut is true and the card collecter has run out of cards', () => {
      game.getUser(0)?.getDeck(game.cardCollecter);
      game.getUser(1)?.getDeck(game.cardCollecter);
      const allCards = game.cardCollecter.getAll() ?? [];
      game.cardCollecter.removeCard(allCards.map((c) => c.id));

      const onEnd = jest.fn();
      const onAction = jest.fn();
      game.nextRound({
        onEnd,
        onAction,
        stopWhenCardRunOut: true,
      });
      expect(onEnd).toHaveBeenCalled();
      expect(onAction).not.toHaveBeenCalled();
      expect(game.cardCollecter.size).toBe(0);
    });
  });

  describe('setPlayerCount', () => {
    it('should return true if count > 1', () => {
      const result = game.setPlayerCount(4);
      expect(result).toBe(true);
    });

    it('should return false if count < 0', () => {
      const game = new GameEntity({ playersCount: 4 });
      const result = game.setPlayerCount(-1);
      expect(result).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset game state', () => {
      game.nextRound({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onEnd: () => {},
      });
      game.reset();
      expect(game.round).toBe(0);
      expect(game.currentActiveUserIndex).toBe(0);
      expect(game.cardCollecter.size).toBeGreaterThan(0);
      expect(game.GameLog.length).toBe(0);
      const users = game.getUserList();
      users.forEach((user) => {
        expect(user.size).toBe(0);
      });
    });
  });

  describe('resetAll', () => {
    it('should reset all game state', () => {
      game.nextRound({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onEnd: () => {},
      });
      game.resetAll();
      expect(game.round).toBe(0);
      expect(game.playersCount).toBe(0);
      expect(game.playerMap.size).toBe(0);
      expect(game.cardCollecter.size).toBeGreaterThan(0);
      expect(game.GameLog.length).toBe(0);
      const users = game.getUserList();
      users.forEach((user) => {
        expect(user.size).toBe(0);
      });
    });
  });

  describe('getUser', () => {
    it('should return the correct user entity given an existing user ID', () => {
      const user = game.getUser(0);
      expect(user).toBeDefined();
      expect(user?.id).toEqual(0);
    });

    it('should return null given a non-existing user ID', () => {
      const user = game.getUser(999);
      expect(user).toBeNull();
    });
  });

  describe('getUserList', () => {
    it('should return an array of all user entities', () => {
      const users = game.getUserList();
      expect(users.length).toEqual(2);
      expect(users[0].id).toEqual(0);
      expect(users[1].id).toEqual(1);
    });
  });

  describe('getCurrentDeck', () => {
    it('should return the current deck of the game', () => {
      const deck = game.getCurrentDeck();
      expect(deck.length).toBeGreaterThan(0);
    });
  });

  it('should get a card from the deck and add to the user hand', () => {
    const userId = 0;
    const user = game.getUser(userId);

    const prevSize = user?.size;
    game.userGetAction(userId);
    const newSize = user?.size;

    expect(prevSize).toBeDefined();
    expect(newSize).toBeGreaterThan(prevSize as number);
    expect(game.getCurrentDeck().length).toEqual(51);
  });

  describe('GameLog', () => {
    it('should add a new game log entry on user action', () => {
      const userId = 0;
      const action = 'get';

      game.userGetAction(userId);
      const expectedLog = {
        userId,
        action,
        card: game.getUser(userId)?.getLastDeckOnHand(),
      };

      expect(game.GameLog).toEqual([expectedLog]);
    });
  });

  describe('userSendCard', () => {
    it('should return the sent card and remove it from user hand', () => {
      const userId = 0;
      const user = game.getUser(userId);
      // get one card
      game.userGetAction(userId);
      const card = user?.onHand[0];
      const sentCard = game.userSendAction(userId, card?.id as number);

      expect(card).not.toBeUndefined();
      expect(sentCard).toEqual(card);
      expect(user?.onHand).not.toContainEqual(card);
    });

    it('should log the send action in GameLog', () => {
      const userId = 0;
      const user = game.getUser(userId);
      // get one card
      game.userGetAction(userId);
      const card = user?.onHand[0];
      game.userSendAction(userId, card?.id as number);

      expect(card).not.toBeUndefined();
      expect(game.GameLog.length).toEqual(2);
      expect(game.GameLog[1]).toEqual({
        userId,
        action: 'send',
        card,
      });
    });

    it('should return null and log warning if user is not found', () => {
      const game = new GameEntity({ playersCount: 2 });
      const userId = 2;
      const cardId = 1;
      const sentCard = game.userSendAction(userId, cardId);

      expect(sentCard).toBeNull();
    });
  });
});
