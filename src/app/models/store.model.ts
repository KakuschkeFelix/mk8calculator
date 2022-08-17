import { configDataFeatureKey, partFeatureKey } from "../constants/store";
import { IPartState } from "./parts.model";
import { statistic } from "./statistics.model";

export const genericFeatureKey = 'Calculator';

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
  [partFeatureKey]?: IPartState;
}