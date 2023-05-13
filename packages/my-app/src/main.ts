/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { TaskPriority, TaskRepo } from '@myorg/task';
import { getKnex } from '@myorg/basic';

(async () => {
  const k = getKnex();

  const taskRepo = new TaskRepo(k);

  // const testA = await taskRepo.all();
  //
  // console.log(testA);
  //
  // const testB = await taskRepo.getForCondition('id', 2);
  //
  // console.log(testB);

  // const r3 = await taskRepo.findTask({
  //   name: 'task-2',
  //   priority: TaskPriority.none,
  // });
  //
  // console.log(r3);

  const r4 = await taskRepo.find(3);
  console.log(r4);

  const r5 = await taskRepo.has(5);
  console.log(r5);

  const r6 = await taskRepo.hasOne({
    name: 'task-1',
  });
  console.log(r6);
})();
