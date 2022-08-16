import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {components} from './index';
import { MaterialComponents } from './materials';

@NgModule({
  declarations: [...components],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...MaterialComponents,
  ],
  providers: [],
  bootstrap: [components[0]]
})
export class AppModule { }
