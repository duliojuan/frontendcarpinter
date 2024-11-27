import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { UsuarioService } from '../../services/usuario.service'; // Cambiar al servicio de películas
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
  arrayPeliculas: any[] = []; // Cambiado a arrayPeliculas
  nuevoPeliculaForm: FormGroup; 
  peliculaEnEdicion: any = null; // Película en edición

  constructor(private peliculaService: UsuarioService, private fb: FormBuilder) {
    this.nuevoPeliculaForm = this.fb.group({
      id_pelicula: [''],
      genero: [''],
      titulo: [''],
      duracion: [''],
      clasificacion: [''],
      estreno: [''],
      sinopsis: ['']
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.peliculaService.fetchUser().subscribe(
      (result: any) => {
        this.arrayPeliculas = result;
      },
      (error) => {
        console.error('Error fetching peliculas:', error);
      }
    );
  }

  crearPelicula(): void {
    if (this.peliculaEnEdicion) {
      this.actualizarPelicula(); // Llama a actualizar si está en edición
    } else {
      const pelicula = this.nuevoPeliculaForm.value; 
      this.peliculaService.postUser(pelicula).subscribe(
        (result) => {
          console.log('Película creada:', result);
          this.arrayPeliculas.push(result); 
          this.nuevoPeliculaForm.reset(); 
        },
        (error) => {
          console.error('Error creando película:', error);
        }
      );
    }
  }

  editarPelicula(pelicula: any): void {
    this.peliculaEnEdicion = pelicula;
    this.nuevoPeliculaForm.patchValue(pelicula);
  }

  actualizarPelicula(): void {
    const peliculaActualizada = this.nuevoPeliculaForm.value;
    this.peliculaService.updateUser(this.peliculaEnEdicion.id_pelicula, peliculaActualizada).subscribe(
      (result) => {
        console.log('Película actualizada:', result);
        const index = this.arrayPeliculas.findIndex(p => p.id_pelicula === this.peliculaEnEdicion.id_pelicula);
        if (index !== -1) {
          this.arrayPeliculas[index] = result;
        }
        this.peliculaEnEdicion = null;
        this.nuevoPeliculaForm.reset();
      },
      (error) => {
        console.error('Error actualizando película:', error);
      }
    );
  }

  eliminarPelicula(id_pelicula: string): void {
    console.log('Intentando eliminar película con ID:', id_pelicula); // Verificar que ID esté correcto
    
    this.peliculaService.deleteUser(id_pelicula).subscribe(
      () => {
        console.log('Película eliminada:', id_pelicula);
        // Filtrar el array para eliminar el elemento eliminado del frontend
        this.arrayPeliculas = this.arrayPeliculas.filter(p => p.id_pelicula !== id_pelicula);
      },
      (error) => {
        console.error('Error eliminando película:', error);
      }
    );
  }
  
  cancelarEdicion(): void {
    this.peliculaEnEdicion = null;
    this.nuevoPeliculaForm.reset();
  }
}
