import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router"
import { Http } from '@angular/http'
import { ToastController } from '@ionic/angular';
import { MainVariables } from '../app.variables'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { of } from 'rxjs';
import { UserService } from '../user.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(public menu:MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public http: Http,
    public mainVar:MainVariables,
    public navCtrl: NavController,
    public toastController: ToastController,
    private platform:Platform,
    public appVariables:MainVariables,
    private user:UserService
    ) {


      if(this.user.getUI() === "1"){
        this.alertClass = "alert-class"
      }else{
        this.alertClass = "alert-class-light"
      }

      this.checkUI()
      menu.enable(false)
      if(this.user.jezik === "3" || this.user.jezik === "4"){
        let json = JSON.stringify(this.srb)
        this.jezik = JSON.parse(json)
      }else{
        let json = JSON.stringify(this.hrv)
        this.jezik = JSON.parse(json)
      }
    }

  ngOnInit() {}
  HrvPressed:boolean = true;
  SrbPressed:boolean = true;
  BihPressed:boolean = true;
  IzabraneRegijeHrv = ["1"]
  IzabraneRegijeSrb = []
  IzabraneRegijeBih = []
  jezik:any;


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
    Promjeni_filter:"Primjeni filter",
    Kamera:"Kamera",
    Galerija:"Galerija",
    Izaberi_drzavu:"Izaberi državu",
    Unesite_detaljnije_mjesto:"Unesite detaljnije mjesto",
    Kad:"Kad?",
    U_koliko:"U koliko?",
    Like:"Like",
    Komentar:"Komentar",
    Izaberi_grad:"Izaberi grad",
    gradovi:"gradovi",
    BiH:"BiH"
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
    Odjavi_se:"Ођави се",
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
    gradovi:"градови",
    BiH:"БиХ"

  }
  



  checkUI(){
    setTimeout(()=>{
      let theme = this.user.getUI()
      if(theme === "1"){
      }else if(theme === "2"){
        let items = document.getElementsByClassName("dark_theme")
        items[0].classList.add("light_theme")
        items[0].classList.remove("dark_theme")
        let item = document.getElementById("filter_content_id")
        item.classList.add("light_theme")
        item.classList.remove("dark_theme")
      }
    },50)

  }
  regijeHrv = [
    "Zagreb/Gorica/Samobor", 
    "Krapina/Marija Bistrica",
    "Varaždin/Čakovec",
    "Koprivnica/Križevci",
    "Bjelovar/Daruvar",
    "Virovitica/Slatina",
    "Požega/Pakrac/Kutjevo",
    "Nova Gradiška/Brod",
    "Osijek/Đakovo/Našice",
    "Vukovar/Vinkovci/Otok",
    "Sisak/Kutina/Novska",
    "Karlovac/Ogulin/Slunj",
    "Rijeka/Delnice/Krk",
    "Pula/Rovinj/Pazin",
    "Lika/Gospić/Pag",
    "Zadar/Krupa",
    "Knin/Šibenik",
    "Split/Sinj/Makarska",
    "Dubrovnik/Mljet/Korčula"
  ];
  regijeSrb = [
      "Beograd/Pančevo",
      "Niš/Prokuplje",
      "Novi Sad/Bačka Palanka",
      "Subatica/Sombor/Bač",
      "Kikinda/Bečej/Senta",
      "Ruma/Šabac",
      "Zrenjanin/Sečanj",
      "Vršac",
      "Lozanica/Valjevo",
      "Aranđelovac",
      "Užice/Čačak",
      "Požarevac/Majdanpek",
      "Kragujevac/Jagodina",
      "Novi Pazar/Prijepolje",
      "Kraljevo/Vrnjačka Banja",
      "Kruševac/Paraćin",
      "Leskovac",
      "Vranje/Bosilegrad",
      "Zajčer",
      "Negotin/Vratna"
  ]
  regijeBih = [
    "Sarajevo/okolica Sarajeva",
    "Banja Luka/Gradiška",
    "Cazin/Sanski Most",
    "Drvar/Grahovo/Glamoč",
    "Tomislavgrad/Kupres/Livno",
    "Mostar/Međugorje",
    "Trebinje/Gacko/Foča",
    "Konjic",
    "Bugonjo/Zenica",
    "Višegrad/Srebernica",
    "Bijeljina/Loznica",
    "Tuzla",
    "Brčko",
    "Doboj/Derventa/Gradačac",
    "Mrkonjić Grad/Kneževo",
    "Prijedor/Kozarska Dubica"
  ]
  
  alertClass = ""
  async ChooseDeloveAlert() {
    const alert = await this.alertController.create({
      header: 'Izaberi grad',
      cssClass : this.alertClass,

      inputs: [
        {
          type: 'checkbox',
          label: this.regijeSrb[0],
          value: '1',
          checked:true
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[1],
          value: '2'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[2],
          value: '3'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[3],
          value: '4'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[4],
          value: '5'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[5],
          value: '6'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[6],
          value: '7'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[7],
          value: '8'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[8],
          value: '9'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[9],
          value: '10'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[10],
          value: '11'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[11],
          value: '12'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[12],
          value: '13'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[13],
          value: '14'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[14],
          value: '15'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[15],
          value: '16'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[16],
          value: '17'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[17],
          value: '18'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[18],
          value: '19'
        },
        {
          type: 'checkbox',
          label: this.regijeSrb[19],
          value: '20'
        }
      ],
      buttons: [
        {
          text: 'Odustani',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Izaberi',
          handler: (data) => {
            console.log('Confirm Ok');
            console.log(data)
            if(data.length<1){
              return
            }
            this.IzabraneRegijeSrb = data
          }
        }
      ]
    });
    
    
    await alert.present();
  }

  async ChooseZupanijeAlert() {
    const alert = await this.alertController.create({
      header: 'Izaberi grad',
      cssClass : this.alertClass,

      inputs: [
        {
          type: 'checkbox',
          label: this.regijeHrv[0],
          value: '1',
          checked:true
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[1],
          value: '2'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[2],
          value: '3'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[3],
          value: '4'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[4],
          value: '5'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[5],
          value: '6'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[6],
          value: '7'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[7],
          value: '8'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[8],
          value: '9'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[9],
          value: '10'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[10],
          value: '11'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[11],
          value: '12'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[12],
          value: '13'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[13],
          value: '14'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[14],
          value: '15'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[15],
          value: '16'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[16],
          value: '17'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[17],
          value: '18'
        },
        {
          type: 'checkbox',
          label: this.regijeHrv[18],
          value: '19'
        },
      ],
      buttons: [
        {
          text: 'Odustani',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Izaberi',
          handler: (data) => {
            console.log('Confirm Ok');
            console.log(data)
            if(data.length<1){
              return
            }
            this.IzabraneRegijeHrv = data
          }
        }
      ]
    });
    
    
    await alert.present();
  }

  async ChooseRegioniAlert() {
    const alert = await this.alertController.create({
      header: 'Izaberi grad',
      cssClass : this.alertClass,

      inputs: [
        {
          type: 'checkbox',
          label: this.regijeBih[0],
          value: '1',
          checked:true,
        },
        {
          type: 'checkbox',
          label: this.regijeBih[1],
          value: '2'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[2],
          value: '3'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[3],
          value: '4'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[4],
          value: '5'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[5],
          value: '6'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[6],
          value: '7'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[7],
          value: '8'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[8],
          value: '9'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[9],
          value: '10'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[10],
          value: '11'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[11],
          value: '12'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[12],
          value: '13'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[13],
          value: '14'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[14],
          value: '15'
        },
        {
          type: 'checkbox',
          label: this.regijeBih[15],
          value: '16'
        }
      ],
      buttons: [
        {
          text: 'Odustani',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Izaberi',
          handler: (data) => {
            console.log('Confirm Ok');
            console.log(data)
            if(data.length<1){
              return
            }
            this.IzabraneRegijeBih = data

          }
        }
      ]
    });
    
    
    await alert.present();
  }

 
  Filtriraj(){

    this.mainVar.clearRegion("hrv")
    this.mainVar.clearRegion("srb")
    this.mainVar.clearRegion("bih")
    this.mainVar.selectedBihRegije = []
    this.mainVar.selectedSrbRegije = []
    this.mainVar.selectedHrvRegije = ["1"]
    this.mainVar.filterHrv = true
    this.mainVar.filterBih = true
    this.mainVar.filterSrb = true

    if(!this.HrvPressed && !this.SrbPressed && !this.BihPressed){
      console.log("error")
      return 0;
    }

    if(this.HrvPressed){
      this.mainVar.copyHrvRegije(this.IzabraneRegijeHrv)
    }
    if(this.SrbPressed){
      this.mainVar.copySrbRegije(this.IzabraneRegijeSrb)
    }
    if(this.BihPressed){
      this.mainVar.copyBihRegije(this.IzabraneRegijeBih)
    }
    if(this.HrvPressed == false){
      this.mainVar.filterHrv = false;
      this.mainVar.clearRegion("hrv")
    }
    if(this.BihPressed == false){
      this.mainVar.filterBih = false;
      this.mainVar.clearRegion("bih")
    }
    if(this.SrbPressed == false){
      this.mainVar.filterSrb = false;
      this.mainVar.clearRegion("srb")
    }


    
    this.changeFilter()
  }


  changeFilter(){
    this.appVariables.leaveApp = true;

    this.menu.enable(true)
    this.mainVar.setReloadPage(true)
    this.router.navigate(['./home']);
    


  }
  goBack(){
    this.appVariables.leaveApp = true;

    this.router.navigate(['./home']);

  }
  



  filterDrzavaHrv(){
    if(this.HrvPressed){
      this.HrvPressed = false;
      document.getElementById("displayhrv").style.display = "none"
    }else{
      this.HrvPressed = true;
      document.getElementById("displayhrv").style.display = "block"
    }
    this.mainVar.setIsFilterHrv()

    if(!this.HrvPressed && !this.SrbPressed && !this.BihPressed){
      document.getElementById("regije_display").style.display = "none"
    }else{
      document.getElementById("regije_display").style.display = "block"
    }
  }

  filterDrzavaSrb(){
    if(this.SrbPressed){
      this.SrbPressed = false;
      document.getElementById("displaysrb").style.display = "none"
      
    }else{
      this.SrbPressed = true;
      document.getElementById("displaysrb").style.display = "block"
    }
    this.mainVar.setIsFilterSrb()

    if(!this.HrvPressed && !this.SrbPressed && !this.BihPressed){
      document.getElementById("regije_display").style.display = "none"
    }else{
      document.getElementById("regije_display").style.display = "block"
    }
  }

  filterDrzavaBih(){
    if(this.BihPressed){
      this.BihPressed = false;
      document.getElementById("displaybih").style.display = "none"
      
    }else{
      this.BihPressed = true;
      document.getElementById("displaybih").style.display = "block"
    }
    this.mainVar.setIsFilterBih()

    if(!this.HrvPressed && !this.SrbPressed && !this.BihPressed){
      document.getElementById("regije_display").style.display = "none"
    }else{
      document.getElementById("regije_display").style.display = "block"
    }

  }



}
