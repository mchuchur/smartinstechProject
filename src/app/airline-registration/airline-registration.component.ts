import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../_services/airline.service';
import { AlertService } from '../_services/alert.service';
import { Router } from "@angular/router";
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-airline-registration',
  templateUrl: './airline-registration.component.html',
  styleUrls: ['./airline-registration.component.css']
})
export class AirlineRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private airlineService: AirlineService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      linkToWS: ['', Validators.required],
      //pathToData: ['', Validators.required],
      //TRR: ['', Validators.required],
      ethAddress: ['', Validators.required],
      insurancePrice: ['', Validators.required],
      maxPayout: ['', Validators.required]
    });
  }


  // getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.airlineService.registerAirline(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/airline/login']);
        },
        error => {
          if (error.status === 200) {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/airline/login']);
          } else {
            this.alertService.error(error);
            this.loading = false;
          }
        });
  }

}
