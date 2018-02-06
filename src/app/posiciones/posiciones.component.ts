import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.css']
})
export class PosicionesComponent implements OnInit {
  equipos: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/posicion').subscribe(data => {
      this.equipos = data;
      console.log(data);
    });
  }


}
