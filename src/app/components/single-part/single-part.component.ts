import { Component, Input, OnInit } from '@angular/core';
import { IPart } from 'src/app/models/parts.model';

@Component({
  selector: 'mk-single-part',
  templateUrl: './single-part.component.html',
  styleUrls: ['./single-part.component.scss']
})
export class SinglePartComponent implements OnInit {

  @Input() part: IPart;

  constructor() { }

  ngOnInit(): void {
  }

}
