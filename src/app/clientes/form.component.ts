import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  cliente:Cliente = new Cliente();
  public titulo:string = "Crear Usuario";

  constructor(private clienteServices: ClienteService, private router:Router){}

  ngOnInit(): void {  
  }

  create(): void{
    //console.log("Click");
    //console.log(this.cliente);
    this.clienteServices.create(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    );
  }

}
