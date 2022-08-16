import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationDataService {

  constructor(private readonly http: HttpClient) { }

  get() {
    const getRequests: any[] = [];

    environment.configurationFiles.forEach((url) => {
      getRequests.push(this.http.get(url));
    });

    return forkJoin(getRequests).pipe(
      map((results: any) => {
        const loadedData: any[] = [];

        results.forEach((data: any) => {
          loadedData.push(data);
        });
        return loadedData;
      })
    )
  }
}
