import { StockInfos } from '@myorg/basic';

export function formatLineMsg({
  stockName,
  stockMap,
  lastUpdateTime,
}: StockInfos) {
  const formatString: string[] = [`\n股票名稱: ${stockName}`];
  stockMap.forEach(({ name, value }) => {
    formatString.push(`${name}: ${value}`);
  });
  formatString.push(lastUpdateTime);

  return formatString.join('\n');
}
