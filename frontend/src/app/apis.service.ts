import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApisService {

  constructor(private httpRequest: HttpClient) {}
  comaredProducts:any
    
  checkLogin(email:string, password:string) : Observable<any>{
    return this.httpRequest.post('http://127.0.0.1:5000/api/checklogin', {email,password})
   }
    
  getPhones() : Observable<any>{
    return this.httpRequest.get('http://127.0.0.1:5000/api/dashboard/phones')
   }
    
  getlaptops() : Observable<any>{
    return this.httpRequest.get('http://127.0.0.1:5000/api/dashboard/laptops')
   }
    
  getablets() : Observable<any>{
    return this.httpRequest.get('http://127.0.0.1:5000/api/dashboard/tablets')
   }

   getresults(quary:any, category:string) :Observable<any>{
    return this.httpRequest.get('http://127.0.0.1:5000/api/dashboard/search', {params: {quary, category}})
   }

   getComparison(comparedPhones:any) :Observable<any>{
    return this.httpRequest.post('http://127.0.0.1:5000/api/dashboard/compare',{comparedPhones})
   }
}
