import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { onlyStat, statistic } from 'src/app/models/statistics.model';
import { configSelectors } from 'src/app/store/config-data';

@Component({
  selector: 'mk-automatic-form',
  templateUrl: './automatic-form.component.html',
  styleUrls: ['./automatic-form.component.scss']
})
export class AutomaticFormComponent implements OnInit {
  slidersForm = this._formBuilder.group({});
  statistics: statistic[];

  @Output() sendConfig: EventEmitter<onlyStat[]> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder, private readonly store: Store) {}

  ngOnInit(): void {
      this.store.select(configSelectors.selectConfigByType('automaticFormConfig')).subscribe((config) => {
        if (config) {
          this.statistics = config.value;
          config.value.forEach((val) => {
            this.slidersForm.addControl(val.field, new FormControl(val.min))
          })
        }
      })
  }

  makeResults() {
    const results: onlyStat[] = [];
    for (const [key, value] of Object.entries(this.slidersForm.value)) {
      results.push({
        field: key,
        value: value as number,
      });
    }
    this.sendConfig.emit(results);
    // TODO: Put these stats in store instead
  }

}
