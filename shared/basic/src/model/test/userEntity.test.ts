import { CardCollecterEntity } from '../cardCollecterEntity';
import { UserEntity } from '../userEntity';
import { Card } from '../type';
import { isEqual } from 'lodash';
import { CardEntity } from '../cardEntity';

describe('UserEntity', () => {
  let deck: CardCollecterEntity;
  let user: UserEntity;
  let allCards: Card[];
  let cards: Card[];
  let initUserCard: () => void;

  beforeEach(() => {
    deck = new CardCollecterEntity();
    user = new UserEntity(1);
    cards = [];
    allCards = deck.getAll();

    initUserCard = () => {
      const size = 5;
      for (let i = 0; i < size; i++) {
        const card = deck.getNext();
        card.setBelong(user.id);
        cards.push(card);
        user.onHand.push(card);
        user.size = size;
      }
    };
  });

  describe('getDeck()', () => {
    it('should add a card to onHand and return the card', () => {
      const laseCard = allCards[allCards.length - 1];

      user.getDeck(deck);

      expect(user.onHand).toEqual([laseCard]);
      expect(user.size).toBe(1);
    });

    it('should not add any card to onHand when deck is empty', () => {
      deck.deck = [];

      user.getDeck(deck);

      expect(user.onHand).toEqual([]);
      expect(user.size).toBe(0);
    });
  });

  describe('getDeckIdList()', () => {
    it('should return a list of card ids on hand', () => {
      const card1 = allCards[allCards.length - 1];
      const card2 = allCards[allCards.length - 2];

      user.getDeck(deck);
      user.getDeck(deck);

      expect(
        isEqual(user.getDeckIdList().sort(), [card1.id, card2.id].sort())
      ).toEqual(true);
    });

    it('should return an empty array if onHand is empty', () => {
      expect(user.getDeckIdList()).toEqual([]);
    });
  });

  describe('resetHand', () => {
    it('should empty the onHand array', () => {
      initUserCard();
      expect(user.onHand.length).toBe(5);
      user.resetHand();
      expect(user.onHand.length).toBe(0);
    });

    it('should reset the size to 0', () => {
      initUserCard();
      expect(user.size).toBe(5);
      user.resetHand();
      expect(user.size).toBe(0);
    });
  });

  describe('getAllDeckOnHand', () => {
    it('should return all decks on hand', () => {
      initUserCard();
      expect(user.getAllDeckOnHand()).toEqual(cards);
    });

    it('should not mutate the onHand array', () => {
      initUserCard();
      const decks = user.getAllDeckOnHand();
      expect(decks).toEqual(cards);
      decks.pop();
      expect(decks.length).toBe(4);
      expect(user.onHand.length).toBe(5);
    });
  });

  describe('sendDeckFromHand', () => {
    it('should remove the specified deck from onHand', () => {
      initUserCard();
      const deckToRemove = cards[2];
      const result = user.sendDeckFromHand(deckToRemove.id);
      expect(result).toEqual(deckToRemove);
      expect(user.onHand.length).toBe(4);
      expect(user.onHand).not.toContain(deckToRemove);
    });

    it('should decrease the size of onHand', () => {
      initUserCard();
      const deckToRemove = cards[2];
      user.sendDeckFromHand(deckToRemove.id);
      expect(user.size).toBe(4);
    });

    it('should return null if deck not found', () => {
      const result = user.sendDeckFromHand(-1);
      expect(result).toBeNull();
    });
  });

  describe('sendMaxFromHand', () => {
    it('should return null if the hand is empty', () => {
      const card = user.sendMaxFromHand();
      expect(card).toBeNull();
    });

    it('should remove and return the max card from the hand', () => {
      // Set up user hand
      const card1 = new CardEntity({ id: 1, value: 5, suit: 'hearts' });
      const card2 = new CardEntity({ id: 2, value: 8, suit: 'diamonds' });
      const card3 = new CardEntity({ id: 3, value: 2, suit: 'clubs' });
      user.onHand.push(card1, card2, card3);
      user.size = 3;

      // Expect max card to be returned and removed from hand
      const maxCard = user.sendMaxFromHand();
      expect(maxCard).toEqual(card3);
      expect(user.size).toBe(2);
      expect(user.onHand).toEqual([card1, card2]);
    });
  });

  describe('getLastDeckOnHand', () => {
    it('should return null if the hand is empty', () => {
      const card = user.getLastDeckOnHand();
      expect(card).toBeNull();
    });

    it('should return the last card in the hand', () => {
      // Set up user hand
      const card1 = new CardEntity({ id: 1, value: 5, suit: 'hearts' });
      const card2 = new CardEntity({ id: 2, value: 8, suit: 'diamonds' });
      const card3 = new CardEntity({ id: 3, value: 2, suit: 'clubs' });
      user.onHand.push(card1, card2, card3);
      user.size = 3;

      // Expect last card to be returned
      const lastCard = user.getLastDeckOnHand();
      expect(lastCard).toEqual(card3);
    });
  });
});
