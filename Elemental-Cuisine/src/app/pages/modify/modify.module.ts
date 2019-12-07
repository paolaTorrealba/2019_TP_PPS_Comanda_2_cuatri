import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModifyPage } from './modify.page';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { ModifyTableComponent } from 'src/app/components/modify-table/modify-table.component';


const routes: Routes = [
  {
    path: '',
    component: ModifyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModifyPage, ModifyTableComponent, ]
})
export class ModifyPageModule {}
