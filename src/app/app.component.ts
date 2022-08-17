import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { configObject } from './models/store.model';
import * as configDataSelectors from './store/config-data/selectors/config.selectors';

@Component({
  selector: 'mk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mk8calculator';
}
