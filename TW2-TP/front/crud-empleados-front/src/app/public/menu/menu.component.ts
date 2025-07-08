import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  usuario: any = null;

  constructor(private router: Router) {
    // Recupera el usuario del localStorage (ajusta la clave si es diferente)
    const usuarioGuardado = localStorage.getItem('usuario');
    this.usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irAProductos() {
    this.router.navigate(['/productos/list-productos']);
  }

  irAlCarrito() {
    this.router.navigate(['/carrito/list-carrito']);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
