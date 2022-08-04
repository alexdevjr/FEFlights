export interface Flight {
    id?: number;
    origin: string; 
    destination: string; 
    flightNumber: number;
    airline: string; 
    depart: Date; 
    arrive: Date; 
    nonstop: boolean;
  };