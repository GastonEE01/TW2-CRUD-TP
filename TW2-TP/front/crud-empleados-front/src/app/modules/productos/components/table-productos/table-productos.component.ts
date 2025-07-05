import { Component, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-table-productos',
  imports: [ToastModule, TableModule, ButtonModule, ProgressSpinner ],
  templateUrl: './table-productos.component.html',
  styleUrl: './table-productos.component.css'
})

export class TableProductosComponent {
  productos = input<Producto[]>([]);

}
