import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  jsonPath = '../../assets/json/cars.json';
  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get<Car[]>(this.jsonPath);
  }
}
