import { createAction, props } from "@ngrx/store";
import { IPartList } from "src/app/models/parts.model";

export const loadPartList = createAction('[Part] Load Part List');
export const loadPartListSuccess = createAction('[Part] Load Part List Success', props<{ data: IPartList[] }>());
export const loadPartListFailure = createAction('[Part] Load Part List Failure', props<{ error: Error }>());