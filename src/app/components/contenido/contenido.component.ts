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
  arrayPeliculas: any[] = []; 
  nuevoPeliculaForm: FormGroup; 
  peliculaEnEdicion: any = null; 

  constructor(private contenidoService: ContenidoService, private fb: FormBuilder) {
    this.nuevoPeliculaForm = this.fb.group({
      genero: [''],
      titulo: [''],
      duracion: [''],
      clasificacion: [''],
      estreno: [''],
      sinopsis: ['']
    });
  }

  ngOnInit(): void {
    this.fetchPeliculas();
  }

  fetchPeliculas(): void {
    this.contenidoService.fetchPeliculas().subscribe(
      (result: any) => {
        this.arrayPeliculas = result;
      },
      (error) => {
        console.error('Error fetching peliculas:', error);
      }
    );
  }

  crearPelicula(): void {
    const pelicula = this.nuevoPeliculaForm.value; 
    this.contenidoService.postPelicula(pelicula).subscribe(
      (result) => {
        this.arrayPeliculas.push(result); 
        this.nuevoPeliculaForm.reset(); 
      },
      (error) => {
        console.error('Error creando película:', error);
      }
    );
  }

  editarPelicula(pelicula: any): void {
    this.peliculaEnEdicion = pelicula;
    this.nuevoPeliculaForm.patchValue(pelicula);
  }

  actualizarPelicula(): void {
    const peliculaActualizada = this.nuevoPeliculaForm.value;
    this.contenidoService.updatePelicula(this.peliculaEnEdicion.id_pelicula, peliculaActualizada).subscribe(
      (result) => {
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
    this.contenidoService.deletePelicula(id_pelicula).subscribe(
      () => {
        this.arrayPeliculas = this.arrayPeliculas.filter(p => p.id_pelicula !== id_pelicula);
      },
      (error) => {
        console.error('Error eliminando película:', error);
      }
    );
  }
}
