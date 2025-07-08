import { inject,Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ProductoService } from '../../../../api/services/producto/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TableProductosComponent } from '../../components/table-productos/table-productos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ProgressSpinner,
    TableProductosComponent
  ]
})
export class ListProductosComponent  implements OnInit , OnDestroy{

  productosService =inject(ProductoService);
  productos=signal<Producto[]>([]);
    spinner = true;

ngOnInit(): void {
  this.listProductos()
  
}

ngOnDestroy(): void {
  
}

listProductos(){
    this.productosService.listProductos().subscribe(
        {
          next: (data) => {
            this.productos.set(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.spinner = false;
          }
        }
      )
  }
}
