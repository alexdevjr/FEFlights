import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Flight } from '../../models/flight.model';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private flightService: FlightsService,
              private toastr: ToastrService) { }

  loading = true;
 
  origin: string;
  destination: string;
  flightNumber: number;
  airline: string;
  depart: Date;
  arrive: Date;
  nonstop: boolean = false;
  flightList: any[];

  ngOnInit(): void {
    this.refresh();
  }

  toggleNonStop(){
    this.nonstop = !this.nonstop;
  }

  sendFlight(){
    const flight: Flight = {
      origin: this.origin, 
      destination: this.destination,
      flightNumber: this.flightNumber,
      airline: this.airline,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop
    }
    this.flightService.postFlight(flight).subscribe(data => {
      this.toastr.success('Vuelo registrado con éxito!', 'Vuelo registrado!');
      if(data && data['origen']){
        this.refresh();
      }
      this.refresh();
    });
  }

  update(flight:Flight){
    this.flightService.updateFlight(flight).subscribe(data =>{
      this.toastr.info('Vuelo actualizado con éxito!', 'Vuelo actualizado!');
      if(data && data['afectado']){
        this.refresh();
      }
      this.refresh();
    });
  }

  delete(flight:Flight){
    if (window.confirm('¿Está seguro de que desea eliminar este vuelo?')){
      this.flightService.deleteFlight(flight.id).subscribe(data =>{
        this.toastr.error('Vuelo eliminado con éxito!', 'Vuelo eliminado');
        if(data && data['afectado']){
          this.refresh();
        }
        this.refresh();
      });
    }
  }

  refresh(){
    this.loading = true;
    this.flightService.getAllFlights().subscribe(data =>{
      this.flightList = data;
      this.loading = false;
    })
  }

}
