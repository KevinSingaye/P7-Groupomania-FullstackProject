import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PublicationService {
   path = 'http://localhost:3000/api/publications'

  constructor(private httpclient:HttpClient, private cookieService: CookieService) { }

  findAll():Observable<any> {
    return this.httpclient.get(this.path)
  }


  
  create(body:FormData):Observable<any> {
    let header = new HttpHeaders().set(
      'Authorization', `Bearer ${this.cookieService.get('token')}`
    );
    return this.httpclient.post(this.path + '/', body,{
      headers:header
    })
  }

  update(id:any,body:FormData):Observable<any> {
    return this.httpclient.put(this.path + '/'+id, body)
  
  }

  delete(id:any):Observable<any> {
    return this.httpclient.delete(this.path + '/'+id)
  
  }
  
}
