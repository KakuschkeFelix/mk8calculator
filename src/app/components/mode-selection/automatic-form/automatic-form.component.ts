import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'mk-automatic-form',
  templateUrl: './automatic-form.component.html',
  styleUrls: ['./automatic-form.component.scss']
})
export class AutomaticFormComponent {
  slidersForm = this._formBuilder.group({
    speed: 100,
    acceleration: 100,
    weight: 100,
    handling: 100,
    traction: 100,
  });

  constructor(private _formBuilder: FormBuilder) {}

}
