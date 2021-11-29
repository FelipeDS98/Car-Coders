import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url: string = 'http://localhost:3000/identificarPersona';
  datosUsuarioSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) {
    this.VerificarSesionActual();
  }

  VerificarSesionActual() {
    let datos = this.ObtenerSesion();

    if (datos) {
      this.RefrescarSesion(datos);
    }
  }

  RefrescarSesion(datos: ModeloIdentificar) {
    this.datosUsuarioSesion.next(datos);
  }

  ObtenerDatosUsuarioSesion() {
    return this.datosUsuarioSesion.asObservable();
  }

  Identificar(usuario: string, clave: string): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(this.url, {
      usuario: usuario,
      clave: clave
    });
  }

  AlmacenarSesion(datos: ModeloIdentificar) {
    datos.identificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion", stringDatos);

    this.RefrescarSesion(datos);
  }

  ObtenerSesion() {
    let datosString = localStorage.getItem("datosSesion");
    
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos;
    } else {
      return;
    }
  }

  EliminarSesion() {
    localStorage.removeItem("datosSesion");
    this.RefrescarSesion(new ModeloIdentificar());
  }

  InicioSesion() {
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }
}

