import { createFeatureSelector, MemoizedSelector } from "@ngrx/store";
import { genericFeatureKey, genericState } from "src/app/models/store.model";

export const getGenericState: MemoizedSelector<genericState, genericState> = createFeatureSelector(genericFeatureKey);