import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { IPartList } from 'src/app/models/parts.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  constructor(private readonly http: HttpClient) { }

  get() {
    const results = []
    for (const url of environment.localAssets) {
      results.push(this.http.get(url) as Observable<IPartList>);
    }

    return forkJoin(results);
  }
}
