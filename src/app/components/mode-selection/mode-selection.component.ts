import { Component, OnInit } from '@angular/core';
import { IPartList } from 'src/app/models/parts.model';
import { onlyStat } from 'src/app/models/statistics.model';
import { PartCalculatorService } from 'src/app/services/part-calculator/part-calculator.service';

@Component({
  selector: 'mk-mode-selection',
  templateUrl: './mode-selection.component.html',
  styleUrls: ['./mode-selection.component.scss']
})
export class ModeSelectionComponent {
  select = true;
  selectedParts: IPartList[] = [];

  constructor(private readonly partCalculatorService: PartCalculatorService) {}

  calculateParts(config: onlyStat) {
    this.partCalculatorService.calculate(config).subscribe((result) => {
      this.selectedParts = result;
    })
    this.select = false;
  }

}
