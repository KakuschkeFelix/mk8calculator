import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {components} from './index';
import { MaterialComponents } from './materials';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [...components],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialComponents,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [components[0]]
})
export class AppModule { }
