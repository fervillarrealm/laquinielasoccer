import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liga-create',
  templateUrl: './liga-create.component.html',
  styleUrls: ['./liga-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LigaCreateComponent implements OnInit {

  liga = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveLiga() {
    this.http.post('/liga', this.liga)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/liga-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}