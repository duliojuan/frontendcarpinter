import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { GeneroService } from '../../services/genero.service'; // Cambiar al servicio correspondiente
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {
  arrayGeneros: any[] = []; // Cambiado a arrayGeneros
  nuevoGeneroForm: FormGroup; 
  generoEnEdicion: any = null; // Género en edición

  constructor(private generoService: GeneroService, private fb: FormBuilder) {
    this.nuevoGeneroForm = this.fb.group({
      id_genero: [''],
      nombre: ['']
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.generoService.fetchGenero().subscribe(
      (result: any) => {
        this.arrayGeneros = result;
      },
      (error) => {
        console.error('Error fetching generos:', error);
      }
    );
  }

  crearGenero(): void {
    if (this.generoEnEdicion) {
      this.actualizarGenero(); // Llama a actualizar si está en edición
    } else {
      const genero = this.nuevoGeneroForm.value; 
      this.generoService.postGenero(genero).subscribe(
        (result) => {
          console.log('Género creado:', result);
          this.arrayGeneros.push(result); 
          this.nuevoGeneroForm.reset(); 
        },
        (error) => {
          console.error('Error creando género:', error);
        }
      );
    }
  }

  editarGenero(genero: any): void {
    this.generoEnEdicion = genero;
    this.nuevoGeneroForm.patchValue(genero);
  }

  actualizarGenero(): void {
    const generoActualizado = this.nuevoGeneroForm.value;
    this.generoService.updateGenero(this.generoEnEdicion.id_genero, generoActualizado).subscribe(
      (result) => {
        console.log('Género actualizado:', result);
        const index = this.arrayGeneros.findIndex(g => g.id_genero === this.generoEnEdicion.id_genero);
        if (index !== -1) {
          this.arrayGeneros[index] = result;
        }
        this.generoEnEdicion = null;
        this.nuevoGeneroForm.reset();
      },
      (error) => {
        console.error('Error actualizando género:', error);
      }
    );
  }

  eliminarGenero(id_genero: string): void {
    console.log('Intentando eliminar género con ID:', id_genero); 
    
    this.generoService.deleteGenero(id_genero).subscribe(
      () => {
        console.log('Género eliminado:', id_genero);
        this.arrayGeneros = this.arrayGeneros.filter(g => g.id_genero !== id_genero);
      },
      (error) => {
        console.error('Error eliminando género:', error);
      }
    );
  }
  
  cancelarEdicion(): void {
    this.generoEnEdicion = null;
    this.nuevoGeneroForm.reset();
  }
}
