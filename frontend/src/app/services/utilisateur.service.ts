import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  path = 'http://localhost:3000/api/auth'

  constructor(private http: HttpClient, private router: Router, private cookieService:CookieService) {

  }
  login(identifiant: string, password: string): Observable<any> {
    const body = { email: identifiant, password }
    return this.http.post(this.path + '/login', body);

  }
  register(body: FormData): Observable<any> {
    return this.http.post(this.path + '/signup', body);

  }

  findOne(id:any):Observable<any> {
    let header = new HttpHeaders().set(
      'Authorization', `Bearer ${this.cookieService.get('token')}`
    );
    return this.http.get(this.path +'/'+ id, {headers:header})
    
  }
  
  logoutUser() {
  sessionStorage.clear()
  this.router.navigate(['/login'])
  this.cookieService.set('token','')
}

}
