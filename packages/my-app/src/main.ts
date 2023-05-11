/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Task } from '@myorg/task';
import { getKnex } from '@myorg/basic';

(async () => {
  const k = getKnex();

  const taskRepo = new Task(k);

  const testA = await taskRepo.all();

  console.log(testA);

  const testB = await taskRepo.getForCondition('id', 2);

  console.log(testB);
})();
