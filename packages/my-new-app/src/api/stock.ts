import { environment } from '../environments/environment';
import axios from 'axios';
import { DailyJobParams } from '@myorg/basic';

const { apiHost } = environment;

export interface KeyOption {
  text: string;
  value: number;
}

export interface StockOptions {
  data: KeyOption[];
}

export const getStockOptions = () => {
  const url = `${apiHost}/stock/options`;
  return axios.get<StockOptions>(url);
};

export interface GetStockTableOptions {
  stockID: number;
  mock?: boolean;
  body?: {
    IDs?: number[];
  };
}

export interface Stock {
  name: string;
  value: string;
}

export interface StockInfo {
  data: Stock[];
  name: string;
  lastUpdateTime: string;
}

export const getStockTable = ({
  stockID,
  mock,
  body,
}: GetStockTableOptions) => {
  const url = `${apiHost}/stock/${stockID}`;
  return axios.get<StockInfo>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      mock,
      IDs: JSON.stringify(body?.IDs),
    },
    maxBodyLength: Infinity,
  });
};

export interface StockSchedule {
  IDs: string[];
  cycleTime: Pick<DailyJobParams, 'mins' | 'hours'>;
  type: 'daily';
  // TODO: 記得改掉
  user: string;
  id: string;
}

export interface StockScheduleInfo {
  data: StockSchedule[];
}

export const getStockSchedule = () => {
  const url = `${apiHost}/stock/job/schedule`;
  return axios.get<StockScheduleInfo>(url);
};

export interface SetStockScheduleOptions {
  IDs: string[];
  dailyTime: string;
}

export const setStockSchedule = (data: SetStockScheduleOptions) => {
  const url = `${apiHost}/stock/job/schedule`;
  // return axios.post(url, data, {});
  return axios.request({
    url,
    method: 'POST',
    data,
  });
};
