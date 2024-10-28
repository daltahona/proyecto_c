import { Routes } from '@angular/router';
import { MostrarClienteComponent } from './components/cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';
import { EliminarClienteComponent } from './components/cliente/eliminar-cliente/eliminar-cliente.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '', 
    pathMatch: 'full' 
  },
  {
    path: "clientes",
    component: MostrarClienteComponent
  },
  {
    path: "clientes/nuevo",
    component: CrearClienteComponent
  },
  {
    path: "clientes/edit/:id",
    component: ActualizarClienteComponent
  },
  {
    path: "clientes/eliminar/:id",
    component: EliminarClienteComponent
  },
];
