import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiURL = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  fetchUser(): Observable<any> {
    return this.http.get(this.apiURL); 
  }
  
  // Crear un nuevo usuario
  postUser(peliculas: any): Observable<any> {
    return this.http.post(this.apiURL, peliculas);
  }
  
  // Actualizar un usuario existente (necesita un ID de usuario)
  updateUser(id_pelicula: string, peliculas: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id_pelicula}`, peliculas);
  }
  
  // Eliminar un usuario (necesita un ID de usuario)
  deleteUser(id_pelicula: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id_pelicula}`);
  }
}
