import { Component, OnInit } from '@angular/core';
import { onlyStat } from 'src/app/models/statistics.model';
import { PartCalculatorService } from 'src/app/services/part-calculator/part-calculator.service';

@Component({
  selector: 'mk-mode-selection',
  templateUrl: './mode-selection.component.html',
  styleUrls: ['./mode-selection.component.scss']
})
export class ModeSelectionComponent {
  select = true;

  constructor(private readonly partCalculatorService: PartCalculatorService) {}

  calculateParts(config: onlyStat) {
    this.partCalculatorService.calculate(config).subscribe((result) => {
      console.log(result);
    })
    this.select = false;
  }

}
