import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  usuario: any = null;
  nombreUsuario: string = '';

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    const usuarioStr = localStorage.getItem('usuario');
    console.log('localStorage usuario:', usuarioStr); // Para debug
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
      this.nombreUsuario = `${this.usuario.nombre} ${this.usuario.apellido}`;
      console.log('Usuario obtenido:', this.nombreUsuario); // Para debug
    } else {
      console.log('No hay usuario en localStorage'); // Para debug
    }
  }
}