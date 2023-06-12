import { getStockInfos } from '../stock';
import { formatLineMsg } from '../utils';
import { simpleMsg } from '@myorg/winston-logger';

export async function scheduleEvent(IDs: string[], mock?: boolean) {
  const results = await Promise.all(IDs.map((id) => getStockInfos(id, mock)));

  const messages = results.map((d) => formatLineMsg(d));

  messages.forEach((message) => {
    postMessage(message);
  });

  simpleMsg('send line message');
}
