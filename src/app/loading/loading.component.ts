import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../post.class'
import { UserService } from '../user.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor(

    private loadingController: LoadingController,
    private router:Router,
    private http:Http,
    private user:UserService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    this.LoadPost()
    this.checkUI()
    if(this.user.getUI() === "2"){
      this.alertClass = "alert-class-light"
    }else{
      this.alertClass = "alert-class"
    }

  }

  ngOnInit() {}


  alertClass = ""
  test = "bla bla"
  test_input = ""
  test_json = ""
  post_drzava = ""
  post_regija = ""

  changeJson(value){
    this.test_json = value

  }
  changeLink(value){
    console.log(value)
    this.test_input = value
  }



  test32
  goToUrl(){
    if(this.test_input.match("https://www.instagram.com/p/")){
    }else{
      console.log("Invalid link!")
      return 0;
    }
    let url = ""
    let startPos = this.test_input.indexOf("/?")
    url = this.test_input.slice(0,startPos)
    url = url + "/?__a=1"
    console.log(url)
    window.open(url)
  }

  getPostFromJson(number){

    let json = JSON.parse(this.test_json)
    if(json.graphql.shortcode_media.is_video == false){}else{
      alert("Nije moguce video postaviti")
      console.log("isVideo")
      return 0;
    }
   if(json.graphql.shortcode_media.__typename == "GraphImage"){
  
   }else{
     console.log("isSlideCar")
    return 0
    }

    var time = new Date(json.graphql.shortcode_media.taken_at_timestamp * 1000);
    var image = json.graphql.shortcode_media.display_url
    var likes = json.graphql.shortcode_media.edge_media_preview_like.count
    var description = "Uvezeno s Instagrama"
    var drzava = this.post_drzava
    var regija = this.post_regija
    var lokacija = "none"
    var datum = time.getDate() + "." + (+time.getMonth()+1).toString() + "." + time.getFullYear()
    var vrijeme = "12:00"
    var likes = json.graphql.shortcode_media.edge_media_preview_like.count
    var comments = json.graphql.shortcode_media.edge_media_to_parent_comment.count
    var month = ""
    var date = ""
    var hours = ""
    var minutes = ""
    var seconds = "10"
    var mililseconds = "000"
    if(+time.getMonth()+1 <10){
      month = "0" + (+time.getMonth()+1).toString()
    }else{month = (+time.getMonth()+1).toString()}

    if(+time.getDate()+1 <10){
      date = "0" + (+time.getDate()).toString()
    }else{date = (+time.getDate()).toString()}

    if(+time.getHours()+1 <10){
      hours = "0" + (+time.getHours()).toString()
    }else{hours = (+time.getHours()).toString()}

    if(+time.getMinutes()+1 <10){
      minutes = "0" + (+time.getMinutes()).toString()
    }else{minutes = (+time.getMinutes()).toString()}
    var time_uploaded = time.getFullYear()+"-"+month+"-"+date+"T"+hours+":"+minutes+":"+seconds+"."+mililseconds+"Z"
    var layout =    (Math.floor(Math.random() * 4) + 1).toString() + (Math.floor(Math.random() * 4) + 1).toString() + (Math.floor(Math.random() * 4) + 1).toString();
    var approved = "ye"
    var comments_locked = "no"
    //let  timess:string = (+(new Date() )*1000).toString();
    //console.log(+time)

    var user_uploaded = "Uvezeno s Instagrama"
    let serverURL = "https://www.spotted.com.hr/create_post_from_instagram/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {key:3,likes:likes,comments:comments,id: number,imageURL:image,description:description,drzava:drzava,regija:regija,upload_time:+time,lokacija:lokacija,datum:datum,vrijeme:vrijeme,layout_info:layout,user:user_uploaded},
        url       : any      	= serverURL + "index.php";
  
    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      console.log(data.text())
      if(data.text() === "Inserted"){
        this.test_json = ""
        this.test_input = ""
        alert("Added")
      }
    })


    let comments_i = json.graphql.shortcode_media.edge_media_to_parent_comment.edges.length
    for(let i = 0;i < comments_i;i++){
      let komentar = json.graphql.shortcode_media.edge_media_to_parent_comment.edges[i].node.text
      let komentar_likes = json.graphql.shortcode_media.edge_media_to_parent_comment.edges[i].node.edge_liked_by.count
      this.CreatePost(komentar, komentar_likes,number)

    }

  }
  async CreatePost(komentar,likes,post_id){
  var random_id = Math.floor(Math.random() * 999999999999) + 1
    var number = random_id.toString()
    let serverURL = "https://www.spotted.com.hr/get_available_comment_id/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,key: number},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
      if(answer == "Exist!"){
        this.CreatePost(komentar,likes,post_id)
        }else if(answer == "Not Exist!"){
          let serverURL = "https://www.spotted.com.hr/set_comment/"
          let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
              options 	: any		= {key:3,comment:komentar,user_id:"Uvezeno s Instagrama",id: post_id,comment_id:number},
              url       : any      	= serverURL + "index.php";

          this.http.post(url, JSON.stringify(options), headers)
          .subscribe((data : any) =>{
            console.log(data.text())

          })


       }else{
          //this.AlertErrorUpload()
       }

    })

  }

  async GetAvailableId(){
    var random_id = Math.floor(Math.random() * 999999999) + 1
    var number = random_id.toString()
    let serverURL = "https://www.spotted.com.hr/get_available_id/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,key: number},
        url       : any      	= serverURL + "index.php";
  
    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
      console.log(answer)
      if(answer == "Exist!"){
        this.GetAvailableId()
      }else if(answer == "Not Exist!"){
          this.getPostFromJson(number)
      }else{
        console.log("some error happend")
        return 0;
      }
    },
    (error : any) =>{
      console.log('Something went wrong!');
    });
  
  }

  async ChooseCountryAlert() {
    const alert = await this.alertController.create({
      header: 'Izaberi državu',
      cssClass : this.alertClass,
      inputs: [
        {
          name: 'hrv',
          type: 'radio',
          label: 'Hrvatska',
          value: 'hrv',
        },
        {
          name: 'bih',
          type: 'radio',
          label: 'Srbija',
          value: 'srb'
        },
        {
          name: 'bih',
          type: 'radio',
          label: 'Bosna i Hercegovina',
          value: 'bih'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Izaberi',
          handler: (data) => {
            console.log(data)
            document.getElementById("region_filter_1").style.display = "none"
            document.getElementById("region_filter_2").style.display = "none"
            document.getElementById("region_filter_3").style.display = "none"
            if(data === "hrv"){
              console.log("hraa")
              this.post_drzava = "hrv"
              document.getElementById("region_filter_1").style.display = "block"
            }else if(data === "srb"){

              this.post_drzava = "srb"
              document.getElementById("region_filter_2").style.display = "block"
            }else if(data === "bih"){

              document.getElementById("region_filter_3").style.display = "block"
              this.post_drzava = "bih"
            }
          }
        }
      ]
    });

    await alert.present();
  }


  async ChooseDeloveAlert() {
    const alert = await this.alertController.create({
      header: 'Radio',
      cssClass : this.alertClass,

      inputs: [
        {
          type: 'radio',
          label: this.regijeSrb[0],
          value: 'Beograd/Pančevo',
        },
        {
          type: 'radio',
          label: this.regijeSrb[1],
          value: 'Niš/Prokuplje'
        },
        {
          type: 'radio',
          label: this.regijeSrb[2],
          value: 'Novi Sad/Bačka Palanka'
        },
        {
          type: 'radio',
          label: this.regijeSrb[3],
          value: 'Subatica/Sombor/Bač'
        },
        {
          type: 'radio',
          label: this.regijeSrb[4],
          value: 'Kikinda/Bečej/Senta'
        },
        {
          type: 'radio',
          label: this.regijeSrb[5],
          value: 'Ruma/Šabac'
        },
        {
          type: 'radio',
          label: this.regijeSrb[6],
          value: 'Zrenjanin/Sečanj'
        },
        {
          type: 'radio',
          label: this.regijeSrb[7],
          value: 'Vršac'
        },
        {
          type: 'radio',
          label: this.regijeSrb[8],
          value: 'Lozanica/Valjevo'
        },
        {
          type: 'radio',
          label: this.regijeSrb[9],
          value: 'Aranđelovac'
        },
        {
          type: 'radio',
          label: this.regijeSrb[10],
          value: 'Užice/Čačak'
        },
        {
          type: 'radio',
          label: this.regijeSrb[11],
          value: 'Požarevac/Majdanpek'
        },
        {
          type: 'radio',
          label: this.regijeSrb[12],
          value: 'Kragujevac/Jagodina'
        },
        {
          type: 'radio',
          label: this.regijeSrb[13],
          value: 'Novi Pazar/Prijepolje'
        },
        {
          type: 'radio',
          label: this.regijeSrb[14],
          value: 'Kraljevo/Vrnjačka Banja'
        },
        {
          type: 'radio',
          label: this.regijeSrb[15],
          value: 'Kruševac/Paraćin'
        },
        {
          type: 'radio',
          label: this.regijeSrb[16],
          value: 'Leskovac'
        },
        {
          type: 'radio',
          label: this.regijeSrb[17],
          value: 'Vranje/Bosilegrad'
        },
        {
          type: 'radio',
          label: this.regijeSrb[18],
          value: 'Zajčer'
        },
        {
          type: 'radio',
          label: this.regijeSrb[19],
          value: 'Negotin/Vratna'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
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
            if(data === undefined){
              return
            }else{
              document.getElementById("regija_srb_id").textContent = data
            }
            this.post_regija = data
          }
        }
      ]
    });
    
    
    await alert.present();
  }

  async ChooseZupanijeAlert() {
    const alert = await this.alertController.create({
      header: 'Radio',
      cssClass : this.alertClass,

      inputs: [
        {
          type: 'radio',
          label: this.regijeHrv[0],
          value: 'Zagreb/Gorica/Samobor',
        },
        {
          type: 'radio',
          label: this.regijeHrv[1],
          value: 'Krapina/Marija Bistrica'
        },
        {
          type: 'radio',
          label: this.regijeHrv[2],
          value: 'Varaždin/Čakovec'
        },
        {
          type: 'radio',
          label: this.regijeHrv[3],
          value: 'Koprivnica/Križevci'
        },
        {
          type: 'radio',
          label: this.regijeHrv[4],
          value: 'Bjelovar/Daruvar'
        },
        {
          type: 'radio',
          label: this.regijeHrv[5],
          value: 'Virovitica/Slatina'
        },
        {
          type: 'radio',
          label: this.regijeHrv[6],
          value: 'Požega/Pakrac/Kutjevo'
        },
        {
          type: 'radio',
          label: this.regijeHrv[7],
          value: 'Nova Gradiška/Brod'
        },
        {
          type: 'radio',
          label: this.regijeHrv[8],
          value: 'Osijek/Đakovo/Našice'
        },
        {
          type: 'radio',
          label: this.regijeHrv[9],
          value: 'Vukovar/Vinkovci/Otok'
        },
        {
          type: 'radio',
          label: this.regijeHrv[10],
          value: 'Sisak/Kutina/Novska'
        },
        {
          type: 'radio',
          label: this.regijeHrv[11],
          value: 'Karlovac/Ogulin/Slunj'
        },
        {
          type: 'radio',
          label: this.regijeHrv[12],
          value: 'Rijeka/Delnice/Krk'
        },
        {
          type: 'radio',
          label: this.regijeHrv[13],
          value: 'Pula/Rovinj/Pazin'
        },
        {
          type: 'radio',
          label: this.regijeHrv[14],
          value: 'Lika/Gospić/Pag'
        },
        {
          type: 'radio',
          label: this.regijeHrv[15],
          value: 'Zadar/Krupa'
        },
        {
          type: 'radio',
          label: this.regijeHrv[16],
          value: 'Knin/Šibenik'
        },
        {
          type: 'radio',
          label: this.regijeHrv[17],
          value: 'Split/Sinj/Makarska'
        },
        {
          type: 'radio',
          label: this.regijeHrv[18],
          value: 'Dubrovnik/Mljet/Korčula'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
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
            if(data === undefined){
              return
            }else{
              document.getElementById("regija_hrv_id").textContent = data
            }
            this.post_regija = data

          }
        }
      ]
    });
    
    
    await alert.present();
  }

  async ChooseRegioniAlert() {
    const alert = await this.alertController.create({
      header: 'Radio',
      cssClass : this.alertClass,

      inputs: [
        {
          type: 'radio',
          label: this.regijeBih[0],
          value: 'Sarajevo/okolica Sarajeva',
        },
        {
          type: 'radio',
          label: this.regijeBih[1],
          value: 'Banja Luka/Gradiška'
        },
        {
          type: 'radio',
          label: this.regijeBih[2],
          value: 'Cazin/Sanski Most'
        },
        {
          type: 'radio',
          label: this.regijeBih[3],
          value: 'Drvar/Grahovo/Glamoč'
        },
        {
          type: 'radio',
          label: this.regijeBih[4],
          value: 'Tomislavgrad/Kupres/Livno'
        },
        {
          type: 'radio',
          label: this.regijeBih[5],
          value: 'Mostar/Međugorje'
        },
        {
          type: 'radio',
          label: this.regijeBih[6],
          value: 'Trebinje/Gacko/Foča'
        },
        {
          type: 'radio',
          label: this.regijeBih[7],
          value: 'Konjic'
        },
        {
          type: 'radio',
          label: this.regijeBih[8],
          value: 'Bugonjo/Zenica'
        },
        {
          type: 'radio',
          label: this.regijeBih[9],
          value: 'Višegrad/Srebernica'
        },
        {
          type: 'radio',
          label: this.regijeBih[10],
          value: 'Bijeljina/Loznica'
        },
        {
          type: 'radio',
          label: this.regijeBih[11],
          value: 'Tuzla'
        },
        {
          type: 'radio',
          label: this.regijeBih[12],
          value: 'Brčko'
        },
        {
          type: 'radio',
          label: this.regijeBih[13],
          value: 'Doboj/Derventa/Gradačac'
        },
        {
          type: 'radio',
          label: this.regijeBih[14],
          value: 'Mrkonjić Grad/Kneževo'
        },
        {
          type: 'radio',
          label: this.regijeBih[15],
          value: 'Prijedor/Kozarska Dubica'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
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
            if(data === undefined){
              return
            }else{
              document.getElementById("regija_bih_id").textContent = data
            }
            this.post_regija = data
          }
        }
      ]
    });
    
    
    await alert.present();
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
  ]
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
  
  
  



  goBack(){
    this.router.navigate(['home']);
  }

  
  Posts = []
  uniqeID
  Objavi(allow){
    //console.log(allow)
    this.ChangePost(allow)
  }


  ProvjeriUnos(string){
    if(string === "08122019."){//odobravanje postova
      document.getElementById("pass_ID").style.display = "none"
      document.getElementById("post_allow").style.display = "block"
    }else if(string === "22122019."){// napravi objavu preko share linka
      document.getElementById("pass_ID").style.display = "none"
      document.getElementById("instagram_share_div").style.display = "block"
    }else if(string === "30122019."){// obrisi kompletni post i sliku
      document.getElementById("pass_ID").style.display = "none"
      document.getElementById("delete_post_div").style.display = "block"
    }else{
      return 0
    }
  }

  ChangePost(string){
    let serverURL = "https://www.spotted.com.hr/approve_post/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { pass:3,key: string , id: +this.post_id },
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
       if(answer === "Done"){
         this.sendNotifToUser(this.post_id)
         this.Posts = []
        this.LoadPost()


       }else{
        //this.AlertErrorUpload()
      }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       //this.AlertErrorUpload()

    });
  }

  sendNotifToUser(id){
    let date = new Date;
    let hours:string = ""
    hours = date.getHours().toString() + ":00";
    let month = ""
    let dates = ""
    let time = new Date
    if(+time.getMonth()+1 <10){
      month = "0" + (+time.getMonth()+1).toString()
    }else{month = (+time.getMonth()+1).toString()}

    if(+time.getDate()+1 <10){
      dates = "0" + (+time.getDate()).toString()
    }else{dates = (+time.getDate()).toString()}
    let full = dates + "." + month + "." + date.getFullYear().toString()

    let post_id = id.toString()
    let serverURL = "https://www.spotted.com.hr/send_notif/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { pass:3, id: +this.post_id,hours,full },
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      console.log(data.text())
      if(data.text() === "done!"){
        alert("Uspjesno")
      }
    })
  }

  deleteID = ""
  changeID(value){
    this.deleteID = value
  }
  deletePost(){
    let serverURL = "https://www.spotted.com.hr/image_delete/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {id:+this.deleteID,user:"spottedc_stjepko",pass:"jedigovna321"},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
      if(answer === "Done!"){
        this.PrijavaPostaTOAST("Uspješno obrisano")
      }
    })
  }

  async PrijavaPostaTOAST(string) {
    var welcome = string;
    const toast = await this.toastController.create({
      //cssClass: this.toastClass,
      message: welcome,
      duration: 1500,
      position: "bottom",
    });
    toast.present();
  }

  checkUI(){
    setTimeout(()=>{
      let theme = this.user.getUI()
      if(theme === "1"){
      }else if(theme === "2"){
        let items = document.getElementsByClassName("dark_theme")
        items[0].classList.add("light_theme")
        items[0].classList.remove("dark_theme")
        items = document.getElementsByClassName("dark_theme")
        items[0].classList.add("light_theme")
        items[0].classList.remove("dark_theme")
      }
    },100)

  }

  post_id:string = ""
  LoadPost(){
    let serverURL = "https://www.spotted.com.hr/get_not_approved_post/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { key:1 },
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
      //console.log(answer)
       if(answer.includes('"id":') && answer.includes('"imgURL":') && answer.includes('"layout_info":')){
        let json = JSON.parse(answer) 
        answer = null
        let tmp_post = new Post
        tmp_post.id = json.id
        tmp_post.description = json.description
        tmp_post.imageURL = json.imgURL
        tmp_post.drzava = json.drzava
        if(tmp_post.drzava == "hrv"){
          tmp_post.drzava = "Hrvatska"
        }else if(tmp_post.drzava == "srb"){
          tmp_post.drzava = "Srbija"
        }else if(tmp_post.drzava == "bih"){
          tmp_post.drzava = "Bosna i Hercegovina"
        }
        tmp_post.datum = json.datum
        tmp_post.vrijeme = json.vrijeme
        tmp_post.regija = json.regija
        tmp_post.lokacija = json.lokacija
        tmp_post.likes = +json.likes
        tmp_post.comments = +json.komentari
        tmp_post.layout_info = +json.layout_info
        tmp_post.upload_date = json.time_uploaded
        this.post_id = tmp_post.id
        
        let image_link
        //console.log(json.imgURL)
        if(json.imgURL == "ye"){
          image_link = "https://www.spotted.com.hr/image_uploader/images/" + tmp_post.id +".png"
        }else{
          image_link = "https://www.spotted.com.hr/image_uploader/images/no_image.png"
        }

        tmp_post.imageURL = image_link
        tmp_post.SepareLayout()
        this.Posts.push(tmp_post)

        }else if(answer == "No Ip Adress!"){
          //this.router.navigate(['home/register']);
       }else{
        //this.router.navigate(['home/register']);
      }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       //this.AlertErrorUpload()

    });
  }


}
