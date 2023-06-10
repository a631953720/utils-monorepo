import { createMinLoopJob, getStockMap, initAG } from '@myorg/basic';
import { postMessage } from '@myorg/basic';

getStockMap('0056', true).then((data) => {
  console.log(data);
});

// initAG().then(async () => {
//   const result = await createMinLoopJob({
//     jobName: 'test2',
//     jobCallback: (d) => {
//       console.log(d);
//     },
//     mins: '15',
//   });
//
//   console.log(result);
//   postMessage('排成初始化完成');
// });
