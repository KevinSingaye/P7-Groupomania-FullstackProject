import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-commentaire',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
@Input() commentaire:any;

  constructor() { }

  ngOnInit(): void {
  }

}
