import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liga-edit',
  templateUrl: './liga-edit.component.html',
  styleUrls: ['./liga-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LigaEditComponent implements OnInit {

  liga = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getLiga(this.route.snapshot.params['id']);
  }

  getLiga(id) {
    this.http.get('/liga/'+id).subscribe(data => {
      this.liga = data;
    });
  }

  updateLiga(id, data) {
    this.http.put('/liga/'+id, data)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/liga-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}