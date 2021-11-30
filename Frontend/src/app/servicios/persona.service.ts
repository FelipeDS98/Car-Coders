import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersona } from '../modelos/persona.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url: string = 'http://localhost:3000/personas';
  token: string = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ListadoPersonas(): Observable<ModeloPersona[]> {
    return this.http.get<ModeloPersona[]>(this.url);
  }

  CrearPersona(persona: ModeloPersona): Observable<ModeloPersona> {
    return this.http.post<ModeloPersona>(this.url, persona, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EditarPersona(persona: ModeloPersona): Observable<ModeloPersona> {
    return this.http.put<ModeloPersona>(this.url, persona, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarPersona(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
