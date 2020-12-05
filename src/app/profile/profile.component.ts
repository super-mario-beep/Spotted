import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router"
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { MainVariables } from '../app.variables';
import { HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Post } from '../post.class';
import {Md5} from 'ts-md5/dist/md5'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  checkprofile = (this.user.getInstagram().length < 2)
  checkPremium = true
  jezik:any;
  constructor(public menu:MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public user: UserService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public mainVar:MainVariables,
    public platform:Platform,
    private http: Http,
    public post:Post
    ) {
      if(this.user.isPremium().toString() == "1"){
        this.checkPremium = false
      }else{
        this.checkPremium = true
      }
      
      if(this.user.jezik === "3" || this.user.jezik === "4"){
        let json = JSON.stringify(this.srb)
        this.jezik = JSON.parse(json)
      }else{
        let json = JSON.stringify(this.hrv)
        this.jezik = JSON.parse(json)
      }
      this.checkUI()
      menu.enable(false);

   }

  ngOnInit() {
    this.menu.enable(true)

  }


  hrv = {
    Opis:"Opis",
    Fotografija:"Slika",
    Mjesto:"Mjesto",
    Datum:"Datum",
    Izgled:"Izgled",
    Obavezne_stavke_su: "Obavezne stavke su:",
    Fotografija_ili_opis: "Slika ili opis",
    Profil:"Profil",
    Vase_nedavne_objave:"Vaše nedavne objave",
    Prikazi:"Prikaži",
    Potvrdite_profil:"Potvrdite profil",
    Unesite_nadimak:"Unesite nadimak",
    Unesite_lozinku:"Unesite lozinku",
    Unesite_instagram_profil:"Unesite instagram profil",
    Ponovo_unesite:"Ponovo unesite nadimak i lozinku te dodajte instagram kako bi Vam dolazile obavjesti u slučaju promjena na Vašim objavama ili ako Vas netko označi.",
    Postanite_Premium_clan:"Postanite premium član",
    Premium_clanovi_nemaju:"Premium članovi nemaju nikakve reklame. Svaka Vaša objava biti će dostupna odmah bez čekanja. Svi premium članovi imaju veće privilegije kao prijavljivanje drugih korisnika, objava ili komentara. Veći izbor tema u aplikaciji i chatu. Preuzimanjem premium aplikacije nema dodatnih troškova za Vas.",
    Kupi:"Kupi",
    Potvrdi:"Potvrdi"

  }

  srb = {
    Opis:"Опис",
    Fotografija:"Слика",
    Mjesto:"Место",
    Datum:"Датум",
    Izgled:"Излгед",
    Obavezne_stavke_su: "Обавезне ставке су:",
    Fotografija_ili_opis: "Слика / опис",
    Profil:"Налог",
    Vase_nedavne_objave:"Ваше недавне објаве",
    Prikazi:"Прикажи",
    Potvrdite_profil:"Потврдите налог",
    Unesite_nadimak:"Унесите надимак",
    Unesite_lozinku:"Унесите лозинку",
    Unesite_instagram_profil:"Унесите инстаграм налог",
    Ponovo_unesite:"Поново унесите надимак и лозинку те додајте инстаграм како би Вам долазиле обавести у случају промена на Вашим објавама или ако Вас нетко означи.",
    Postanite_Premium_clan:"Постаните премиум члан",
    Premium_clanovi_nemaju:"Премиум чланови немају никакве рекламе. Свака Ваша објава бити ће доступна одмах без чекања. Сви премиум чланови имају веће привилегије као пријављивање других корисника, објава или коментара. Већи избор тема у апликацији и цхату. Преузимањем премиум апликације нема додатних трошкова за Вас.",
    Kupi:"Купи",
    Potvrdi:"Потврди",
  }



  checkUI(){
    setTimeout(()=>{
      let theme = this.user.getUI().toString()
      console.log(this.user.isPremium())
      if(theme === "1"){
      }else if(theme === "2"){
        let items = document.getElementsByClassName("dark_theme")
        items[0].classList.add("light_theme")
        items[0].classList.remove("dark_theme")
        let item = document.getElementById("profile_content_id")
        item.classList.add("light_theme")
        item.classList.remove("dark_theme")
      }
    },50)
  }

  sub
  username:string = "noup"
  nadimak = ""
  lozinka = ""
  password = ""
  instagram = ""
  ProfilPorvrden:boolean = false;

  Posts = []
  ShowPosts(){
    let serverURL = "https://www.spotted.com.hr/get_posts_from_user/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { nadimak : this.user.getNadimak(),key:3},
        url       : any      	= serverURL + "index.php";
    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
        //console.log(answer)
      if(answer.includes("!#!")){
        //let json = JSON.parse(answer)
        document.getElementById("buttoner").style.display = "none"
        while(1){
          if(answer.length > 3){
            let end = answer.indexOf("!#!")
            let id = answer.slice(0,end-2)
            let approved = answer.slice(end-2,end)
            answer = answer.slice(end+3,answer.length)
            let tmp_post = new Post
            tmp_post.id = id;
            if(approved == "ye"){
              tmp_post.approved = "Odobreno" +  " - Pritisnite za više"
            }else{
              tmp_post.approved = "Nije odobreno"
            }
            this.Posts.push(tmp_post)
          }else{
            break;
            
          }
        }
        

        
      }else{
        document.getElementById("buttoner").style.display = "none"
        let tmp_post = new Post
        if(this.user.jezik === "3" || this.user.jezik === "4"){
          tmp_post.id = "Ваш налог нема објава!"
        }else{
          tmp_post.id = "Vaš profil nema objava!"
        }
        tmp_post.approved = ""
        this.Posts.push(tmp_post)
      }
    })
}


  openPost(value,id){
    if(value.includes("Nije")){
      // bottom alert nije odobreno bla bla
      return 0
    }else{
      this.user.setfullId(id)
      this.user.SetIsPostLiked(true)
      this.router.navigate(['home/fullpost']);
    }
  }


  PotvrdiProf(){
    //nadimak lozinka instagram
    try{
      //https://www.instagram.com/tonyhawk/?__a=1
      let link = "https://www.instagram.com/"+ this.instagram +"/?__a=1"
      this.http.get(link)
        .subscribe((data : any) =>{
          let answer = data.text()
          this.PotvrdiProfil()
        })
    }catch(e){
      return 0
    }
  }

  PotvrdiProfil(){
    if(this.nadimak.length < 3 ||this.lozinka.length < 3){
      return 0
    }

    //Md5.hashStr(lozinka)
    let serverURL = "https://www.spotted.com.hr/potvrdi_profil/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { key:3,nadimak : this.nadimak, lozinka: Md5.hashStr(this.lozinka), instagram: this.instagram},
        url       : any      	= serverURL + "index.php";
    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      console.log(data.text())
      if(data.text() === "Done"){
        document.getElementById("profile_card").style.display = "none"
        //alert potvrdeno
        this.user.setInstagram(this.instagram)
      }
    })
  }

  goToTutorial(){
    this.router.navigate(["home/tutorial"])
  }



  LogEmail: string
  RegLoz: string


  KupiPremium(){
    //redirect trgplay
  }


}
