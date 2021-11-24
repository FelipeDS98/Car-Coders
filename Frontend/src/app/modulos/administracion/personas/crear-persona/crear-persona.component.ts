import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})

export class CrearPersonaComponent implements OnInit {

  form: FormGroup;
  url: string = 'http://localhost:3000/personas';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    this.buildForm();
  }

  ngOnInit(): void {
    
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.email]],
      celular: ['', [Validators.required]]
    });
  }

  Guardar(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const datos = this.form.value;
      
      this.http.post(this.url, datos).subscribe(result => {
        console.log(result);
      });

      alert('¡El usuario ' + datos.nombres + ' ha sido registrado con éxito!');


    } else {
      this.form.markAllAsTouched();
    }
  }

  get nombres() {
    return this.form.get('nombres');
  }

  get apellidos() {
    return this.form.get('apellidos');
  }

  get correo() {
    return this.form.get('correo');
  }

  get celular() {
    return this.form.get('celular');
  }
}

