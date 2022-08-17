import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {components} from './index';
import { MaterialComponents } from './materials';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {configActions} from './store/config-data/';
import { genericFeatureKey } from './models/store.model';
import { configDataFeatureKey, partFeatureKey } from './constants/store';
import { configDataReducers } from './store/config-data/reducers/config.reducers';
import { ConfigDataEffects } from './store/config-data/effects/config.effects';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { partActions, partReducers } from './store/parts';
import { partEffects } from './store/parts/effects/part.effects';


const reducers = {
  [configDataFeatureKey]: configDataReducers,
  [partFeatureKey]: partReducers,
}

const effects = [
  ConfigDataEffects,
  partEffects,
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
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: true,
    }),
  ],
  providers: [],
  bootstrap: [components[0]]
})
export class AppModule { 
  constructor(private readonly store: Store) {
    this.store.dispatch(configActions.loadConfigData());
    this.store.dispatch(partActions.loadPartList());
  }
}
