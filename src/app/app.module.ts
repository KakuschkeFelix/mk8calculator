import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {components} from './index';

@NgModule({
  declarations: [...components],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [components[0]]
})
export class AppModule { }
