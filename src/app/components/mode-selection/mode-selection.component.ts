import { Component, OnInit } from '@angular/core';
import { onlyStat } from 'src/app/models/statistics.model';

@Component({
  selector: 'mk-mode-selection',
  templateUrl: './mode-selection.component.html',
  styleUrls: ['./mode-selection.component.scss']
})
export class ModeSelectionComponent {
  select = true;

  calculateParts(config: onlyStat[]) {
    console.log(config);
  }

}
