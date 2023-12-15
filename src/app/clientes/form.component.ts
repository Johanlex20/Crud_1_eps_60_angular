import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  cliente:Cliente = new Cliente();
  public titulo:string = "Crear Usuario";

  constructor(private clienteService: ClienteService, private router:Router, private activatedRouter: ActivatedRoute){}

  ngOnInit(): void {  
    this.cargarCliente();
  }

  cargarCliente(){
    this.activatedRouter.params.subscribe(params =>{
      let id = params ['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  create(): void{
    //console.log("click");
    //console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente',`Cliente ${ cliente.nombre } creado con éxito!`, 'success')
      }
    )
}

update():void{
  this.clienteService.update(this.cliente).subscribe(cliente=>{
    this.router.navigate(['/clientes'])
    Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, 'success')
  })
}

}
