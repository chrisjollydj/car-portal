import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { MatDialog } from '@angular/material/dialog';
import { CarFormComponent } from '../car-form/car-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fullCarsList!: Car[];
  carsToShow: Car[] = [];
  infiniteScrollDisabled: boolean = true;
  itemsToAdd: number = 12;
  brand: string[] = [];
  model: string[] = [];
  fuel: string[] = [];
  color: string[] = [];
  car_type: string[] = [];

  constructor(private _carService: CarService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._carService.getCars().subscribe((cars: Car[]) => {
      this.fullCarsList = cars;
      localStorage.setItem('cars-list', JSON.stringify(cars));
      this.appendCarsToShow(0, this.itemsToAdd);
      this.infiniteScrollDisabled = false;
      this.readCarDetails();
    });
  }

  trackByFn(i: number, item: Car) {
    return item.id;
  }

  appendCarsToShow(start: number, end: number) {
    this.carsToShow = [...this.carsToShow, ...this.fullCarsList.slice(start, end)];
  }

  onScroll() {
    let prevItemsToAdd = this.itemsToAdd;
    this.itemsToAdd += 12;
    this.appendCarsToShow(prevItemsToAdd, this.itemsToAdd);
  }

  addCar() {
    const dialogRef = this.dialog.open(CarFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let carsFromStorage: Car[] = JSON.parse(localStorage.getItem('cars-list')!);
        carsFromStorage.push({id: carsFromStorage.length+1, ...result});
        this.fullCarsList = carsFromStorage;
        localStorage.setItem('cars-list', JSON.stringify(carsFromStorage));      
        this.openSnackBar('Car details added successfully')
      }
    });
  }

  readCarDetails() {

  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 3000
    });
  }
}

// console.log([...new Set(this.fullCarsList.map(item => item.color))])