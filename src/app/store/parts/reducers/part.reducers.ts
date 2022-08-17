import { createReducer, on } from "@ngrx/store";
import { partActions } from "..";
import { initialPartState } from "../state";


export const partReducers = createReducer(
  initialPartState,
  
  on(partActions.loadPartList, (state) => state),
  on(partActions.loadPartListSuccess, (state, args) => ({
    ...state,
    partlists: args.data
    })
  ),
  on(partActions.loadPartListFailure, (state) => state),
)