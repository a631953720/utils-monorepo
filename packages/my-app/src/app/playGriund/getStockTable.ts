import * as cheerio from 'cheerio';

function getCheerio(e) {
  return cheerio.load(e);
}

type StockResult = {
  id: number;
  name: string;
  value: string;
};

export function getStockTable(data: any) {
  const $ = getCheerio(data);
  // 在 good info 上第15個 table
  const table = $('table').get()[14];

  // 定位元素後重新取得元素陣列並對齊，例如 成交價要對應股價的數字之類的
  const thList = $.load(table)('th').get();
  const findHeadIndex = thList.findIndex((v) => $(v).text().includes('成交價'));
  const newThList = thList.splice(findHeadIndex);

  const r = newThList.map((v) => $(v).text());

  const tdList = $.load(table)('td').get();
  const d = tdList.map((v) => $(v).text());

  const newTdList = d.splice(4);

  const result: StockResult[] = [];

  for (let i = 0; i < r.length; i++) {
    result.push({
      id: i,
      name: r[i],
      value: newTdList[i],
    });
  }

  return result;
}
