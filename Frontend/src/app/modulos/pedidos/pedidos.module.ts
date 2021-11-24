import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { AsignarPedidoComponent } from './asignar-pedido/asignar-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';


@NgModule({
  declarations: [
    AsignarPedidoComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
