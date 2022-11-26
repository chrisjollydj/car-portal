import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Brands, CarType, Color, Fuels, Models } from 'src/app/models/car';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  carDetailsForm: FormGroup;
  brands: string[] = Brands;
  models: string[] = Models;
  fuels: string[] = Fuels;
  carTypes: string[] = CarType;
  colors: string[] = Color;
  years = [...Array(new Date().getFullYear() - 1950 + 1).keys()].map(x => x + 1950).sort((a, b) => b - a);

  constructor(private fb: FormBuilder) {
    this.carDetailsForm = this.fb.group({
      "brand": ['', Validators.required],
      "model": ['', Validators.required],
      "km": ['', Validators.required],
      "year": ['', Validators.required],
      "fuel": ['', Validators.required],
      "color": ['', Validators.required],
      "car_type": ['', Validators.required],
      "e_car": ['', Validators.required],
      damages: this.fb.array([])
    });
  }

  ngOnInit(): void {
    console.log(this.carDetailsForm.value);
  }

  saveDetails() {
    console.log(this.carDetailsForm.value);

  }

  get damagesControl() {
    return this.carDetailsForm.controls["damages"] as FormArray;
  }

  addDamages() {
    const damage = this.fb.group({
      "piece": ['', Validators.required],
      "problem": ['', Validators.required]
    });
    this.damagesControl.push(damage);
  }

  deleteDamages(index: number) {
    this.damagesControl.removeAt(index);
  }
}
