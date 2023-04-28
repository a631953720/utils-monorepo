/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { GameEntity } from '@myorg/basic';
import { Card } from '../../../shared/basic/src/model/type';

const game = new GameEntity({
  playersCount: 2,
});

for (let i = 0; i < 6; i++) {
  game.nextRound({
    action: 'get',
  });
}

const record: Record<number, Card | undefined> = {};
let userA = 0;
let userB = 0;
game.getUserList().forEach((u) => (record[u.id] = undefined));

for (let i = 0; i < 60; i++) {
  game.nextRound({
    action: 'get',
    onAction: (user) => {
      const a = user.sendMaxFromHand();
      record[user.id] = a;

      let winUserId: number;

      if (Object.values(record).every((v) => v)) {
        const result = Object.values(record).sort((a, b) => a.compareTo(b));
        winUserId = result.pop().belongTo;
        game.getUserList().forEach((u) => {
          record[u.id].resetBelong();
          record[u.id] = undefined;
        });
      }

      if (winUserId === 0) userA++;
      if (winUserId === 1) userB++;
    },
    onEnd: () => {
      console.log(userA, userB);
    },
    stopWhenCardRunOut: true,
  });
}
