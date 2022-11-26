import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cars!: Car[];

  constructor(private _carService: CarService) { }

  ngOnInit(): void {
    this._carService.getCars().subscribe((cars: Car[])=> {
      this.cars = cars;      
    })
  }

}
