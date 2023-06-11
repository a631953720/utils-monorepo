import { environment } from '../environments/environment';
import axios from 'axios';
import { urlencoded } from 'express';

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
  console.log(body);
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
