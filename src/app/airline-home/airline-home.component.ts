import { Component, OnInit } from '@angular/core';
import { Airline } from '../_models/airline';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineService } from '../_services/airline.service';
import { AlertService } from '../_services/alert.service';
import { Router } from "@angular/router";
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-airline-home',
  templateUrl: './airline-home.component.html',
  styleUrls: ['./airline-home.component.css']
})
export class AirlineHomeComponent implements OnInit {
  updateForm: FormGroup;
  currentAirline: Airline;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private airlineService: AirlineService,
    private alertService: AlertService,
    private router: Router) {
      
      this.currentAirline = JSON.parse(localStorage.getItem('currentAirline'));

     }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      name: [this.currentAirline.name, Validators.required],
      email: [this.currentAirline.email, Validators.required],
      username: [this.currentAirline.username, Validators.required],
      password: [this.currentAirline.password, [Validators.required, Validators.minLength(6)]],
      linkToWS: [this.currentAirline.linkToWS, Validators.required],
      //pathToData: [this.currentAirline.pathToData, Validators.required],
      //TRR: [this.currentAirline.TRR, Validators.required],
      ethAddress: [this.currentAirline.ethAddress, Validators.required],
      insurancePrice: [this.currentAirline.insurancePrice, Validators.required],
      maxPayout: [this.currentAirline.maxPayout, Validators.required]
    });
  }

  // getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  delete(){
    this.airlineService.delete(this.currentAirline._id)
    .pipe(first())
    .subscribe(
      data => {
        this.alertService.success('Deleted successfuly', true);
        this.router.navigate(['/airline/login']);
      },
      error => {
        if (error.status === 200) {
          this.alertService.success('Deleted successfuly', true);
          this.router.navigate(['/airline/login']);
        } else {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  } 

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }

    this.loading = true;
    this.airlineService.update(this.currentAirline._id, this.updateForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update successful');
        },
        error => {
          if (error.status === 200) {
            this.alertService.success('Update successful');
          } else {
            this.alertService.error(error);
            this.loading = false;
          }
        });
  }


}
