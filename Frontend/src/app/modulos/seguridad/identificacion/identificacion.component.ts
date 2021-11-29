import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
const cryptoJS = require('crypto-js');

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private servicioSeguridad: SeguridadService, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => { console.log(this.form.value); });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });    
  }

  Ingresar(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      let claveCifrada = cryptoJS.MD5(this.form.get('clave')?.value).toString();

      this.servicioSeguridad.Identificar(this.form.get('usuario')?.value, claveCifrada).subscribe((datos: any) => {
        this.servicioSeguridad.AlmacenarSesion(datos);
        let datosSesion = this.servicioSeguridad.ObtenerSesion();

        console.log(datosSesion.datos.nombre);
        alert('¡Bienvenido ' + datosSesion.datos.nombre + '!\nHa ingresado con éxito.');

        this.router.navigate(['/inicio']);

      }, (error: any) => {
        console.log(error);
        alert('Datos inválidos.');
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get usuario() {
    return this.form.get('usuario');
  }

  get clave() {
    return this.form.get('clave');
  }

}
