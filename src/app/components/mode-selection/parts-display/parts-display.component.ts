import { Component, Input, OnInit } from '@angular/core';
import { IPart } from 'src/app/models/parts.model';

@Component({
  selector: 'mk-parts-display',
  templateUrl: './parts-display.component.html',
  styleUrls: ['./parts-display.component.scss']
})
export class PartsDisplayComponent implements OnInit {
  @Input() parts: IPart[];

  constructor() { }

  ngOnInit(): void {
  }

}
