import { isNil } from 'lodash';

export class GetStocksPayload {
  public errors: string[];
  public IDs?: number[];
  public isError: boolean;
  constructor(data: any) {
    this.IDs = data?.IDs;
    this.errors = [];

    this.validate();
    this.isError = !!this.errors.length;
  }

  // TODO: class-validator
  private validate() {
    if (!isNil(this.IDs) && !Array.isArray(this.IDs)) {
      this.errors.push('IDs must be an array');
    } else if (Array.isArray(this.IDs) && !this.IDs.length) {
      this.errors.push('IDs must at latest one item');
    } else if (
      Array.isArray(this.IDs) &&
      this.IDs.some((v) => Number.isNaN(Number(v)))
    ) {
      this.errors.push('IDs invalidate');
    }
  }
}
