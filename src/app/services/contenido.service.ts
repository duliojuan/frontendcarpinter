import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private apiUrl = 'https://ferreteriabackend-8u9v.onrender.com/api/clientes';

  constructor(private http: HttpClient) { }
  // Obtener todos los clientes
  fetchClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una película por ID
  fetchClienteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva película
  postCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  // Actualizar una película
  updateCliente(id_cliente: string, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id_cliente}`, cliente);
  }

  // Eliminar una película
  deleteCliente(id_cliente: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id_cliente}`);
  }
}
