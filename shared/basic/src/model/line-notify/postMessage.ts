import { pgConfig } from '@myorg/configs';
import { Loggers } from '@myorg/winston-logger';

const logger = new Loggers({ type: 'line' });

type Response = {
  status: number;
  message: string;
};

export async function postMessage(message: string) {
  const formData = new URLSearchParams({ message });
  const res: Response = await fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${pgConfig.lineNotifyConfig.token}`,
    },
    body: formData,
  })
    .then((resp) => resp.json())
    .catch((e) => {
      logger.error(e);
    });
  return res;
}
