import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { TableFormComponent } from 'src/app/components/table-form/table-form.component';
import { EmployeeFormComponent } from 'src/app/components/employee-form/employee-form.component';
import { ClientFormComponent } from 'src/app/components/client-form/client-form.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage, ProductFormComponent, TableFormComponent, EmployeeFormComponent, ClientFormComponent]
})
export class RegisterPageModule {}
