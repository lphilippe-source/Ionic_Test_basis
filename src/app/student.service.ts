import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const URL = 'http://localhost:3001/students/'
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  ajaxGet(id?:number){
    return this.http.get(URL)
  }
}
