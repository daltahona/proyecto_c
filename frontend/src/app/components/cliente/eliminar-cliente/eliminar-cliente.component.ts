import { Component, OnInit, inject } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eliminar-cliente',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  clienteService = inject(ClienteService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void { }

  eliminarCliente(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          console.log('Cliente eliminado correctamente');
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.log(err);
          console.log('Error al eliminar el cliente');
        }
      });
    }
  }
}