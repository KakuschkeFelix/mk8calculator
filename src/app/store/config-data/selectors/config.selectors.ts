import { getGenericState } from "../../generic/selectors/generic.selectors";
import { createSelector, MemoizedSelector } from "@ngrx/store";
import { configDataFeatureKey } from "src/app/constants/store";
import { configDataState, configObject, genericState } from "src/app/models/store.model";

export const selectConfigState = createSelector(
  getGenericState,
  (state: genericState): configDataState => {
    return state[configDataFeatureKey]!;
  }
);

export const selectAllConfigs = createSelector(
  selectConfigState,
  (state: configDataState): configObject[] => {
    return state.objects
  }
);

export const selectConfigByType = (
  type: string
  ): MemoizedSelector<genericState, configObject> => 
  createSelector(
    selectAllConfigs,
    (objects: configObject[]): configObject => objects?.find((obj) => obj.type === type)!
  );