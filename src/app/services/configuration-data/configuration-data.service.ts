import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { configObject } from 'src/app/models/store.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationDataService {
  constructor(private readonly http: HttpClient) { }

  get() {
    const results = []
    for (const url of environment.configurationFiles) {
      results.push(this.http.get(url) as Observable<configObject>);
    }

    return forkJoin(results);
  }

}
