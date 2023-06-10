import { createMinLoopJob, initAG } from '@myorg/basic';

// getSource('0056', true).then((data) => {
//   console.log(data);
// });

initAG().then(async () => {
  const result = await createMinLoopJob({
    jobName: 'test2',
    jobCallback: (d) => {
      console.log(d);
    },
    mins: '15',
  });

  console.log(result);
});
