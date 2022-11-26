import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() car!: Car;

  constructor() { }

  ngOnInit(): void {
  }

}
