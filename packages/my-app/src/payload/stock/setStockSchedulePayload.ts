import { isNil } from 'lodash';
import { DailyJobParams } from '@myorg/basic';

export class SetStockSchedulePayload {
  public errors: string[];
  public isError: boolean;
  public IDs: string[];
  public dailyTime: string;
  public type: 'daily';
  public mock: boolean;
  constructor(data: any) {
    this.IDs = data?.IDs;
    this.errors = [];
    this.type = 'daily';

    this.dailyTime = new Date(data.dailyTime).toISOString();
    this.mock = data.mock ?? false;

    this.validate();
    this.isError = !!this.errors.length;
  }

  // TODO: class-validator and add more check
  private validate() {
    if (isNil(this.dailyTime)) {
      this.errors.push('dailyTime is required');
    }
  }
}
