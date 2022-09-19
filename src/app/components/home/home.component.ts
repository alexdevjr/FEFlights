import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { Flight } from '../../models/flight.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = true;

  flights: Flight[];
  selectedOrigin: string;
  selectedDestination: string;
  filteredOriginList: any[];
  filteredDestinationList: any[];
  noFlightsFound: boolean = false;

  constructor(private flightsService: FlightsService) { }

  filterOrigin = '';
  filterdestination = '';

  ngOnInit(): void {
    const orig = this.filteredOriginList;
    const dest = this.filteredDestinationList;

    this.flightsService.getAllOrigins(orig).subscribe(data =>{
      this.filteredOriginList = data;
      this.loading = false;
    }); 

    this.flightsService.getAllDestinations(dest).subscribe(data =>{
      this.filteredDestinationList = data;
      this.loading = false;
    });

    this.query();

  }

  query(): void {
    this.noFlightsFound = false;
    const origin = this.selectedOrigin;
    const destination = this.selectedDestination;

    this.flightsService.getAllFlights().subscribe(data =>{
      this.flights = data;
      if(data.length === 0 ) {
        this.noFlightsFound = true;
      }
    })
  }

}