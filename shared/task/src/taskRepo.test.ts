import { TaskRepo } from './taskRepo';
import { getKnex } from '@myorg/basic';

describe('taskRepo', () => {
  let taskRepo: TaskRepo;
  beforeAll(() => {
    taskRepo = new TaskRepo(getKnex(true));
  });

  test('all', async () => {
    const r = await taskRepo.all();

    expect(r?.length).toEqual(3);
  });

  describe('find methods', () => {
    test('find', async () => {
      const r = await taskRepo.find(1);

      expect(r).toEqual({
        id: 1,
        name: 'task-1',
        priority: 0,
        startTime: '2023-05-05T00:00:00.000Z',
        endTime: null,
        benefit: 'good',
        disadvantages: 'bad',
        note: null,
        state: 'notStart',
      });
    });

    test('findMany', async () => {
      const r = await taskRepo.findMany({ state: 'notStart' });
      expect(r.length).toEqual(3);
      expect(r.map((v) => v.state)).toEqual([
        'notStart',
        'notStart',
        'notStart',
      ]);
    });

    test('findOne', async () => {
      const r = await taskRepo.findOne({ state: 'notStart' });
      expect(r?.id).toEqual(1);
      expect(r?.state).toEqual('notStart');
    });
  });
});

// todo: add other test case
