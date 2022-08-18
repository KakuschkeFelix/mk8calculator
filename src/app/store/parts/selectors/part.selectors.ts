import { createSelector, MemoizedSelector } from "@ngrx/store";
import { partFeatureKey } from "src/app/constants/store";
import { IPart, IPartList, IPartState } from "src/app/models/parts.model";
import { genericState } from "src/app/models/store.model";
import { getGenericState } from "../../generic/selectors/generic.selectors";

export const selectPartState = createSelector(
  getGenericState,
  (state: genericState): IPartState => {
    return state[partFeatureKey]!;
  }
);

export const selectAllPartLists = createSelector(
  selectPartState,
  (state: IPartState): IPartList[] => {
    return state.partlists
  }
);

export const selectPartsByType = (
  type: string
  ): MemoizedSelector<genericState, IPart[]> => 
  createSelector(
    selectAllPartLists,
    (objects: IPartList[]): IPart[] => {
      const parts = objects?.find((obj) => obj.type === type)?.parts;
      return parts ? parts : [];
    });