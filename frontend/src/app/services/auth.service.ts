import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
providedIn: 'root'
}
)
export class AuthService {
private _registerUrl = "http://localhost:3000/api/auth/register";
private _loginUrl = "http://localhost:3000/api/auth/login";


  constructor(private http: HttpClient, private router: Router) { }

logoutUser() {
  localStorage.removeItem('token')
  this.router.navigate(['/login'])
}

}
