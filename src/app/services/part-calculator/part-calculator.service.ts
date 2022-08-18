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

  private calcScoreForPart(part: IPart, stats: onlyStat) {
    const score = 
    stats.acc * part.AC +
    stats.hand * (( part.TA + part.TG + part.TL + part.TW ) / 4) +
    stats.speed * (( part.SA + part.SG + part.SL + part.SW ) / 4) +
    stats.traction * ((part.OF + part.ON) / 2) + 
    stats.weight * part.WG +
    stats.miTu * part.MT;
    return score;
  }

  private calcScoreForList(parts: IPart[], stats: onlyStat, type: string): IPartList {
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

  calcScoreForCombination(parts: IPart[], stats: onlyStat) {
    const combined = this.mergeObject(parts) as IPart;
    const score = this.calcScoreForPart(combined, stats);
    return score;
  }

  /* Function based on 
  https://www.paigeniedringhaus.com/blog/merge-java-script-objects-in-an-array-with-different-defined-properties */
  private mergeObject(obj: any[]): any {
    let res: any = {};
    obj.reduce((_, B) => {
      Object.keys({...res, ...B}).map((key) => {
        if (key === 'name') {
          res[key] = (res[key] ?? '') + ',' + (B[key] ?? '');
        }
        res[key] = (res[key] ?? 0) + (B[key] ?? 0);
      })
    }, {});
    return res;
  }

  calculateBestCombo(parts: IPartList[], stats: onlyStat) {
    let combinations = 1;
    parts.forEach((list) => {
      combinations *= list.parts.length ?? 1;
    })
    if (combinations <= 1024) {
      // TODO: Make each combination
      let scoresAndCombos = [];
      let bestScore = -1;
      for (let driver of parts[0].parts) {
        for (let body of parts[1].parts) {
          for (let tyre of parts[2].parts) {
            for (let glider of parts[3].parts) {
              const combo = [driver, body, tyre, glider];
              const score = this.calcScoreForCombination(combo, stats);
              scoresAndCombos.push({
                combo: combo, 
                score: score
              });
              if (score > bestScore) {
                bestScore = score;
              }
            }
          }
        }
      }
      scoresAndCombos = scoresAndCombos.filter((combo) => combo.score === bestScore);
      return scoresAndCombos;
    } else {
      return undefined;
    }
  }
}
