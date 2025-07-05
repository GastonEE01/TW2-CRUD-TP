import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LayoutComponent } from './public/layout/layout.component';

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
        path: '',
        component: LayoutComponent,
        children: [
    {
        path: 'home',
        component: HomeComponent
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
    }
]
    },
    {
        path : '**',
        redirectTo : 'login'
    //  redirectTo : 'home'
    }
];
