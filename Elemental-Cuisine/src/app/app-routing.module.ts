import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'listado', loadChildren: './pages/lists/lists.module#ListsPageModule' },
  { path: 'user-list', loadChildren: './pages/user-list/user-list.module#UserListPageModule' },
  { path: 'table-list', loadChildren: './pages/table-list/table-list.module#TableListPageModule' },
  { path: 'product-list', loadChildren: './pages/product-list/product-list.module#ProductListPageModule' },
  { path: 'producto-detalle', loadChildren: './pages/product-detail/product-detail.module#ProductDetailPageModule' },
  { path: 'agregar-producto', loadChildren: './pages/product-add/product-add.module#ProductAddPageModule' }


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
