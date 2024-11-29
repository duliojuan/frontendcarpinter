import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private apiURL = 'https://ferreteriabackend-8u9v.onrender.com/api/genero';

  constructor(private http: HttpClient) { }

  // Obtener todos los géneros
  fetchGenero(): Observable<any> {
    return this.http.get(this.apiURL);
  }

  // Crear un nuevo género
  postGenero(genero: any): Observable<any> {
    return this.http.post(this.apiURL, genero);
  }

  // Actualizar un género existente (necesita un ID de género)
  updateGenero(id_genero: string, genero: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id_genero}`, genero);
  }

  // Eliminar un género (necesita un ID de género)
  deleteGenero(id_genero: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id_genero}`);
  }
}
