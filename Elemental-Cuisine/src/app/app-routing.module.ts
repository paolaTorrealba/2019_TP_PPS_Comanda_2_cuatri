import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'listado', loadChildren: './pages/lists/lists.module#ListsPageModule' },
  { path: 'registro/:object', loadChildren: './pages/register/register.module#RegisterPageModule' },
  //{ path: 'modificar/:object/:id', loadChildren: './pages/add/add.module#AddPageModule' },
  { path: 'configuracion', loadChildren: './pages/configuration/configuration.module#ConfigurationPageModule' },
  { path: 'lista-de-espera', loadChildren: './pages/wait-list/wait-list.module#WaitListPageModule' },
  { path: 'reservar', loadChildren: './pages/book/book.module#BookPageModule' },
  { path: 'delivery', loadChildren: './pages/delivery/delivery.module#DeliveryPageModule' },
  { path: 'encuestas', loadChildren: './pages/poll/poll.module#PollPageModule' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
