import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario = {};

  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit() {
  }

  saveUsuario() {
    this.http.post('/usuario', this.usuario)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/login']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
