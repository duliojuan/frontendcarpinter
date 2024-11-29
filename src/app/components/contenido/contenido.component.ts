import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { ContenidoService } from '../../services/contenido.service'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  arrayClientes: any[] = []; 
  nuevoClienteForm: FormGroup; 
  clienteEnEdicion: any = null; 

  constructor(private contenidoService: ContenidoService, private fb: FormBuilder) {
    this.nuevoClienteForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      duracion: [''],
      edad: [''],
      estado: ['']
    });
  }

  ngOnInit(): void {
    this.fetchClientes();
  }

  fetchClientes(): void {
    this.contenidoService.fetchClientes().subscribe(
      (result: any) => {
        this.arrayClientes = result;
      },
      (error) => {
        console.error('Error fetching clientes:', error);
      }
    );
  }

  crearCliente(): void {
    const cliente = this.nuevoClienteForm.value; 
    this.contenidoService.postCliente(cliente).subscribe(
      (result) => {
        this.arrayClientes.push(result); 
        this.nuevoClienteForm.reset(); 
      },
      (error) => {
        console.error('Error creando película:', error);
      }
    );
  }

  editarCliente(cliente: any): void {
    this.clienteEnEdicion = cliente;
    this.nuevoClienteForm.patchValue(cliente);
  }

  actualizarCliente(): void {
    const clienteActualizada = this.nuevoClienteForm.value;
    this.contenidoService.updateCliente(this.clienteEnEdicion.id_cliente, clienteActualizada).subscribe(
      (result) => {
        const index = this.arrayClientes.findIndex(p => p.id_cliente === this.clienteEnEdicion.id_cliente);
        if (index !== -1) {
          this.arrayClientes[index] = result;
        }
        this.clienteEnEdicion = null;
        this.nuevoClienteForm.reset();
      },
      (error) => {
        console.error('Error actualizando película:', error);
      }
    );
  }

  eliminarCliente(id_cliente: string): void {
    this.contenidoService.deleteCliente(id_cliente).subscribe(
      () => {
        this.arrayClientes = this.arrayClientes.filter(p => p.id_cliente !== id_cliente);
      },
      (error) => {
        console.error('Error eliminando película:', error);
      }
    );
  }
}
