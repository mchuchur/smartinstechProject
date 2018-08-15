import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Airline } from '../_models/airline';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  readonly rootUrl = 'https://smartinstech-server-api.herokuapp.com';

  constructor(private http : HttpClient) { }

  registerAirline (airline: Airline): Observable<any> {
    return this.http.post(this.rootUrl + '/api/airlines', airline);
  }

  getAll() {
    return this.http.get<Airline[]>(this.rootUrl + '/api/airlines');
  }

  getById(id: number) {
    return this.http.get(this.rootUrl + '/api/airlines/' + id);
  }

  update(id: number,airline: Airline): Observable<any> {
    localStorage.setItem('currentAirline', JSON.stringify(airline));
    return this.http.put(this.rootUrl + '/api/airlines/' + id, airline);
  }

  delete(id: number) {
    return this.http.delete(this.rootUrl + '/api/airlines/' + id);
  }

}
