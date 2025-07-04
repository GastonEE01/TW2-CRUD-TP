import { Routes } from '@angular/router';
import { ListProductosComponent } from './pages/list-productos/list-productos.component';

export const productoRoutes: Routes = [
    {
        path : '',
        children : [
            {
                path : 'list-productos',
                component : ListProductosComponent
            },
        ]
    }
    
];
