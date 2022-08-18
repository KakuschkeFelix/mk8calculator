import { Component, Input, OnInit } from '@angular/core';
import { IPart, IPartList } from 'src/app/models/parts.model';

@Component({
  selector: 'mk-parts-display',
  templateUrl: './parts-display.component.html',
  styleUrls: ['./parts-display.component.scss']
})
export class PartsDisplayComponent implements OnInit {
  @Input() parts: IPartList[];
  drivers: IPart[];
 bodies: IPart[];
  tyres: IPart[];
  gliders: IPart[];

  constructor() { }

  ngOnInit(): void {
    this.drivers = this.parts.find((list) => list.type == 'driver')?.parts ?? [];
    this.bodies = this.parts.find((list) => list.type == 'body')?.parts ?? [];
    this.tyres = this.parts.find((list) => list.type == 'tyre')?.parts ?? [];
    this.gliders = this.parts.find((list) => list.type == 'glider')?.parts ?? [];
  }

}
