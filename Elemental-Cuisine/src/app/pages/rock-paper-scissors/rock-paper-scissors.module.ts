import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RockPaperScissorsPage } from './rock-paper-scissors.page';

const routes: Routes = [
  {
    path: '',
    component: RockPaperScissorsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RockPaperScissorsPage]
})
export class RockPaperScissorsPageModule {}
