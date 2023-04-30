/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { GameEntity } from '@myorg/basic';

const game = new GameEntity({
  playersCount: 2,
});

game.nextRound({
  onAction: (currentUser) => {
    game.userGetAction(currentUser.id);
  },
});

game.nextRound({
  onAction: (currentUser) => {
    game.userGetAction(currentUser.id);
  },
});

const record = {
  a: undefined,
  b: undefined,
};

game.nextRound({
  onAction: (currentUser) => {
    const card = game.userSendAction(currentUser.id, currentUser.onHand[0].id);
    console.log(card);
    record.a = card;
  },
});

game.nextRound({
  onAction: (currentUser) => {
    const card = game.userSendAction(currentUser.id, currentUser.onHand[0].id);
    console.log(card);
    console.log(card.compareTo(record.a));
  },
});
