import { createSelector, MemoizedSelector } from "@ngrx/store";
import { partFeatureKey } from "src/app/constants/store";
import { IPart, IPartList, IPartState } from "src/app/models/parts.model";
import { genericState } from "src/app/models/store.model";
import { getGenericState } from "../../generic/selectors/generic.selectors";

export const selectConfigState = createSelector(
  getGenericState,
  (state: genericState): IPartState => {
    return state[partFeatureKey]!;
  }
);

export const selectAllConfigs = createSelector(
  selectConfigState,
  (state: IPartState): IPartList[] => {
    return state.partlists
  }
);

export const selectConfigByType = (
  type: string
  ): MemoizedSelector<genericState, IPartList> => 
  createSelector(
    selectAllConfigs,
    (objects: IPartList[]): IPartList => objects?.find((obj) => obj.type === type)!
  );