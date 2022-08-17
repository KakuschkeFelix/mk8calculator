import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import * as ConfigDataActions from '../actions/config.actions';
import { ConfigurationDataService } from "src/app/services/configuration-data/configuration-data.service";
import { configObject } from "src/app/models/store.model";

@Injectable()
export class ConfigDataEffects {
  loadConfigData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigDataActions.loadConfigData),
      switchMap(() => 
        this.configService.get().pipe(
          map((data: configObject[]) => {
            return ConfigDataActions.loadConfigDataSuccess({ data})
          }),
          catchError((error: Error) => {
            return of(ConfigDataActions.loadConfigDataFailure({error}))
          })
        )
      )
    );
  });

  constructor(private readonly actions$: Actions, private readonly configService: ConfigurationDataService) {}
}