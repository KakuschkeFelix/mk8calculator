import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { partActions } from "..";
import { PartService } from "src/app/services/part/part.service";
import { IPartList } from "src/app/models/parts.model";

@Injectable()
export class partEffects {
  loadPartList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(partActions.loadPartList),
      switchMap(() => 
        this.partService.get().pipe(
          map((data: IPartList[]) => {
            return partActions.loadPartListSuccess({ data })
          }),
          catchError((error: Error) => {
            return of(partActions.loadPartListFailure({ error }))
          })
        )
      )
    );
  });

  constructor(private readonly actions$: Actions, private readonly partService: PartService) {}
}