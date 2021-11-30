import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProducto } from '../modelos/producto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: string = 'http://localhost:3000/productos';
  token: string = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken();
  }

  Listado(): Observable<ModeloProducto[]> {
    return this.http.get<ModeloProducto[]>(this.url);
  }

  BuscarPorId(id: string): Observable<ModeloProducto> {
    return this.http.get<ModeloProducto>(`${this.url}/${id}`);
  }

  Crear(producto: ModeloProducto): Observable<ModeloProducto> {
    return this.http.post<ModeloProducto>(this.url, producto, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  Editar(producto: ModeloProducto): Observable<ModeloProducto> {
    return this.http.put<ModeloProducto>(`${this.url}/${producto.id}`, producto, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  Eliminar(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}
