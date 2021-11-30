import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  form: FormGroup;
  id: string = '';

  constructor(private formBuilder: FormBuilder, private servicioProducto: ProductoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.Formulario();
    this.id = this.route.snapshot.params['id'];

    this.servicioProducto.BuscarPorId(this.id).subscribe((producto: ModeloProducto) => {
      this.form.setValue({ id: this.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen });
    });
  }

  Formulario() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });
  }

  Editar(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      let producto = new ModeloProducto(this.nombre?.value, parseInt(this.precio?.value), this.imagen?.value);
      producto.id = this.id;

      this.servicioProducto.Editar(producto).subscribe(() => {
        alert("¡El producto " + producto.nombre + " fue editado correctamente!");
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
