import * as cheerio from 'cheerio';

type StockResult = {
  name: string;
  value: string;
};

export function getStockTable($: cheerio.CheerioAPI, table: cheerio.Element) {
  // 定位元素後重新取得元素陣列並對齊，例如 成交價要對應股價的數字之類的
  const thList = $.load(table)('th').get();
  const findHeadIndex = thList.findIndex((v) => $(v).text().includes('成交價'));
  const newThList = thList.splice(findHeadIndex);

  const r = newThList.map((v) => $(v).text());

  const tdList = $.load(table)('td').get();
  const d = tdList.map((v) => $(v).text());

  // 該表格第一個數字通常是成交價
  const findValueHeadIndex = d.findIndex((v) => !Number.isNaN(Number(v)));
  const newTdList = d.splice(findValueHeadIndex);

  const map: Map<number, StockResult> = new Map();

  for (let i = 0; i < r.length; i++) {
    map.set(i, { name: r[i], value: newTdList[i] });
  }

  return map;
}
