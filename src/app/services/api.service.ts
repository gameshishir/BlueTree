import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postUser(data : any){
    return this.http.post<any>("http://localhost:8081/user/save",data);
  }

  getUser(){
    return this.http.get<any>("http://localhost:8081/user/getAll");
  }

  putUser(data:any,id:number){
    return this.http.put<any>(`http://localhost:8081/user/update/`+id,data);
  }

  deleteUser(id:number){
    return this.http.delete<any>(`http://localhost:8081/user/delete/`+id);
  }
}
