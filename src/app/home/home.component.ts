import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  equipos: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/posicion').subscribe(data => {
      this.equipos = data;
      console.log(data);
    });
  }

}
