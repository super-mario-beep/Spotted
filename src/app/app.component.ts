import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { MainVariables } from './app.variables';
import { Storage } from '@ionic/storage';


import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { UserService } from './user.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  //userIsAdmin = this.user.isAdmin()
  ApkVerzija = "1.1.9";
  userName = ""
  userId = "123456789";
  userEmail = "email_user_adres@gmail.com";
  userStatus = "Ne";
  jezik:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingController:LoadingController,
    public menu: MenuController,
    public toastController: ToastController,
    public user:UserService,
    public router: Router,
    public mainVar:MainVariables,
    private storage: Storage,
    private menuCtrl: MenuController,
    private screenOrientation: ScreenOrientation,
    private http:Http,
    private notif:LocalNotifications

    //private Screenshot:Screenshot,


  ) {
    this.splashScreen.hide()
    this.statusBar.hide()
    this.initializeApp();
    this.WelcomeToast()
    this.LoadAll()
    let json = JSON.stringify(this.hrv)
    this.jezik = JSON.parse(json)

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.GetNotifInterval()
    /*setTimeout(()=>{
      this.getBackgroundNotifInterval()
    },3000)*/

  }

  /* a = [
    "Ejj, imaš novu poruku.",
    "Upravo ti je došla nova poruka.",
    "Ej, netko ti je poslao poruku.",
  ]

  
  this.localNotifications.schedule({
    title:"Spotted",
    text: 'Ejj, imaš novu poruku.',
    trigger: {at: new Date(new Date().getTime() + 5000)},
    led: 'FF0000',
    vibrate: true

});*/


  GetNotifInterval(){
    if(this.router.url === "/home"){
      //this.userID = this.user.getID()
      let serverURL = "https://www.spotted.com.hr/has_notif/"
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {id:this.user.getID(),pass:3},
          url       : any      	= serverURL + "index.php";
  
      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>{
        let answer = data.text();
        if(answer.length > 3){
          let json = JSON.parse(answer)

          if(json.notif === "1"){
            this.user.SetNotif(1)
            if(this.router.url === "/home"){
              this.ShowNotifAnimation();
            }
          }else if(json.notif === "2"){
            this.user.SetNotif(2)
            if(this.router.url === "/home"){
              this.ShowNotifAnimation();
            }
          }else{
            this.user.SetNotif(0)
            if(this.router.url === "/home"){
              setTimeout(()=>{
                document.getElementById("notif_id").setAttribute("style","font-size:25px")
                document.getElementById("notif_div").setAttribute("style","padding-right:8px")
              },10)
            }
          }
        }
      })
    }
    setTimeout(()=>{
      //console.log(this.router.url)
      this.GetNotifInterval()
    },5000)



  }

  getBackgroundNotifInterval(){
    return
    //console.log("ipis")
    //this.user.setID("2")
    setTimeout(()=>{
        let serverURL = "https://www.spotted.com.hr/has_notif/"
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= {id:this.user.getID(),pass:3},
            url       : any      	= serverURL + "index.php";
    
        this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>{
          let answer = data.text();
          console.log(answer)
          if(answer.length > 3){
            console.log("ima notifa")
            let json = JSON.parse(answer)
            //console.log(json)
            if(json.notif === "1"){
              this.notif.schedule({
                title:"Spotted",
                text: 'Ejj, imaš novu poruku.',
                trigger: {at: new Date(new Date().getTime() + 1000)},
                led: 'FF0000',
                //vibrate: true
              })
              return
            }else if(json.notif === "2"){
              this.notif.schedule({
                title:"Spotted",
                text: 'Ejj, imaš novu obavijest.',
                trigger: {at: new Date(new Date().getTime() + 1000)},
                led: 'FF0000',
                //vibrate: true
              })
              return
            }
          }
          this.getBackgroundNotifInterval()
        })
    },1000)
  }


  ShowNotifAnimation(){
      if(this.router.url === "/home"){ 
        if(this.user.HasNotif() === 1 || this.user.HasNotif() === 2){
          setTimeout(()=>{
            document.getElementById("notif_id").setAttribute("color","light")
            document.getElementById("notif_id").setAttribute("style","font-size:31px")
            document.getElementById("notif_div").setAttribute("style","padding-right:5px")

          },1000)
          setTimeout(()=>{
            document.getElementById("notif_id").setAttribute("color","danger")
            document.getElementById("notif_id").setAttribute("style","font-size:25px")
            document.getElementById("notif_div").setAttribute("style","padding-right:8px")

          },1200)
          setTimeout(()=>{
            document.getElementById("notif_id").setAttribute("color","light")
            document.getElementById("notif_id").setAttribute("style","font-size:31px")
            document.getElementById("notif_div").setAttribute("style","padding-right:5px")

          },1400)
          setTimeout(()=>{
            document.getElementById("notif_id").setAttribute("color","danger")
            document.getElementById("notif_id").setAttribute("style","font-size:25px")
            document.getElementById("notif_div").setAttribute("style","padding-right:8px")
          },1600)
        }
      }
  }


  hrv = {
    Opis:"Opis",
    Fotografija:"Slika",
    Mjesto:"Mjesto",
    Datum:"Datum",
    Izgled:"Izgled",
    Obavezne_stavke_su: "Obavezne stavke su:",
    Fotografija_ili_opis: "Slika ili opis",
    Odabir_mjesta: "Odabir mjesta",
    Objavi:"Objavi",
    Unesite_informacije_o_dogadaju:"Unesite informacije o događaju...",
    Menu:"Menu",
    ID:"ID",
    Naslovnica:"Naslovnica",
    Profil:"Profil",
    Cesta_pitanja:"Česta pitanja",
    Postavke:"Postavke",
    Odjavi_se:"Odjavi se",
    Komentiraj:"Komentiraj",
    Podijeli:"Podijeli",
    Hrvatska:"Hrvatska",
    Srbija:"Srbija",
    Bosna_i_Hercegovina:"Bosna i Hercegovina",
    Filteri:"Filteri",
    Po_drzavi:"Po državi",
    Po_gradovima:"Po gradovima",
    Promjeni_filter:"Promjeni filter",
    Kamera:"Kamera",
    Galerija:"Galerija",
    Izaberi_drzavu:"Izaberi državu",
    Unesite_detaljnije_mjesto:"Unesite detaljnije mjesto",
    Kad:"Kad?",
    U_koliko:"U koliko?",
    Like:"Like",
    Komentar:"Komentar",
    Izaberi_grad:"Izaberi grad",
    Admin_poslovi:"Administrativni poslovi"
  }

  srb = {
    Opis:"Опис",
    Fotografija:"Слика",
    Mjesto:"Место",
    Datum:"Датум",
    Izgled:"Излгед",
    Obavezne_stavke_su: "Обавезне ставке су:",
    Fotografija_ili_opis: "Слика / опис",
    Odabir_mjesta: "Одабир места",
    Objavi:"Објави",
    Unesite_informacije_o_dogadaju:"Унесите информације о догађају...",
    Menu:"Мену",
    ID:"ИД",
    Naslovnica:"Насловница",
    Profil:"Профил",
    Cesta_pitanja:"Честа питања",
    Postavke:"Поставке",
    Odjavi_se:"Одјави се",
    Komentiraj:"Коментирај",
    Podijeli:"Подели",
    Hrvatska:"Хрватска",
    Srbija:"Србија",
    Bosna_i_Hercegovina:"Босна и Херцеговина",
    Filteri:"Филтери",
    Po_drzavi:"По држави",
    Po_gradovima:"По градовима",
    Promjeni_filter:"Промени филтер",
    Kamera:"Камера",
    Galerija:"Галерија",
    Izaberi_drzavu:"Изабери државу",
    Unesite_detaljnije_mjesto:"Унесите детаљније место",
    Kad:"Кад?",
    U_koliko:"У колико?",
    Like:"Лике",
    Komentar:"Коментар",
    Izaberi_grad:"Изабери град",
    Admin_poslovi:"Административни послови"


  }
  

  LoadAll(){
    setTimeout(() => {
      this.userName = this.user.getNadimak()
  }, 2000);
  }

  LogOut(){
    this.storage.clear()
    this.router.navigate(['home/login']).then(()=>{
      this.menu.close()
      this.storage.clear()
      setTimeout(() => {
        this.splashScreen.show();
        window.location.reload();
    }, 500);


    })

  }
  GoToAdmin(){
    //this.Loading()
    this.menu.close()
    this.mainVar.leaveApp = false;
    this.router.navigate(['home/loading']);
  }

  GoToHome(){
    this.menu.close()
    this.mainVar.leaveApp = true;
    this.router.navigate(['home']);

  }
  GoToProfil(){
    //this.Loading()
    this.menu.close()
    this.mainVar.leaveApp = false;
    this.router.navigate(['home/profile']);

  }
  GoToPostavke(){
    //this.Loading()
    this.mainVar.leaveApp = false;
    this.menu.close()
    this.router.navigate(['home/postavke']);
  }
  GoToChat(){
    // if profil potvrden onda ok
    
  }
  GoToPitanja(){
    //this.Loading()
    this.mainVar.leaveApp = false;
    this.menu.close()
    this.router.navigate(['home/pitanja']);
  }
  async Loading() {
    const loading = await this.loadingController.create({
      message: '',
      duration: 150,
      cssClass: 'custom-loader-class'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

  }

  async WelcomeToast() {
    var welcome = "Dobro došli " + this.mainVar.getUsername()
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
