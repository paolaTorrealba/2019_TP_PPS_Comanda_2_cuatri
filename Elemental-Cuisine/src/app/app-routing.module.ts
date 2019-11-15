import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'listado', loadChildren: './pages/lists/lists.module#ListsPageModule' },
  { path: 'user-list', loadChildren: './pages/user-list/user-list.module#UserListPageModule' },
  { path: 'table-list', loadChildren: './pages/table-list/table-list.module#TableListPageModule' },
  { path: 'registro/:object', loadChildren: './pages/register/register.module#RegisterPageModule' },
  //{ path: 'modificar/:object/:id', loadChildren: './pages/add/add.module#AddPageModule' },
  //{ path: 'borrar/:object/:id', loadChildren: './pages/add/add.module#AddPageModule' },
  { path: 'configuracion', loadChildren: './pages/configuration/configuration.module#ConfigurationPageModule' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
