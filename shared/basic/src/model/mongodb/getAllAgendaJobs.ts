import { getMongoInstance } from './mongoClient';
import { agendaConfigs, DailyJobParams } from '../agenda';

export async function getAllAgendaJobs() {
  const client = getMongoInstance();

  const db = await client.db('agenda');

  return db
    .collection<{
      data: {
        IDs: string[];
        cycleTime: Pick<DailyJobParams, 'mins' | 'hours'>;
        type: 'daily';
        // TODO: 未來記得改掉
        user: string;
      };
    }>(agendaConfigs.collection)
    .find();
}
