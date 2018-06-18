import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

  }

  signIn() {

    this.http.post('/usuario/signin', this.usuario)
      .subscribe(data => {

        const usuario = (data as any);
        console.log(usuario.message);
        localStorage.setItem('token', usuario.token);
        localStorage.setItem('userName', usuario.usuario);
         this.router.navigateByUrl('/home/posiciones');
        }, (err) => {
          console.log(err.error);
        }
      );
  }

}
