import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-display-post',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
@Input() post:any;
  constructor() { }

  ngOnInit(): void {
  }

}
