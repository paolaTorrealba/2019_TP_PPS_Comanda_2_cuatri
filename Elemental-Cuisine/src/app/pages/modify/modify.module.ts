import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModifyPage } from './modify.page';
import { Routes, RouterModule } from '@angular/router';
import { ModifyTableComponent } from 'src/app/components/modify-table/modify-table.component';
import { ModifyUserComponent } from 'src/app/components/modify-user/modify-user.component';
import { ModifyProductComponent } from 'src/app/components/modify-product/modify-product.component';


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
  declarations: [ModifyPage, ModifyTableComponent, ModifyUserComponent ,ModifyProductComponent]
})
export class ModifyPageModule {}
