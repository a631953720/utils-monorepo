import axios from 'axios';
import { getStockTable } from './getStockTable';
import { html } from './html';

export async function getSource(id: string, isMock?: boolean) {
  if (isMock) {
    const stockId = `stock_${id}`;
    return getStockTable(html[stockId] ?? html.stock_2330);
  } else {
    const url = `https://goodinfo.tw/tw/StockDetail.asp?STOCK_ID=${id}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.68',
      },
    });
    return getStockTable(response.data);
  }
}
