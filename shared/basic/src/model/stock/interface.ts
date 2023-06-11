export type StockResult = {
  name: string;
  value: string;
};

export interface StockInfos {
  stockMap: Map<number, StockResult>;
  stockName: string;
  lastUpdateTime: string;
}
