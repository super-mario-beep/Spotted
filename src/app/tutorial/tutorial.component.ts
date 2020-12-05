import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router"
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
//import { PopoverComponent } from '../../component/popover/popover.component';
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {

  constructor(public menu:MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public user: UserService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public popoverController:PopoverController,
    private platform:Platform
    ) {
    setTimeout(()=>{
      document.getElementById("t1").style.display = "block"
      document.getElementById("bp").style.display = "none"
      document.getElementById("bh").style.display = "none"
      this.platform.backButton.subscribe(()=>{
        this.goHome()
      })

    },100)

  }
  counter = 1;
  NextVodic(){
    document.getElementById("bp").style.display = "block"

    if(this.counter > 0){
      document.getElementById("h_tag").style.display = "none"
    }
    
    let item:string = "t" + this.counter.toString()
    document.getElementById(item).style.display = "none"
    this.counter++;
    item = "t" + this.counter.toString()
    document.getElementById(item).style.display = "block"
    if(this.counter > 10){
      document.getElementById("bn").style.display = "none"
      document.getElementById("bh").style.display = "block"

    }

  }
  PrevVodic(){
    document.getElementById("bn").style.display = "block"
    document.getElementById("bh").style.display = "none"

    if(this.counter === 2){
      document.getElementById("h_tag").style.display = "block"
    }
    
    let item:string = "t" + this.counter.toString()
    document.getElementById(item).style.display = "none"
    this.counter--;
    item = "t" + this.counter.toString()
    document.getElementById(item).style.display = "block"
    if(this.counter === 1){
      document.getElementById("bp").style.display = "none"
    }
  }
   async goHome(){
    let loader  = this.loadingController.create({
      message: '',
      duration: 400,
    });
    (await loader).present
    this.router.navigate(['/home']);
    this.router.navigate(['/home/login']);
    setTimeout(()=>{
      window.location.reload();
    },100)
    this.loadingController.dismiss()

  }


  ngOnInit() {
  }

}
