import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seq',
  templateUrl: './seq.component.html',
  styleUrls: ['./seq.component.css']
})
export class SeqComponent implements OnInit {
  @Input() pattern;

  constructor() { }

  ngOnInit() {}

}
