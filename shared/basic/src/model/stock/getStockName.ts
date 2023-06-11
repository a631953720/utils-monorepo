import * as cheerio from 'cheerio';

export function getStockName(
  $: cheerio.CheerioAPI,
  table: cheerio.Element,
  id: string
): string {
  const aList = $.load(table)('a').get();

  const findName = aList.find((v) => $(v).text().includes(`${id}`));

  return $(findName).text() || `${id}`;
}
