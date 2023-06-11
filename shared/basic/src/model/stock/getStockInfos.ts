import { getStockTable } from './getStockTable';
import * as cheerio from 'cheerio';
import { getWebResource } from './getWebResource';
import { getStockName } from './getStockName';
import { getLastUpdateTime } from './getLastUpdateTime';

function getTableAndCheerio(data: any) {
  const $ = cheerio.load(data);
  return {
    $,
    // 在 good info 上第15個 table
    table: $('table').get()[14],
  };
}

export async function getStockInfos(id: string, isMock?: boolean) {
  const html = await getWebResource(id, isMock);
  const { $, table } = getTableAndCheerio(html);

  const stockMap = getStockTable($, table);
  const stockName = getStockName($, table, id);
  const lastUpdateTime = getLastUpdateTime($, table);

  return {
    stockMap,
    stockName,
    lastUpdateTime,
  };
}
