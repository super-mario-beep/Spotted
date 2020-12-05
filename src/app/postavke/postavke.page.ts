import { PostavkeComponent } from "./postavke.component"
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: PostavkeComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostavkeComponent],
  exports: [PostavkeComponent]
})
export class PostavkePage {}