import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liga',
  templateUrl: './liga-list.component.html',
  styleUrls: ['./liga-list.component.css']
})
export class LigaListComponent implements OnInit {
  ligas: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/liga').subscribe(data => {
      this.ligas = data;
    });
  }

}
