import { Router } from 'express';
import { GetStocksPayload } from '../../payload';
import { getStockInfos, postMessage } from '@myorg/basic';
import { getStockOptions } from '../../app';
import { jsonParse } from '../../../../../shared/basic/src/model/utils/jsonParse';

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

  const { stockMap, stockName } = await getStockInfos(stockID, mock === 'true');

  // format data;
  const formatString: string[] = [`\n股票名稱: ${stockName}`];
  stockMap.forEach(({ name, value }) => {
    formatString.push(`${name}: ${value}`);
  });

  const { status: lineStatus } = await postMessage(formatString.join('\n'));

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

export default router;
