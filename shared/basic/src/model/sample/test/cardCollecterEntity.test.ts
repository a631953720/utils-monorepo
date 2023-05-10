import { CardCollecterEntity } from '../cardCollecterEntity';
import { CardEntity } from '../cardEntity';
import { Card } from '../type';

describe('CardCollecterEntity', () => {
  let cardCollecter: CardCollecterEntity;

  beforeEach(() => {
    cardCollecter = new CardCollecterEntity();
  });

  describe('init', () => {
    it('should create deck with 52 cards and shuffle them', () => {
      // Assert
      expect(cardCollecter.deck.length).toBe(52);
      expect(cardCollecter.deck[0]).toBeInstanceOf(CardEntity);
    });
  });

  describe('getNext', () => {
    it('should return the next card in the deck and reduce the size of the deck by 1', () => {
      // Arrange
      const expectedCard: Card =
        cardCollecter.deck[cardCollecter.deck.length - 1];

      // Act
      const actualCard = cardCollecter.getNext();

      // Assert
      expect(actualCard).toEqual(expectedCard);
      expect(cardCollecter.size).toBe(51);
    });

    it('should return null if there are no more cards left in the deck', () => {
      // Arrange
      cardCollecter.deck = [];
      cardCollecter.size = 0;

      // Act
      const actualCard = cardCollecter.getNext();

      // Assert
      expect(actualCard).toBeNull();
      expect(cardCollecter.size).toBe(0);
    });
  });

  describe('getAll', () => {
    it('should return all the cards in the deck', () => {
      // Arrange
      const expectedCards = [...cardCollecter.deck];

      // Act
      const actualCards = cardCollecter.getAll();

      // Assert
      expect(actualCards).toEqual(expectedCards);
    });
  });

  describe('removeCard', () => {
    it('should remove the specified card from the deck', () => {
      // Arrange
      const idToRemove = cardCollecter.deck[0].id;

      // Act
      cardCollecter.removeCard(idToRemove);
      const actualCard = cardCollecter.deck.find(
        (card) => card.id === idToRemove
      );

      // Assert
      expect(actualCard).toBeUndefined();
      expect(cardCollecter.size).toBe(51);
    });

    it('should remove the specified cards from the deck', () => {
      // Arrange
      const idsToRemove = [cardCollecter.deck[0].id, cardCollecter.deck[1].id];

      // Act
      cardCollecter.removeCard(idsToRemove);
      const actualCards = cardCollecter.deck.filter((card) =>
        idsToRemove.includes(card.id)
      );

      // Assert
      expect(actualCards.length).toBe(0);
      expect(cardCollecter.size).toBe(50);
    });
  });
});
