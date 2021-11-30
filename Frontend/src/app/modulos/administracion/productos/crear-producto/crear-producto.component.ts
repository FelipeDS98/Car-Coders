import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private servicioProducto: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });
  }

  Agregar(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      let producto = new ModeloProducto(this.nombre?.value, parseInt(this.precio?.value), this.imagen?.value);
      
      this.servicioProducto.Crear(producto).subscribe((datos: ModeloProducto) => {
        alert("¡El producto " + datos.nombre + " fue agregado correctamente!");
        this.router.navigate(['/administracion/buscar-producto']);

      }, (error: any) => {
        alert(error);
      });

    } else {
      this.form.markAllAsTouched();
    }
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get precio() {
    return this.form.get('precio');
  }

  get imagen() {
    return this.form.get('imagen');
  }

}
