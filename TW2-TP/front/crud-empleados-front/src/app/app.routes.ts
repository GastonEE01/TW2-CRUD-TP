import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';

export const routes: Routes = [

    {
        path : '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path : 'login',
        loadChildren: () => import('./modules/login/login.routes').then(m => m.loginRoutes)
    },
    {
        path : 'empleados',
        loadChildren: () => import('./modules/empleados/empleados.routes').then(m => m.empleadosRoutes)
    },
    {
        path : 'empresas',
        loadChildren : ()=>import('./modules/empresas/empresas.routes').then(e => e.empresaRoutes)
    },
    {
    path : 'productos',
    loadChildren: () => import('./modules/productos/productos.routes').then(m => m.productoRoutes)
    },
    {
        path : '**',
        redirectTo : 'login'
    //  redirectTo : 'home'
    }
];
