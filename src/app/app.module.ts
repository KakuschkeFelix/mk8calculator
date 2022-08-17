import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {components} from './index';
import { MaterialComponents } from './materials';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as configActions from './store/config-data/actions/config.actions';
import { genericFeatureKey } from './models/store.model';
import { configDataFeatureKey } from './constants/store';
import { configDataReducers } from './store/config-data/reducers/config.reducers';
import { ConfigDataEffects } from './store/config-data/effects/config.effects';
import { HttpClientModule } from '@angular/common/http';


const reducers = {
  [configDataFeatureKey]: configDataReducers,
}

const effects = [
  ConfigDataEffects,
]
@NgModule({
  declarations: [...components],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialComponents,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(genericFeatureKey, reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [],
  bootstrap: [components[0]]
})
export class AppModule { 
  constructor(private readonly store: Store) {
    this.store.dispatch(configActions.loadConfigData());
  }
}
