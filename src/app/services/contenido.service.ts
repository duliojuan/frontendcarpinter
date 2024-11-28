import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private apiUrl = 'https://backendjulian.onrender.com/api/peliculas';

  constructor(private http: HttpClient) { }
  // Obtener todas las películas
  fetchPeliculas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una película por ID
  fetchPeliculaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva película
  postPelicula(pelicula: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pelicula);
  }

  // Actualizar una película
  updatePelicula(id_pelicula: string, pelicula: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id_pelicula}`, pelicula);
  }

  // Eliminar una película
  deletePelicula(id_pelicula: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id_pelicula}`);
  }
}
