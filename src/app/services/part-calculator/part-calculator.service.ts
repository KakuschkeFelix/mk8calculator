import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, concat, forkJoin, from, merge, Observable } from 'rxjs';
import { combineLatestWith, map, single, switchMap } from 'rxjs/operators';
import { PartsEnum } from 'src/app/enums/parts/parts';
import { IPart, IPartList } from 'src/app/models/parts.model';
import { onlyStat } from 'src/app/models/statistics.model';
import { partSelectors } from 'src/app/store/parts';

interface scoreAndPart {
  score: number;
  part: IPart;
}

@Injectable({
  providedIn: 'root'
})
export class PartCalculatorService {

  constructor (private readonly store: Store) {}

  calculate(stats: onlyStat) {
    let results = []
    const driver = this.store.select(partSelectors.selectPartsByType(PartsEnum.driver))
    .pipe(
      map(parts => this.calcScoreForList(parts, stats, PartsEnum.driver)),
    )

    const body = this.store.select(partSelectors.selectPartsByType(PartsEnum.body))
    .pipe(
      map(parts => this.calcScoreForList(parts, stats, PartsEnum.body)),
    )

    const tyre = this.store.select(partSelectors.selectPartsByType(PartsEnum.tyre))
    .pipe(
      map(parts => this.calcScoreForList(parts, stats, PartsEnum.tyre)),
    )

    const glider = this.store.select(partSelectors.selectPartsByType(PartsEnum.glider))
    .pipe(
      map(parts => this.calcScoreForList(parts, stats, PartsEnum.glider)),
    )

    results = [driver, body, tyre, glider];

    return combineLatest(results);
  }

  calcScoreForPart(part: IPart, stats: onlyStat) {
    const score = 
    stats.acc * part.AC +
    stats.hand * (( part.TA + part.TG + part.TL + part.TW ) / 4) +
    stats.speed * (( part.SA + part.SG + part.SL + part.SW ) / 4) +
    stats.traction * ((part.OF + part.ON) / 2) + 
    stats.weight * part.WG +
    stats.miTu * part.MT;
    return score;
  }

  calcScoreForList(parts: IPart[], stats: onlyStat, type: string): IPartList {
    let bestScore = -1;
    let scoreAndParts: scoreAndPart[] = []
    parts.forEach((part) => {
      const score = this.calcScoreForPart(part, stats);
      if (score > bestScore) {
        bestScore = score;
      }
      scoreAndParts.push({
        score: score,
        part: part,
      });
    });
    
    scoreAndParts = scoreAndParts.filter((part) => {
      return part.score === bestScore;
    });
    
    const resultList: IPartList = {
      type: type,
      parts: scoreAndParts.map(x => x.part),
    }
    return resultList;
  }
}
