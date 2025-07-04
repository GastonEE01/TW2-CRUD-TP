import { Routes } from '@angular/router';
import { ListProductosComponent } from './pages/list-productos/list-productos.component';
//import { CreateEmpresaComponent } from './pages/create-empresa/create-empresa.component';
//import { DetailEmpresaComponent } from './pages/detail-empresa/detail-empresa.component';
//import { UpdateEmpresaComponent } from './pages/update-empresa/update-empresa.component';

export const empresaRoutes: Routes = [
    {
        path : '',
        children : [
            {
                path : 'list-productos',
                component : ListProductosComponent
            },
           /**  {
                path : 'create-empresa',
                component : CreateEmpresaComponent
            },
            {
                path : 'update-empresa/:id',
                component : UpdateEmpresaComponent
            },
            {
                path : 'detail-empresa/:id',
                component : DetailEmpresaComponent
            },*/
        ]
    }
    
];
