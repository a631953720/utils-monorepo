import { pgConfig } from '@myorg/basic';

export function postMessage(message: string) {
  const formData = new URLSearchParams({ message });
  return fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${pgConfig.lineNotifyConfig.token}`,
    },
    body: formData,
  })
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result);
    });
}
