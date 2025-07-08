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
import { FormsModule } from '@angular/forms';

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
    TableProductosComponent,
    FormsModule
  ]
})
export class ListProductosComponent  implements OnInit , OnDestroy{

  productosService =inject(ProductoService);
  productos=signal<Producto[]>([]);
  categorias = signal<string[]>(['inalambricos', 'tactil', 'perifericos', 'analogico']);;
  categoriaSeleccionada: string = '';
//categoriaSeleccionada = ["inalambricos","tactil","perifericos","analogicos"]
    spinner = true;

ngOnInit(): void {
const cat = localStorage.getItem('categoria');
    if (cat) {
      this.categoriaSeleccionada = cat;
      this.buscarPorCategoria();
    } else {
      this.listProductos(); 
    }
}

ngOnDestroy(): void {
  
}

cargarCategorias() {
  this.productosService.listCategorias().subscribe({
    next: (data) => this.categorias.set(data),
    error: (err) => console.error(err)
  });
}
  buscarPorCategoria(): void {      
      if (this.categoriaSeleccionada === '') {
    localStorage.removeItem('categoria');
    this.listProductos(); 
  } else {
    localStorage.setItem('categoria', this.categoriaSeleccionada);
    this.productosService.listProductosPorCategoria(this.categoriaSeleccionada).subscribe({
      next: (data) => this.productos.set(data),
      error: (err) => console.log(err),
      complete: () => (this.spinner = false),
    });
  }
      
    
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
