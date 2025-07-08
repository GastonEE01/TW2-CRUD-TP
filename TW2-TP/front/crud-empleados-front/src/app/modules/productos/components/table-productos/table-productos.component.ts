import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-table-productos',
  standalone: true,
  imports: [TableModule, ButtonModule, TooltipModule, CommonModule, ToastModule],
  templateUrl: './table-productos.component.html',
  styleUrl: './table-productos.component.css'
})
export class TableProductosComponent implements OnInit {
  @Input() productos: Producto[] = [];
  @Output() eventEmitterTable = new EventEmitter<void>();
  
  usuarioLogueado: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.verificarUsuarioLogueado();
  }

  verificarUsuarioLogueado() {
    const usuario = localStorage.getItem('usuario');
    this.usuarioLogueado = !!usuario;
  }


  agregarAlCarrito(producto: Producto) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    if (!usuario.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes iniciar sesión para agregar productos al carrito'
      });
      return;
    }

    this.carritoService.agregarProducto(usuario.id, producto.idProducto, 1).subscribe({
      next: (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `${producto.nombre} agregado al carrito`
        });
      },
      error: (error) => {
        console.error('Error completo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al agregar producto al carrito'
        });
      }
    });
  }
}
