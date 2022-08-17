export interface statistic {
  name: string;
  field: string;
  min: number;
  max: number;
}

export interface onlyStat {
  field: string;
  value: number;
}