import { CardEntity } from '../cardEntity';
import { Rank, ColorType } from '../type';

describe('CardEntity', () => {
  it('should create a card entity', () => {
    const card = new CardEntity({
      value: Rank.ACE,
      suit: 'spades',
      id: 1,
      belongTo: 2,
    });

    expect(card.value).toBe(Rank.ACE);
    expect(card.suit).toBe('spades');
    expect(card.id).toBe(1);
    expect(card.belongTo).toBe(2);
    expect(card.isUsed).toBeFalsy();
  });

  it('should set the isUsed flag', () => {
    const card = new CardEntity({
      value: Rank.TEN,
      suit: 'diamonds',
      id: 2,
      belongTo: 3,
    });

    card.setIsUsed(true);
    expect(card.isUsed).toBeTruthy();

    card.setIsUsed(false);
    expect(card.isUsed).toBeFalsy();
  });

  it('should serialize to JSON', () => {
    const card = new CardEntity({
      value: Rank.KING,
      suit: 'hearts',
      id: 3,
      belongTo: 4,
    });

    const json = card.toJSON();

    expect(json).toEqual({
      value: Rank.KING,
      suit: 'hearts',
      id: 3,
      isUsed: false,
    });
  });

  it('should compare cards', () => {
    const card1 = new CardEntity({
      value: Rank.TWO,
      suit: 'clubs',
      id: 4,
      belongTo: 5,
    });
    const card2 = new CardEntity({
      value: Rank.THREE,
      suit: 'spades',
      id: 5,
      belongTo: 6,
    });

    expect(card1.compareTo(card2.toJSON())).toBe(1);
    expect(card2.compareTo(card1.toJSON())).toBe(-1);

    const card3 = new CardEntity({
      value: Rank.TWO,
      suit: 'clubs',
      id: 6,
      belongTo: 7,
    });

    expect(card1.compareTo(card3.toJSON())).toBe(0);

    const card4 = new CardEntity({
      value: Rank.ACE,
      suit: 'spades',
      id: 7,
      belongTo: 8,
    });

    expect(card4.compareTo(card1.toJSON())).toBe(-1);
  });

  it('should set and reset the belongTo property', () => {
    const card = new CardEntity({
      value: Rank.FIVE,
      suit: 'spades',
      id: 8,
      belongTo: 9,
    });

    expect(card.belongTo).toBe(9);

    card.setBelong(10);
    expect(card.belongTo).toBe(10);

    card.resetBelong();
    expect(card.belongTo).toBeUndefined();
  });
});
