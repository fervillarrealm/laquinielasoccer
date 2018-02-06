import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-liga-detail',
  templateUrl: './liga-detail.component.html',
  styleUrls: ['./liga-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LigaDetailComponent implements OnInit {

  liga = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getLigaDetail(this.route.snapshot.params['id']);
  }

  getLigaDetail(id) {
    this.http.get('/liga/'+id).subscribe(data => {
      this.liga = data;
    });
  }

  deleteLiga(id) {
    this.http.delete('/liga/'+id)
      .subscribe(res => {
          this.router.navigate(['/ligas']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
