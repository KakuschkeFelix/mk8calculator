import { configDataFeatureKey } from "../constants/store";
import { statistic } from "./statistics.model";

export const genericFeatureKey = 'Generic';

export type genericConfigObjectType = statistic; 

export interface configObject {
  type: string;
  value: genericConfigObjectType[];
}

export interface configDataState {
  objects: configObject[];
}

export interface genericState {
  [configDataFeatureKey]?: configDataState;
}