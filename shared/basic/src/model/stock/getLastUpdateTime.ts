import * as cheerio from 'cheerio';

export function getLastUpdateTime(
  $: cheerio.CheerioAPI,
  table: cheerio.Element
): string {
  const tdList = $.load(table)('td').get();

  const findTime = tdList.find((v) => $(v).text().includes('資料日期'));

  return $(findTime).text() || '';
}
