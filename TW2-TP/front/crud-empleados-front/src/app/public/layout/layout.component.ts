import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../api/services/localStorage/localStorage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, OnDestroy {
  usuario: any = null;
  nombreUsuario: string = '';
  
  private localStorageService = inject(LocalStorageService);
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.localStorageService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      if (usuario) {
        this.nombreUsuario = `${usuario.nombre} ${usuario.apellido}`;
        console.log('Usuario actualizado:', this.nombreUsuario);
      } else {
        this.nombreUsuario = '';
        console.log('No hay usuario logueado');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}