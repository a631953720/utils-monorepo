import { getMongoInstance } from './mongoClient';
import { agendaConfigs } from '../agenda';

export async function getAllAgendaJobs() {
  const client = getMongoInstance();

  const db = await client.db('agenda');

  return db
    .collection<{
      data: {
        IDs: string[];
        cycleTime: string;
        type: 'daily';
        // TODO: 未來記得改掉
        user: string;
        mock?: boolean;
      };
    }>(agendaConfigs.collection)
    .find();
}
