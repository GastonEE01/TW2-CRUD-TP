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
        path : 'productos',
        loadChildren: () => import('./modules/productos/productos.routes').then(m => m.productoRoutes)
    },
    {
        path: 'carrito',
        loadChildren: () => import('./modules/carrito/carrito.routes').then(m => m.carritoRoutes)
    }
]
    },
    {
        path : '**',
        redirectTo : 'login'
    //  redirectTo : 'home'
    }
];
