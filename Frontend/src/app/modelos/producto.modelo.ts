export class ModeloProducto {
    id?: string;
    nombre?: string;
    precio?: number;
    imagen?: string;

    constructor(n?: string, p?: number, i?: string) {
        this.nombre = n;
        this.precio = p;
        this.imagen = i;
    }
}