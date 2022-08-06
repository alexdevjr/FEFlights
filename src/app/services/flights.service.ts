import { Injectable, OnInit } from '@angular/core';
import { Flight } from '../models/flight.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Flight';
  }

  // Obtener todos los vuelos con el mismo destino y origen
  getFlights(orig: string, dest: string): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + `/query/${orig}/${dest}`);
  }

  // Obtener todos los vuelos registrados en base de datos
  getAllFlights(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + '/getAllFlights');
  }

  // Obtener todos los vuelos con el mismo origen
  getAllOrigins(orig: any[]): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + `/origin/${orig}`);
  }

  // Obtener todos los vuelos con el mismo destino
  getAllDestinations(dest: any[]): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + `/destination/${dest}`);
  }

  // Guardar vuelos
  postFlight(flight: Flight): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, flight);
  }

  // Actualizar vuelos
  updateFlight(flight: Flight): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl +`/${flight.id}`, flight);
  }

  // Eliminar vuelos registrados
  deleteFlight(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + `/${id}`);
  }

}


