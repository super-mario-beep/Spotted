import { ChatComponent } from "./chat.component"
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatComponent],
  exports: [ChatComponent]
})
export class ChatPage {}