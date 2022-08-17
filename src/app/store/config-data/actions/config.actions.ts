import { createAction, props } from "@ngrx/store";

import { configObject } from "src/app/models/store.model";

export const loadConfigData = createAction('[Config] Load Config Data');
export const loadConfigDataSuccess = createAction('[Config] Load Config Data Success', props<{ data: configObject[] }>());
export const loadConfigDataFailure = createAction('[Config] Load Config Data Failure', props<{ error: Error }>());