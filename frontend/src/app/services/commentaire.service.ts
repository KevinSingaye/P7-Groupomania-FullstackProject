import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  path = 'http://localhost:3000/api/commentaires' 

  constructor(private cookieService: CookieService, private httpclient:HttpClient ) {}
 findAll():Observable<any> {
    let header = new HttpHeaders().set(
      'Authorization', `Bearer ${this.cookieService.get('token')}`
    );
    return this.httpclient.get(this.path, {headers:header}) }
  create(body:FormData):Observable<any> {
    let header = new HttpHeaders().set(
      'Authorization', `Bearer ${this.cookieService.get('token')}`
    );
    return this.httpclient.post(this.path + '/', body,{
      headers:header
    })
  }
 delete(id:any):Observable<any> {
     let header = new HttpHeaders().set(
      'Authorization', `Bearer ${this.cookieService.get('token')}`
    );
    return this.httpclient.delete(this.path + '/'+id, {headers:header})
  
  }
}
