import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fullCarsList!: Car[];
  carsToShow: Car[] = [];
  infiniteScrollDisabled: boolean = true;
  itemsToAdd: number = 10;

  constructor(private _carService: CarService) { }

  ngOnInit(): void {
    this._carService.getCars().subscribe((cars: Car[]) => {
      this.fullCarsList = cars;
      this.appendCarsToShow(0, this.itemsToAdd);
      this.infiniteScrollDisabled = false;
    })
  }

  trackByFn(i: number, item: Car) {
    return item.id;
  }

  appendCarsToShow(start: number, end: number) {
    this.carsToShow = [...this.carsToShow, ...this.fullCarsList.slice(start, end)];
  }

  onScroll() {
    let prevItemsToAdd = this.itemsToAdd;
    this.itemsToAdd += 10;
    this.appendCarsToShow(prevItemsToAdd, this.itemsToAdd);
  }
}
