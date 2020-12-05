import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router"
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
//import { PopoverComponent } from '../../component/popover/popover.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor(public menu:MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public user: UserService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public popoverController:PopoverController
    ) {

  }


  ngOnInit() {
    //po broju posta
    // po datu stavljanja
    // po lokaciji
    // po kljucnoj rijeci
    //gdje je tagana osoba
    
    //prodai korisnika po broju
    // prodai korisnika po broju komentara koji je ostaviio
    // korisnika po postu koji je postavio
  }

}
