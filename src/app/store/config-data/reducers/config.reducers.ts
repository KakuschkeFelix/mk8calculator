import { createReducer, on } from "@ngrx/store";
import { initialConfigDataState } from "src/app/constants/store";
import * as configActions from '../actions/config.actions';

export const configDataReducers = createReducer(
  initialConfigDataState,
  
  on(configActions.loadConfigData, (state) => state),
  on(configActions.loadConfigDataSuccess, (state, args) => ({
    ...state,
    objects: args.data,
  })),
  on(configActions.loadConfigDataFailure, (state) => state)
)