import { getStockInfos } from '../stock';
import { formatLineMsg } from '../utils';
import { postMessage } from '../line-notify';
import { Loggers, simpleMsg } from '@myorg/winston-logger';

const loggers = new Loggers({ type: 'line-notify' });

export async function scheduleEvent(IDs: string[], mock?: boolean) {
  const results = await Promise.all(IDs.map((id) => getStockInfos(id, mock)));

  const messages = results.map((d) => formatLineMsg(d));

  if (messages.length < 1) {
    loggers.error(
      `get stock info error. IDs: ${IDs} data: ${JSON.stringify(results)}`
    );
    postMessage('取得股票資訊失敗，請聯繫作者檢查');
  }

  messages.forEach((message) => {
    postMessage(message).then((data) => {
      loggers.debug(JSON.stringify(data));
    });
  });

  simpleMsg('send line message');
}
