import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  clientes:Cliente[];

  constructor(private clienteServices: ClienteService){}

  ngOnInit(): void {
    this.clienteServices.getAll().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente:Cliente):void{
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Esta seguro?",
      text: `Seguro que desea eliminar al cliente ${(cliente.nombre)}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
  
        this.clienteServices.delete(cliente.id).subscribe(
          response => {
  
            this.clientes = this.clientes.filter(cli => cli !== cliente) 
  
            swalWithBootstrapButtons.fire({
              title: "Cliente Eliminado",
              text: `Cliente ${(cliente.nombre)} Eliminado con Éxito.`,
              icon: "success"
            });
          }
        )
      } 
    });
  
  }

}
