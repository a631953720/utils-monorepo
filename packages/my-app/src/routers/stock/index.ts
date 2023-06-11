import { Router } from 'express';
import { GetStocksPayload } from '../../payload';
import {
  getAllAgendaJobs,
  getStockInfos,
  jsonParse,
  postMessage,
} from '@myorg/basic';
import { getStockOptions } from '../../app';
import { formatLineMsg } from '../../utils';
import { SetStockSchedulePayload } from '../../payload/stock/setStockSchedulePayload';
import { setSchedule } from '../../app/schedule';

const router = Router();

// TODO: 把邏輯抽離到shared

router.get('/options', (_, res) => {
  return res.status(200).json({ data: getStockOptions() });
});

router.get('/:stockID', async (req, res, next) => {
  const { stockID } = req.params;
  const { mock, IDs } = req.query;
  const payload = new GetStocksPayload({
    IDs: jsonParse(IDs) ?? undefined,
  });

  if (payload.isError) {
    return next(payload.errors);
  }

  const { stockName, stockMap, lastUpdateTime } = await getStockInfos(
    stockID,
    mock === 'true'
  );

  const result: {
    name: string;
    value: string;
  }[] = [];

  if (payload.IDs?.length) {
    payload.IDs?.forEach((ID) => {
      const d = stockMap.get(ID);
      if (d) {
        result.push({
          name: d.name,
          value: d.value,
        });
      }
    });
  } else {
    stockMap.forEach(({ name, value }) => {
      result.push({
        name,
        value,
      });
    });
  }

  res.status(200).json({
    name: stockName,
    data: result,
    lastUpdateTime,
  });
});

router.post('/line/:stockID', async (req, res, next) => {
  const { stockID } = req.params;
  const { mock } = req.query;

  const data = await getStockInfos(stockID, mock === 'true');

  const { status: lineStatus } = await postMessage(formatLineMsg(data));

  if (lineStatus !== 200) {
    // TODO: add common error class
    return res.status(500).json({
      msg: 'send line message error',
    });
  }

  res.status(200).json({
    msg: 'ok',
  });
});

router.get('/job/schedule', async (req, res) => {
  const data = await (await getAllAgendaJobs()).toArray();

  const result = data.map((d) => {
    return {
      ...d.data,
      id: d._id.toString(),
    };
  });
  console.log(data);
  res.status(200).json({
    data: result,
  });
});

router.post('/job/schedule', async (req, res, _next) => {
  const data = new SetStockSchedulePayload(req.body);

  if (data.isError)
    return res.status(400).json({
      errorMessage: data.errors.join(','),
    });

  const { isSuccess, errorMessage } = await setSchedule(data);

  if (!isSuccess)
    return res.status(500).json({
      errorMessage,
    });

  return res.status(200).json({
    msg: 'ok',
  });
});

export default router;
