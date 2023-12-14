import { Injectable, OnInit } from '@angular/core';
import { CLIENTES } from './cliente.json';
import { Cliente } from './cliente';
import { Observable,map,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService implements OnInit {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getAll(): Observable <Cliente[]>{
    //return of (CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
    map(response => response as Cliente[]) 
    );
    
  }

}
