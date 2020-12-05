import { Component, ɵConsole } from '@angular/core';
import {  OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ToastController, Platform, PopoverController, IonicModule } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {Post} from '../post.class'
//
import { identifierModuleUrl } from '@angular/compiler';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
//import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MainVariables } from '../app.variables';
import {NavController} from '@ionic/angular';
//import { element } from 'protractor';
//import { IonContent } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { TimeoutError } from 'rxjs';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AdMobFree,AdMobFreeBannerConfig,AdMobFreeInterstitial,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
/*import {banner} from 'cordova-plugin-admob-free/admob'
import {Banner} from 'cordova-plugin-admob-free/admob'*/
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import {Md5} from 'ts-md5/dist/md5'
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {




  version:string = "2.0.6"
  Posts = []
  brojacPostova = 0
  imageURI:any
  imageFileName:any
  PostsId = []
  loaderCustomClassCss = ""
  doubleTapLeave:boolean = false;
  toastClass = ""
  jezik:any

  constructor(
    public toastController: ToastController,
    public http: Http,
    public user: UserService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public menu:MenuController,
    public router:Router,
    //public a:UniqueDeviceID,
    private platform: Platform,
    //private transfer: FileTransfer
    private transfer: FileTransfer,
    //private camera:Camera
    //private file: File
    private statusBar: StatusBar,
    public appVariables: MainVariables,
    private camera:Camera,
    public popoverController: PopoverController,
    public navController: NavController,
    //private content:IonContent
    //private photoViewer: PhotoViewer
    private admobFree: AdMobFree,
    //private andFullScreen:AndroidFullScreen,
    private storage:Storage,
    //private keyboard: Keyboard
    private appVersion: AppVersion,
    private clipboard:Clipboard,
    private socialsharing:SocialSharing

  ) {

    if(this.user.getUI() === "1"){
      this.alertMessageH5 = "h6_class"
      this.alertMessageP = "p_class"
      this.alertClass = "alert-class"
      this.loaderCustomClassCss = "custom-loader-class"
      this.toastClass = "custom-toast"
    }else if(this.user.getUI() === "2"){
      this.alertMessageH5 = "h6_class_light"
      this.alertMessageP = "p_class_light"
      this.alertClass = "alert-class-light"
      this.loaderCustomClassCss = "custom-loader-class-light"
      this.toastClass = "custom-toast-light"

    }



    this.navController.navigateRoot('/home')
    this.platform.backButton.subscribe(()=>{
      if(this.router.url === "/home"){
        if(this.doubleTapLeave == true){
          navigator['app'].exitApp()
        }else{
          this.doubleTapLeave = true;
          this.DoubleTapToast()
        }
        setTimeout(()=>{
          this.doubleTapLeave = false;
        },1000)
      }
    })


    this.constructorLoad()
    this.LoadPosts(0)
    this.statusBar.hide()
    this.enableMenu()
    this.Loader(200)
    this.enableMenuAlways()
    this.menu.enable(this.user.GetEnableMenu())
    if(this.user.jezik === "3" || this.user.jezik === "4" ){
      let json = JSON.stringify(this.srb)
      this.jezik = JSON.parse(json)
    }else{
      let json = JSON.stringify(this.hrv)
      this.jezik = JSON.parse(json)
    }
    this.ShowNotifPrepareAnimation()
    this.CheckUpdates()

    //this.InstagramPosts("zg.spotted")// za privatne unjet ime sptted
    //this.GetFirstPublicPosts()//RADI // za uzimanje public postova vise kod metoda   
    ////////////////////////////////////////////////////////////////////////////////////////////////////// 
  }

  test = ""
  InstagramPostId = ""
  nextPage  = ""
    // uzme _a=? , kursor , od svakog posta_id - kopiraj se sadrzaj u TA
    // rucno u getnextpagefrom hash stavti number of reads // cca 15
  getFirstPosts(value){// dobiva json od 50 objava//otvara linkove
    if(value < 3){
      return 
    }
    let JsonArray = []
    let json = JSON.parse(value)
    console.log(json.data.user.edge_owner_to_timeline_media.edges.length)
    let length = json.data.user.edge_owner_to_timeline_media.edges.length
    for(let i = 0;i < length;i++){// length
      console.log(json.data.user.edge_owner_to_timeline_media.edges[i])
      if(json.data.user.edge_owner_to_timeline_media.edges[i].node.__typename === "GraphImage" && json.data.user.edge_owner_to_timeline_media.edges[i].node.is_video == false){
        let post_id = json.data.user.edge_owner_to_timeline_media.edges[i]
        JsonArray.push(post_id)
      }else if(json.data.user.edge_owner_to_timeline_media.edges[i].node.__typename === "GraphSidecar"){
        let post_id = json.data.user.edge_owner_to_timeline_media.edges[i]
        JsonArray.push(post_id)
      }
    }
    for(let i = 0;i<JsonArray.length;i++){
      setTimeout(()=>{
        this.GetAvailableId3(JsonArray[i])
      },i*151)
    }

 }

  //prima ime spotteda, salje cursor i id u getNextPagefromhash
  InstagramPosts(instagram_user){
    let url = "https://www.instagram.com/" + instagram_user +"/?__a=1"        
    let nextPage = ""
    this.http.get(url)
    .subscribe((data : any) =>{
      let json = JSON.parse(data.text())
      let id = json.graphql.user.id
      let cursor = json.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
      console.log(cursor,json)
      this.GetNextPageFromHash(cursor,id)
    }) 
  }

  GetNextPageFromHash(cursor,id_user){
    console.log(cursor)
    let number_of_reads = 10
    cursor = cursor.slice(0,cursor.length-2)
    console.log(id_user)
    let link = "https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables=%7B%22id%22%3A%22 " + id_user + "%22%2C%22first%22%3A "+ number_of_reads + "%2C%22after%22%3A%22" + cursor + "%3D%3D%22%7D"
    window.open(link)
  }
  async GetAvailableId3(string){
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
        this.GetAvailableId3(string)
      }else if(answer == "Not Exist!"){
          this.getPostFromJsonPrivate(number,string)
      }else{
        console.log("some error happend")
        return 0;
      }
    },
    (error : any) =>{
      console.log('Something went wrong!');
    });
  
  }

  getPostFromJsonPrivate(number,json){
    console.log(json.node)//graph.shorcode change with node
    if(json.node.is_video == false){}else{
      console.log("isVideo")
      return 0;
    }
    var image = ""
    var description = ""
    if(json.node.__typename == "GraphSidecar"){
      console.log("GraphSidecar")
      if(json.node.edge_sidecar_to_children.edges.length !== 2)//ako ima vise slika
        return
      //let len = json.graphql.shortcode_media.edge_sidecar_to_children.edges.length
      //let items = json.graphql.shortcode_media.edge_sidecar_to_children.edges
      
      let text1 = json.node.edge_sidecar_to_children.edges[0].node.accessibility_caption
      let text2 = json.node.edge_sidecar_to_children.edges[1].node.accessibility_caption

      if(text1 === null || text2 === null){
        return
      }
      //console.log(text1,text2)
      if(text1.includes("tekst")){
        text1 = text1.slice(text1.indexOf("tekst"),text1.length)
      }else{text1 = "_"}
      if(text2.includes("tekst")){
        text2 = text2.slice(text2.indexOf("tekst"),text2.length)
      }else{text2="_"}
      if(text1.length < 7)
        text1 = "_"
      if(text2.length < 7)
        text2 = "_"
      //console.log(text1,text2)
      if(text1.length > text2.length){
        //ako prvi ima duzi string- slika druga opis prvi
    
        image = json.node.edge_sidecar_to_children.edges[1].node.display_resources[1].src
        let text =json.node.edge_sidecar_to_children.edges[0].node.accessibility_caption 
        text = text.slice(text.indexOf('tekst')+7,text.length-1)
        description = text + " (Uvezeno s Instagrama)"
      }else if(text1.length < text2.length){
        let text = json.node.edge_sidecar_to_children.edges[1].node.accessibility_caption
        text = text.slice(text.indexOf('tekst')+7,text.length-1)
        description = text + " (Uvezeno s Instagrama)"
        image = json.node.edge_sidecar_to_children.edges[0].node.display_resources[1].src
      }else{
        return
      }
    }else{// ako nnije sidecar
      image = json.node.display_url
      description = "Uvezeno s Instagrama"
    }

    var time = new Date(json.node.taken_at_timestamp * 1000);
    //var image = json.graphql.shortcode_media.display_url
    var likes = json.node.edge_media_preview_like.count
    //var description = "Uvezeno s Instagrama"
    var drzava = "hrv"
    var regija = "Sisak/Kutina/Novska"
    var lokacija = "none"
    var datum = time.getDate() + "." + (+time.getMonth()+1).toString() + "." + time.getFullYear()
    var vrijeme = "12:00"
    var likes = json.node.edge_media_preview_like.count
    var comments =  0
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
    //let  timess:string = (+(new Date())*1000).toString();

    var user_uploaded = "Uvezeno s Instagrama"
    let serverURL = "https://www.spotted.com.hr/create_post_from_instagram/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {key:3,likes:likes,comments:comments,id: number,imageURL:image,description:description,drzava:drzava,regija:regija,upload_time:+time,lokacija:lokacija,datum:datum,vrijeme:vrijeme,layout_info:layout,user:user_uploaded},
        url       : any      	= serverURL + "index.php";
  
    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      console.log(data.text())
    })


    let comments_i = json.node.edge_media_to_comment.edges.length
    for(let i = 0;i < comments_i;i++){
      let komentar = json.node.edge_media_to_comment.edges[i].node.text
      let komentar_likes = "7"
      this.CreatePost(komentar, komentar_likes,number)

    }

  }



  // pet metoda za javne postove
  // VAZNO: metoda getPostFromJson mora rucno imati stavljem regija i drzava npr(hrv, Zagreb/Gorica)
  // metoda GetFirstPublicPosts mora ima postavljem ime spotteda
  //                   rucno staviti broj krade postova
  instagramPosts = []
  GetFirstPublicPosts(){
    let name = "spotted.vukovarr"//ime spotteda/////////////////////////////////////////////////////////////////////////////////////////////////////
    let link = "https://www.instagram.com/" + name +"/?__a=1"       
    let broj_obajava = 22 // broj preuzimanja .min 12/////////////////////////////////////////////////////////////////////////////////////////
    this.http.get(link).subscribe((data:any)=>{
      //console.log(data.text())
      let json = JSON.parse(data.text())
      let id = json.graphql.user.id
      let cursor = json.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
      let length = json.graphql.user.edge_owner_to_timeline_media.edges.length
      for(let i = 0;i < length;i++){
        if(json.graphql.user.edge_owner_to_timeline_media.edges[i].node.__typename === "GraphImage" && json.graphql.user.edge_owner_to_timeline_media.edges[i].node.is_video == false){
          let post_id = json.graphql.user.edge_owner_to_timeline_media.edges[i].node.shortcode
          this.instagramPosts.push(post_id)
        }else if(json.graphql.user.edge_owner_to_timeline_media.edges[i].node.__typename === "GraphSidecar"){
          let post_id = json.graphql.user.edge_owner_to_timeline_media.edges[i].node.shortcode
          this.instagramPosts.push(post_id)
        }
      }
      cursor = cursor.slice(0,cursor.length-2)
      let nextPage = "https://www.instagram.com/graphql/query/?query_hash=1646709cf5a1aa38200b57c3622b2b49&variables=%7B%22id%22%3A%22" + id + "%22%2C%22first%22%3A" + "10" + "%2C%22after%22%3A%22" + cursor +"%3D%3D%22%7D"
      this.GetOtherPosts(nextPage,broj_obajava - 12,id)
    })
  }
  GetOtherPosts(next_link,reads,user_id){
    if(next_link.length <3)
      return
    if(reads < 11){
      console.log(this.instagramPosts)
      for(let i = 0;i<this.instagramPosts.length;i++){
        // i < this.instagramPosts.lenght
        let url = "https://www.instagram.com/p/" + this.instagramPosts[i] +"/?__a=1" 
        this.http.get(url).subscribe((data:any)=>{
          setTimeout(()=>{
            this.GetAvailableId2(data.text())
          },i*121)
        })
      }
      return
    }
    this.http.get(next_link).subscribe((data:any)=>{// 
      //console.log(data.text())
      let json = JSON.parse(data.text())
      let cursor = json.data.user.edge_owner_to_timeline_media.page_info.end_cursor
      let length = 10

      for(let i = 0;i < length;i++){
        if(json.data.user.edge_owner_to_timeline_media.edges[i].node.__typename =="GraphImage" && json.data.user.edge_owner_to_timeline_media.edges[i].node.is_video == false){
          let post_id = json.data.user.edge_owner_to_timeline_media.edges[i].node.shortcode
          this.instagramPosts.push(post_id)
        }else if(json.data.user.edge_owner_to_timeline_media.edges[i].node.__typename === "GraphSidecar"){
          let post_id = json.data.user.edge_owner_to_timeline_media.edges[i].node.shortcode
          this.instagramPosts.push(post_id)
        }
      }
      console.log("krug")
      cursor = cursor.slice(0,cursor.length-2)
      let nextPage = "https://www.instagram.com/graphql/query/?query_hash=1646709cf5a1aa38200b57c3622b2b49&variables=%7B%22id%22%3A%22" + user_id + "%22%2C%22first%22%3A" + "10" + "%2C%22after%22%3A%22" + cursor +"%3D%3D%22%7D"
      this.GetOtherPosts(nextPage,reads - 10,user_id)

    })
  }

  async GetAvailableId2(string){
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
        this.GetAvailableId2(string)
      }else if(answer == "Not Exist!"){
          this.getPostFromJson(number,string)
      }else{
        console.log("some error happend")
        return 0;
      }
    },
    (error : any) =>{
      console.log('Something went wrong!');
    });
  
  }
  getPostFromJson(number,string){
    let json = JSON.parse(string)
    console.log(json)
    //console.log(string)
    if(json.graphql.shortcode_media.is_video == false){}else{
      console.log("isVideo")
      return 0;
    }
    var image = ""
    var description = ""
    if(json.graphql.shortcode_media.__typename == "GraphSidecar"){
      console.log("GraphSidecar")
      if(json.graphql.shortcode_media.edge_sidecar_to_children.edges.length !== 2)//ako ima vise slika
        return
      //let len = json.graphql.shortcode_media.edge_sidecar_to_children.edges.length
      //let items = json.graphql.shortcode_media.edge_sidecar_to_children.edges
      
      let text1 = json.graphql.shortcode_media.edge_sidecar_to_children.edges[0].node.accessibility_caption
      let text2 = json.graphql.shortcode_media.edge_sidecar_to_children.edges[1].node.accessibility_caption

      if(text1 == null || text2 == null){
        return
      }
      //console.log(text1,text2)
      if(text1.includes("tekst")){
        text1 = text1.slice(text1.indexOf("tekst"),text1.length)
      }else{text1 = "_"}
      if(text2.includes("tekst")){
        text2 = text2.slice(text2.indexOf("tekst"),text2.length)
      }else{text2="_"}
      if(text1.length < 7)
        text1 = "_"
      if(text2.length < 7)
        text2 = "_"
      //console.log(text1,text2)
      if(text1.length > text2.length){
        //ako prvi ima duzi string- slika druga opis prvi
    
        image = json.graphql.shortcode_media.edge_sidecar_to_children.edges[1].node.display_resources[1].src
        let text =json.graphql.shortcode_media.edge_sidecar_to_children.edges[0].node.accessibility_caption 
        text = text.slice(text.indexOf('tekst')+7,text.length-1)
        description = text + " (Uvezeno s Instagrama)"
      }else if(text1.length < text2.length){
        let text = json.graphql.shortcode_media.edge_sidecar_to_children.edges[1].node.accessibility_caption
        text = text.slice(text.indexOf('tekst')+7,text.length-1)
        description = text + " (Uvezeno s Instagrama)"
        image = json.graphql.shortcode_media.edge_sidecar_to_children.edges[0].node.display_resources[1].src
      }else{
        return
      }
    }else{// ako nnije sidecar
      image = json.graphql.shortcode_media.display_url
      description = "Uvezeno s Instagrama"
    }

    var time = new Date(json.graphql.shortcode_media.taken_at_timestamp * 1000);
    //var image = json.graphql.shortcode_media.display_url
    var likes = json.graphql.shortcode_media.edge_media_preview_like.count
    //var description = "Uvezeno s Instagrama"
    var drzava = "hrv"
    var regija = "Vukovar/Vinkovci/Otok"//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    var user_uploaded = "Uvezeno s Instagrama"
    //let  timess:string = (+(new Date())*1000).toString();

    let serverURL = "https://www.spotted.com.hr/create_post_from_instagram/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {key:3,likes:likes,comments:comments,id: number,imageURL:image,description:description,drzava:drzava,regija:regija,upload_time:+time,lokacija:lokacija,datum:datum,vrijeme:vrijeme,layout_info:layout,user:user_uploaded},
        url       : any      	= serverURL + "index.php";
  
    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      console.log(data.text())
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
            console.log("komentar dodan :" ,data.text())

          })


       }else{
          //this.AlertErrorUpload()
       }

    })

  }







  CheckUpdates(){
    let serverURL = "https://www.spotted.com.hr/check_version/"
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= {key:3,version:this.version},
            url       : any      	= serverURL + "index.php";
    
        this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>{
          let answer = data.text()
          console.log(answer)
          if(!answer.includes("Updated")){
            this.AlertNeedUpdate()
          }

        })
  }

  async AlertNeedUpdate() {
    const alert = await this.alertController.create({
      cssClass: this.alertClass,
      message: '<h5 class='+ this.alertMessageH5 +'>Novo ažuriranje!</h5><br/><p class='+ this.alertMessageP +'>Molimo Vas da ažurirate aplikaciju za nastavak korištenja.</p>',
      buttons: [
        {
          text: 'Ažuriraj',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            window.open("https://play.google.com/store/apps/details?id=com.spotted.io")
          }
        }
      ]
    });
    await alert.present();

  }

  OpenChat(){
    this.router.navigate(['home/chat'])
  }

  ShowNotifPrepareAnimation(){
    setTimeout(()=>{
      document.getElementById("notif_id").setAttribute("style","font-size:25px")
      document.getElementById("notif_div").setAttribute("style","padding-right:8px")
    },50)
  }

  async ToastPoslanoNaPregled() {
    var welcome = "Objava poslana na pregled";
    const toast = await this.toastController.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }


  images_url = []
  GiveFullAd(){
    const adConfig: AdMobFreeInterstitialConfig = {
      id:"ca-app-pub-9933506788213398/3473282286",
      autoShow: true
    }
    this.admobFree.interstitial.config(adConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch((e) =>{
      console.log(e)
    })

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
    Izaberi_grad:"Izaberi grad"
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
    Izaberi_grad:"Изабери град"

  }
  
    
  SakrijObjavu(string){
    if(this.Posts.length < 4){
      //toast nemozete sve objave sakrit
      this.PrijavaPostaTOAST("Već ste sakrili neke objave, molimo pričekajte.")
      return
    }
    for(let i = 0;i<this.Posts.length;i++){
      if(this.Posts[i].id === string){
        document.getElementById(string + "_div").style.display = "none"
      } 

    }
  }
  PrijaviObjavu(string){
    console.log(this.user.isAdmin())
    //console.log(string,this.user.isAdmin(),this.user.getNadimak())
    if(this.user.isAdmin()){
      if(this.user.getNadimak() === "marioadmin" || this.user.getNadimak() === "gracoadmin" || this.user.getNadimak() === "zlajoadmin"){
        let serverURL = "https://www.spotted.com.hr/block_post/"
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= {key:3,id:+string,user:"spottedc_stjepko",pass:"jedigovna321"},
            url       : any      	= serverURL + "index.php";
    
        this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>{
          let answer = data.text();
          if(answer === ("Done!")){
            this.PrijavaPostaTOAST("Objava je uspješno uklonjena.")
            this.SakrijObjavu(string)
          }else if(answer === ("Done2!")){
            this.PrijavaPostaTOAST("Objava je uspješno prijavljena.")
          }else{
            this.PrijavaPostaTOAST("Dogodila se pogreška, pokušajte ponovo.")
          }
        })
      }
    }else{
      let serverURL = "https://www.spotted.com.hr/block_post/"
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {key:3,id:+string,user:"noadminuser",pass:"jedigovna321"},
          url       : any      	= serverURL + "index.php";
  
      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>{
        let answer = data.text();
        if(answer === ("Done!")){
          this.PrijavaPostaTOAST("Objava je uspješno uklonjena.")
          this.SakrijObjavu(string)
        }else if(answer === ("Done2!")){
          this.PrijavaPostaTOAST("Objava je uspješno prijavljena.")
        }else{
          this.PrijavaPostaTOAST("Dogodila se pogreška, pokušajte ponovo.")
        }
      })
    }
  }

  PosaljiPoruku(string){
    let serverURL = "https://www.spotted.com.hr/get_user_from_post/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {key:3,id:string},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      console.log(data.text())
      if(data.text().length < 1){
        this.ToastNemaKorisnika()
      }else if(data.text() === "Error"){
        this.ToastErrorKodPoruke()
      }else if(data.text().length > 0){
        this.user.messageUser = data.text()
        this.router.navigate(['/home/chat'])
      }


    })

    //get korisnik id
    //set id u mainvars
  }

  async ToastErrorClipBoard() {
    var welcome = "Kopirano u međuspremnik";
    const toast = await this.toastController.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }

  async ToastErrorKodPoruke() {
    var welcome = "Molimo provjerite Vašu internet vezu";
    const toast = await this.toastController.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }

  async ToastNemaKorisnika() {
    var welcome = "Nažalost, korisnik je zabranio slanje poruka";
    const toast = await this.toastController.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }


  async PrijavaPostaTOAST(string) {
    var welcome = string;
    const toast = await this.toastController.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 1500,
      position: "bottom",
    });
    toast.present();
  }
  



    async DoubleTapToast() {
      var welcome = "Pritisnite još jednom za izlazak iz aplikacije"
      const toast = await this.toastController.create({
        cssClass: this.toastClass,
        message: welcome,
        duration: 1500,
        position: "bottom",
      });
      toast.present();
    }


    async ChooseDeloveAlert() {
      const alert = await this.alertController.create({
        header: 'Izaberi grad',
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
              if(data === undefined){
                return
              }else{
                document.getElementById("regija_srb_id").textContent = data
              }
              this.regijaFilter(data)
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
              if(data === undefined){
                return
              }else{
                document.getElementById("regija_hrv_id").textContent = data
              }
              this.regijaFilter(data)
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
              if(data === undefined){
                return
              }else{
                document.getElementById("regija_bih_id").textContent = data
              }
              this.regijaFilter(data)
            }
          }
        ]
      });
      
      
      await alert.present();
    }
    async ChooseCountryAlert() {
      console.log(this.alertClass)
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
              let drzava = ""
              if(data === "hrv"){
                this.drzavaFilter(data)
                drzava = "Hrvatska"
              }else if(data === "srb"){
                drzava = "Srbija"
                this.drzavaFilter(data)
              }else if(data === "bih"){
                this.drzavaFilter(data)
                drzava = "Bosna i Hercegovina"
              }
              let item = document.getElementById("drzava_label_id")
              if(drzava.length > 2)
                item.textContent = drzava
            }
          }
        ]
      });
  
      await alert.present();
    }



  AlertChangeColorPicker(){
    if(this.user.getUI().toString() === "2"){
      setTimeout(()=>{
        let item = document.getElementsByClassName("picker-button")
        item[0].setAttribute("style","--ion-color-primary: rgb(59,248,156)")
        item[1].setAttribute("style","--ion-color-primary: rgb(59,248,156)")
        item = document.getElementsByClassName("picker-wrapper")
        item[0].setAttribute("style","--background:rgb(241,241,241);")
        item = document.getElementsByClassName("picker-toolbar-button")
        item[0].setAttribute("style","background-color:rgb(241,241,241);")
        item[1].setAttribute("style","background-color:rgb(241,241,241);")

        item = document.getElementsByClassName("picker-opt")
        let x = item.length
        for(let i = 0;i<x;i++){
          let style = item[i].getAttribute("style")
          style = style + "color:black;"
          item[i].setAttribute("style",style)
        }

      },50)
    }else{
      setTimeout(()=>{
        let item = document.getElementsByClassName("picker-below-highlight")
        let items = document.getElementsByClassName("picker-above-highlight")
        item[0].setAttribute("style","background: linear-gradient(0deg,var(--background,var(--ion-background-color,#fff)) 30%,rgba(var(--background-rgb,var(--ion-background-color-rgb,50,50,50)),.8))")
        items[0].setAttribute("style","background: linear-gradient(180deg,var(--background,var(--ion-background-color,#fff)) 20%,rgba(var(--background-rgb,var(--ion-background-color-rgb,50,50,50)),.8))")
      },50)
    }


  }


  

  imageToShow:any = ""
  openCamera(){
    const options: CameraOptions ={
      allowEdit:true,
      correctOrientation: true,
      saveToPhotoAlbum:true,
      quality:100,
      targetWidth:800,
      targetHeight:1000,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
      document.getElementById("check1" ).setAttribute("color","success")
      document.getElementById("check1p").style.color = "lightgreen"
      this.scrollToBottom()
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      this.imageToShow = 'data:image/jpeg;base64,' + imageData;

      console.log(this.currentImage)
      }, (err) => {
      // Handle error
      });
  }

  openGallery(){
    let cameraOptions:CameraOptions = {
      allowEdit: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,      
      quality: 100,
      targetWidth: 800,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true,
      saveToPhotoAlbum: false,
    }
    this.camera.getPicture(cameraOptions)
    .then(file_uri => {
      document.getElementById("check1" ).setAttribute("color","success")
      document.getElementById("check1p").style.color = "lightgreen"
      this.imageToShow = 'data:image/jpeg;base64,' + file_uri
      this.currentImage = 'data:image/jpeg;base64,' + file_uri
    })
    err =>  console.log(err)  

  }

  async upload(number) {
    let loader  = this.loadingController.create({
      message: '',
      duration: 5000,
    });
    (await loader).present
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: number + '.png',
       chunkedMode: false,
       mimeType: "image/png",
       headers: {}
    
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    //console.log(this.currentImage)
    fileTransfer.upload(this.currentImage, 'https://www.spotted.com.hr/image_uploader/index.php', options)
     .then((data) => {
       if(data.response == "Upload"){
        //this.AlertPostUploaded()

        this.uploadPost(number,"ye")
        this.loadingController.dismiss()

      }else{
         //error uploade imgaeg
         this.loadingController.dismiss()

       }
    }, (err) => {
      console.log(err) 
     })
     


  }
  IonDrag(event){
    console.log(event)

  }



  scrollToBottom() {
    this.getContent().scrollToTop(500)
  }
  getContent() {
    return document.querySelector('ion-content');
  }
  
  ContinuePosts(){
    this.LoadPostsWithRegion()

  }

  loadData(event){
    this.ContinuePosts()
    event.target.complete()
    //this.getContent().scrollBy(0,-200)
  }

  constructorLoad(){
    setTimeout(() =>{ 
      if(this.appVariables.getReloadPage()){
        this.PreloadPosts()
      }else{
          this.constructorLoad()
      }
    }, 1000 );
  }

  PreloadPosts(){
    this.scrollToBottom()
    setTimeout(()=>{
      this.selectInfo = ""
      this.currentImage = ""
      this.selectDrzavu = ""
      this.selectRegiju = ""
      this.selectDate = ""
      this.selectTime = ""
      this.selectLokaciju = ""
      this.PostsId = []
      this.holdPosts = true
      this.appVariables.setReloadPage(false)
      this.constructorLoad()
      this.LoadPostsWithRegion()
      document.getElementById("inf_spinner").style.display = "block"

    },350)
  }



  holdPosts:any = false;
  LoadPostsWithRegion(){

    //console.log(3, 3,this.PostsId, this.appVariables.selectedHrvRegije,this.appVariables.selectedBihRegije,this.appVariables.selectedSrbRegije)

    let serverURL = "https://www.spotted.com.hr/load_posts_with_region/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,key: 3,posts:this.PostsId, hrv: this.appVariables.selectedHrvRegije,bih:this.appVariables.selectedBihRegije,srb:this.appVariables.selectedSrbRegije},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
       console.log(answer)
       if(answer.includes('"id":') && answer.includes('"imgURL":') && answer.includes('"layout_info":')){
        answer = answer.slice(0,answer.length - 5)
        console.log(answer)
        if(this.holdPosts === true){
          this.Posts = []
          this.holdPosts = false
        }
        while(1){
          if(answer.length < 15){
            break;
          }
          let pos = answer.indexOf('"}') + 2
          let json = answer.slice(0,pos)
          json = JSON.parse(json)
          answer = answer.slice(pos,answer.length)

          this.post_id = json.id
          this.post_image = json.imgURL
          this.post_description = json.description
          this.post_drzava = json.drzava
          this.post_regija = json.regija
          this.post_lokacija = json.lokacija
          this.post_datum = json.datum
          this.post_vrijeme = json.vrijeme
          this.post_likes = json.likes
          this.post_comments = json.komentari
          this.post_layout_info = json.layout_info
          let tmp_post_comments_locked = json.comments_locked
          this.post_upload_time = json.time_uploaded
          //console.log(this.post_datum)
          this.post_drzava = json.drzava
          if(this.post_drzava == "hrv"){
            this.post_drzava = "Hrvatska"
          }else if(this.post_drzava == "bih"){
            this.post_drzava = "Bosna i Hercegovina"
          }else{
            this.post_drzava = "Srbija"
          }

          let tmp_post = new Post
          tmp_post.id = this.post_id
          tmp_post.description = this.post_description
          tmp_post.imageURL = this.post_image
          tmp_post.drzava = this.post_drzava
          tmp_post.regija = this.post_regija
          tmp_post.lokacija = this.post_lokacija
          tmp_post.likes = +this.post_likes
          tmp_post.comments = +this.post_comments
          tmp_post.layout_info = +this.post_layout_info
          tmp_post.vrijeme = json.vrijeme
          tmp_post.datum = json.datum
          tmp_post.upload_date = this.post_upload_time
          tmp_post.setComLocked(tmp_post_comments_locked);
          tmp_post.SepareLayout()

          let image_link
          //console.log(json.imgURL)
          if(json.imgURL == "ye"){
            image_link = "https://www.spotted.com.hr/image_uploader/images/" + tmp_post.id +".png"
          }else if(json.imgURL == "no"){
            image_link = "https://www.spotted.com.hr/image_uploader/images/no_image.png"
          }else{
            image_link = json.imgURL
          }
          if(tmp_post.lokacija === "none"){tmp_post.lokacija = ""}

          tmp_post.imageURL = image_link

          this.Posts.push(tmp_post)

          /*for(let i = 0;i<this.Posts.length;i++){
            for(let j = i+1;j < this.Posts.length - 1;j++){
              if(this.Posts[i].id === this.Posts[j].id){
                console.log("isti")
              }
              
            }
          }*/

          this.brojacPostova +=1
          this.PostsId.push(tmp_post.id)
          

          
          }
        }else if(answer == "EOF!!"){
          console.log("No posts")
          this.AlertNoPosts()
       }else{
          //prekida rekurziju
      }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       this.AlertErrorUpload()
    
    });
  }




  openFilters(){
    this.appVariables.leaveApp = false
    this.router.navigate(['home/filter']);
  }


  enableMenuAlways(){
    setInterval( () => { 
      this.menu.enable(this.user.GetEnableMenu())
    }, 1000 );
  }

  ContainSpecialChars(string){
    if((/^[a-zA-Z!._@,?0-9\s\n\r]+$/i.test(string))){
      return true
    }
    return false
   }


  LoadPosts(number){
    if(number == 0){
      this.LoadPostsWithRegion()
      return 0;
    }
    number -= 1
    let serverURL = "https://www.spotted.com.hr/api/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {key: this.brojacPostova.toString()},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
       //console.log("LoginExist http sended: " + answer)
       if(answer.includes('"id":') && answer.includes('"imgURL":') && answer.includes('"layout_info":')){
          //console.log(data)
          let json = JSON.parse(data["_body"])
          //console.log(json.id)
          this.post_id = json.id
          this.post_image = json.imgURL
          this.post_description = json.description
          this.post_drzava = json.drzava
          if(this.post_drzava == "hrv"){
            this.post_drzava = "Hrvatska"
          }else if(this.post_drzava == "bih"){
            this.post_drzava = "Bosna i Hercegovina"
          }else{
            this.post_drzava = "Srbija"
          }

          this.post_regija = json.regija
          this.post_lokacija = json.lokacija
          this.post_datum = json.datum
          this.post_vrijeme = json.vrijeme
          this.post_likes = json.likes
          this.post_comments = json.komentari
          this.post_layout_info = json.layout_info
          let tmp_post_comments_locked = json.comments_locked
          this.post_upload_time = json.time_uploaded

        answer = null

        let tmp_post = new Post
        tmp_post.id = this.post_id
        tmp_post.description = this.post_description
        tmp_post.datum = json.datum
        tmp_post.vrijeme = json.vrijeme
        tmp_post.drzava = this.post_drzava
        tmp_post.regija = this.post_regija
        tmp_post.lokacija = this.post_lokacija
        tmp_post.likes = +this.post_likes
        tmp_post.comments = +this.post_comments
        tmp_post.layout_info = +this.post_layout_info
        tmp_post.upload_date = this.post_upload_time
        tmp_post.setComLocked(tmp_post_comments_locked);

        if(tmp_post.lokacija == "none"){
          tmp_post.lokacija = " "
        }
        tmp_post.SepareLayout()
        let image_link
        if(json.imgURL == "ye"){
          image_link = "https://www.spotted.com.hr/image_uploader/images/" + tmp_post.id +".png"
        }else if(json.imgURL == "no"){
          image_link = "https://www.spotted.com.hr/image_uploader/images/no_image.png"
        }else{
          image_link = json.imgURL
        }

        //console.log(image_link)
        tmp_post.imageURL = image_link
        this.Posts.push(tmp_post)
        this.Posts.sort((a,b)=> a.likes > b.likes ? -1 : 1)
        this.brojacPostova +=1
        this.PostsId.push(tmp_post.id)

        }else if(answer == "Nema Postova"){
          number = 0;
       }else{
          number = 0;//prekida rekurziju
      }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       this.AlertErrorUpload()
    
    });
    this.brojacPostova = +this.brojacPostova + 1
      this.LoadPosts(number)
  }





USER_INFORMATION = "";
USER_ID
USER_NADIMAK
USER_PASSWORD
USER_ISADMIN = false
USER_ISPREMIUM = false
SetUserInformations(string){
  var startPosition = string.indexOf("User Id:") + 8 ; //
  var endPosition = string.indexOf("Nadimak:"); // 3 cuz "," is end of last string
  this.USER_ID = string.slice(startPosition, endPosition);

  startPosition = string.indexOf("Nadimak:") + 8 ; //
  endPosition = string.indexOf("Password:"); // 3 cuz "," is end of last string
  this.USER_NADIMAK = string.slice(startPosition, endPosition);

  startPosition = string.indexOf("Password:") + 9 ; //
  endPosition = string.indexOf("IsPremium:"); // 3 cuz "," is end of last string
  this.USER_PASSWORD = string.slice(startPosition, endPosition);

  startPosition = string.indexOf("IsPremium:") + 10 ; //
  endPosition = string.indexOf("IsAdmin:"); // 3 cuz "," is end of last string
  if(string.slice(startPosition, endPosition)==1){
    this.USER_ISPREMIUM = true;
  }else{
    this.USER_ISPREMIUM = false;
  }


  startPosition = string.indexOf("IsAdmin:") + 8; //
  if(string.slice(startPosition, startPosition+1) == 1){
    this.USER_ISADMIN = true;
    }else{
    this.USER_ISADMIN = false;
  }
  this.user.setNadimak(this.USER_NADIMAK)
  this.user.setPassword(this.USER_PASSWORD)
  this.user.setAdmin(this.USER_ISADMIN)
  this.user.setPremium(this.USER_ISPREMIUM)
  this.user.setID(this.USER_ID)

}






post_id = "0"
post_image = "319bd745-30b6-464c-8320-3267131b819a"// link to loading image
post_description = "Loading..."
post_drzava = "Loading..."
post_regija = "Loading..."
post_lokacija = "Loading..."
post_datum = "Loading..."
post_vrijeme = "Loading..."
post_likes = "0"
post_comments = "0"
post_layout_info = "111"
post_upload_time = "Loading..."

post_counter_page = 0;


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
     console.log("Server http sended.")
     console.log("Response for get_available_id is " + data.text())
     if(answer == "Exist!"){
      this.GetAvailableId()
      }else if(answer == "Not Exist!"){
        if(this.currentImage.length > 3){
          this.upload(number)
        }else{
          this.uploadPost(number,"no")
        }
     }else{
        this.AlertErrorUpload()
     }
   },
  (error : any) =>
  {
     console.log('Something went wrong!');
     this.AlertErrorUpload()

  });

}





async Loader(time) {
  const loading = await this.loadingController.create({
    message: '',
    duration: time,
    cssClass: this.loaderCustomClassCss
    });
  await loading.present();
  const { role, data } = await loading.onDidDismiss();
  //console.log('Loading dismissed!');

}

enableMenu(){
  setTimeout( () => { 
    this.menu.enable(true)
  }, 1000 );
}




likeOpened = false;
shareOpened = false;
commentOpened = false;
BTimeOpened = false; 
BWhereOpened = false;
BPhotoOpened = false;
BImageOpened = false;
selectDrzavu = "";
selectRegiju = "";
selectLokaciju ="";
selectInfo = "";
selectDate = "";
selectTime = "";


like_image1 = "url('../../../assets/images/emoji/like1.png')"
like_image2 = "url('../../../assets/images/emoji/like2.png')"
like_image3 = "url('../../../assets/images/emoji/like3.png')"
like_image4 = "url('../../../assets/images/emoji/like4.png')"
like_image1e = "url('../../../assets/images/emoji/like1e.png')"
like_image2e = "url('../../../assets/images/emoji/like2e.png')"
like_image3e = "url('../../../assets/images/emoji/like3e.png')"
like_image4e = "url('../../../assets/images/emoji/like4e.png')"
comment_image1 = "url('../../../assets/images/emoji/comment1.png')"
comment_image2 = "url('../../../assets/images/emoji/comment2.png')"
comment_image3 = "url('../../../assets/images/emoji/comment3.png')"
comment_image4 = "url('../../../assets/images/emoji/comment4.png')"
comment_image1e = "url('../../../assets/images/emoji/comment1e.png')"
comment_image2e = "url('../../../assets/images/emoji/comment2e.png')"
comment_image3e = "url('../../../assets/images/emoji/comment3e.png')"
comment_image4e = "url('../../../assets/images/emoji/comment4e.png')"
share_image1 = "url('../../../assets/images/emoji/share1.png')"
share_image2 = "url('../../../assets/images/emoji/share2.png')"
share_image3 = "url('../../../assets/images/emoji/share3.png')"
share_image4 = "url('../../../assets/images/emoji/share4.png')"
share_image1e = "url('../../../assets/images/emoji/share1e.png')"
share_image2e = "url('../../../assets/images/emoji/share2e.png')"
share_image3e = "url('../../../assets/images/emoji/share3e.png')"
share_image4e = "url('../../../assets/images/emoji/share4e.png')"

like_image_info = 1
comment_image_info = 1
share_image_info = 1


//drzava filter values
new_post_drzava = "all";
new_post_drzava1 = "hrv";
new_post_drzava2 = "srb";
new_post_drzava3 = "bih";
//regija,lokacija, info i image filter value
new_post_regija = "";
new_post_lokacija = "";
new_post_info = "";
new_post_date = "";
new_post_time = "";
image_selected = true;





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



openSearch(){
  this.appVariables.leaveApp = false
  this.router.navigate(['home/search']);
}





imageURL: string
description: string = "it s empty";
postID
post_number = 5;
sub
imageURL_UP = "";
fileFinal
postRef
shit
post
imageUploaded = false;
available_id = 0
image_url
//database = firebase.database();



/*async UploadImage(post_id){
if(this.imageUploaded == true){
  const files = this.fileFinal;
  const data = new FormData
  data.append('file',files[0])
  data.append('UPLOADCARE_STORE','1')
  data.append('UPLOADCARE_PUB_KEY','fb39ce202c306f65b02b')
  this.http.post('https://upload.uploadcare.com/base/',data).subscribe(
    event=>{   
      this.imageURL = event.json().file
      this.uploadPost(post_id,this.imageURL)
      console.log("slika uploadana")
    }
  )
 
}else{
  this.imageURL = "abc52b5d-1ed1-498b-9410-b1b711ec0a34";
  this.post_image = this.imageURL
  this.uploadPost(post_id,this.imageURL)
}
}*/

uploadPost(new_post_id,new_post_image){
  this.Loading()

  

  const id = new_post_id.toString()
  const imageURL = new_post_image
  const description = this.new_post_info
  const drzava = this.new_post_drzava
  const regija = this.new_post_regija
  let lokacija = this.new_post_lokacija
  if(this.new_post_lokacija.length < 3){
    lokacija = "none"
  }
  let datum = this.tmp_datum
  let vrijeme = this.tmp_vrijeme
  if(vrijeme == "NaN:NaN"){
    vrijeme = "12:00"
  }
  const layout_info = this.like_image_info.toString()+this.comment_image_info.toString() + this.share_image_info.toString()
  let upload_time = new Date

  let upload_time_s = new Date()
  

  if(datum.includes("NaN")){
    let date = ""
    let month = ""
    if(+upload_time_s.getDate() <10){
      date = "0" + upload_time_s.getDate().toString()
    }else{date = upload_time_s.getDate().toString()}

    if(+upload_time_s.getMonth()+1 <10){
      month = "0" + (+upload_time_s.getMonth()+1).toString()
    }else{month = (+upload_time_s.getMonth()+1).toString()}

    datum =   date + "." + month + "." +upload_time_s.getFullYear()

  }
  let  time:string = (+(new Date())*1000).toString();


  
  let serverURL = "https://www.spotted.com.hr/setpost/"
  let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= {
        pass:3,
        "id" : id,
        "imageURL" : imageURL,
        "description" : description,
        "drzava" : drzava,
        "regija" : regija,
        "lokacija" : lokacija,
        "datum" : datum,
        "vrijeme" : vrijeme,
        "layout_info" : layout_info,
        "upload_time" : time,
        "user" : this.user.getNadimak()

    },
      url       : any      	= serverURL + "index.php";

  this.http.post(url, JSON.stringify(options), headers)
  .subscribe((data : any) =>{
    this.loadingController.dismiss()
      let answer = data.text()
      if(answer == "Inserted"){
        this.ToastPoslanoNaPregled()
        this.AlertPostUploaded()
      }else{
        this.AlertErrorUpload()
      }
      console.log(answer)
   },
  (error : any) =>
  {
     console.log('Something went wrong with upload!');
     this.AlertErrorUpload()
  });
}


async AlertPostUploaded() {
  this.GiveFullAd()
  const alert = await this.alertController.create({

    cssClass: this.alertClass,
    message: '<h5 class='+ this.alertMessageH5 +'>Uspješno objavljeno</h5><br/><p class='+ this.alertMessageP +'>Uspješno objavljivanje. Vaša objava će u vrlo kratkom roku biti vidljiva svima.</p>',
    
    buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler: (blah) => {
          //prekid posta
        }
      }
    ]
  });

  await alert.present();
}



async AlertLeaveApk() {
  const alert = await this.alertController.create({

    cssClass: this.alertClass,
    message: '<p class='+ this.alertMessageP +'>Napusti aplikaciju? </p>',
   
    buttons: [
      {
        text: 'Prekid',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          //prekid posta
        }
      }, {
        text: 'Napusti',
        handler: () => {
          //this.GetAvailableId()
          //posalji na server post
        }
      }
    ]
  });
  await alert.present();

}


async AlertErrorUpload() {
  const alert = await this.alertController.create({

    cssClass: this.alertClass,
    message: '<h5 class='+ this.alertMessageH5 +'>Greška</h5><br/><p class='+ this.alertMessageP +'>Nažalost, dogodila se pogreška. Molimo provjerite internet konekciju ili pokušajte ponovo.</p>',
   
    buttons: [
      {
        text: 'Prekid',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          //prekid posta
        }
      }, {
        text: 'Ponovo probaj',
        handler: () => {
          this.GetAvailableId()
          //posalji na server post
        }
      }
    ]
  });

  await alert.present();
}

async AlertNoPosts() {
  document.getElementById("inf_spinner").style.display = "none"
  const alert = await this.alertController.create({

    cssClass: this.alertClass,
    message: '<h5 class='+ this.alertMessageH5 +'>Oops!</h5><br/><p class='+ this.alertMessageP +'>Nažalost, nismo pronašli više objava za te regije!</p>',

    buttons: [
      {
        text: 'Prekid',
        role: 'cancel',
        cssClass: 'danger',
        handler: (blah) => {

        }
      }
    ]
  });

  await alert.present();
}



  



async Loading() {
  const loading = await this.loadingController.create({
    message: '',
    duration: 3000,
    cssClass: 'spinner'
  });
  await loading.present();
  const { role, data } = await loading.onDidDismiss();
}

hideRegions(){
  let x = document.getElementById('zg');

}




currentImage:string = ""
new_post_layout_info = "111"
tmp_datum
tmp_vrijeme = "12:00"
async createPost(){
  let img_opis:boolean = false

  let loader  = this.loadingController.create({
    message: '',
    duration: 5000,
  });
  (await loader).present

  if(this.new_post_info.length > 5){ 
      if(this.ContainSpecialChars(this.new_post_info)){
        img_opis = true
      }else{
        this.loadingController.dismiss()
        this.AlertNoSpecialChars()
        return 0
      }
  }else{

  }


  if(this.new_post_lokacija.length > 3){
    if(this.ContainSpecialChars(this.new_post_lokacija)){
    }else{
      this.loadingController.dismiss()
      this.AlertNoSpecialChars()
      return 0
    }
  }

  if(this.currentImage.length > 3){
    img_opis = true
  }

  if(img_opis){
  }else{
    this.AlertNoInfo()
    this.loadingController.dismiss()
    return 0
  }

  if(this.new_post_lokacija.length <= 5){
    this.new_post_lokacija = ""
  }
  if(this.new_post_info.length <= 5){
    this.new_post_info = ""
  }


  //console.log("Informacije: " + this.new_post_info);//ok
  var tmp_info = this.like_image_info.toString() + this.comment_image_info.toString() + this.share_image_info.toString()  
  var tmp_date = new Date(this.new_post_date)
   this.tmp_datum = tmp_date.getDate() + "." + (+tmp_date.getMonth() + 1).toString() + "." + tmp_date.getFullYear()
  //console.log("Datum: " + this.tmp_datum);//ok
  //console.log("Tmp info: " + tmp_info);//ok
  var tmp_time = new Date(this.new_post_time)
  this.tmp_vrijeme = tmp_time.getHours() + ":" + tmp_time.getMinutes()
  if(tmp_time.getMinutes() == 0){
    this.tmp_vrijeme = this.tmp_vrijeme + "0"
  }
  console.log("Sati: " + this.tmp_vrijeme);//ok
  this.loadingController.dismiss()

  if(this.new_post_drzava == "all" || this.new_post_regija == ""){
    this.AlertNoInfo();
  }else if(this.currentImage.length < 3  && this.new_post_info.length < 5){
    this.AlertNoInfo();
  }else{// objava moze proci
    if(this.currentImage.length > 3){
      this.AlertAllOk();
    }else{
      this.AlertNoImage();
    }
  }



}
alertMessageH5 = ""// ime klase jel light ili dark
alertMessageP = ""
alertClass = ""

async AlertAllOk() {
  const alert = await this.alertController.create({
    cssClass: this.alertClass,
    message: '<h5 class='+ this.alertMessageH5 +'>Potvrdi!</h5><br/><p class='+ this.alertMessageP +'>Potvrdite za objavljivanje. Pritiskom tipke Potvrdi biti će Vam prikazana jedna reklama te nakon nje će se izvršiti objava.</p>',
    buttons: [
      {
        text: 'Prekid',
        role: 'cancel',
        handler: (blah) => {
          //prekid posta
        }
      }, {
        text: 'Potvrdi',
        handler: () => {
          this.Loader(1000)
          this.GetAvailableId()
          //posalji na server post
        }
      }
    ],

  });
  await alert.present();
}





async AlertNoImage() {
  const alert = await this.alertController.create({
    cssClass: this.alertClass,
    message: '<h5 class='+ this.alertMessageH5 +'>Potvrdi!</h5><br/><p class='+ this.alertMessageP +'>Nije izabrana niti jedna fotografija,  ukoliko ne izaberete fotografiju biti će postavljena naša fotografija. Pritiskom tipke Objavi biti će Vam prikazana jedna reklama te nakon nje će se izvršiti objava.</p>',
     buttons: [
      {
        text: 'Prekid',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Objavi',
        handler: () => { 
          this.Loader(1000)
          this.GetAvailableId()
        }
      }
    ]
  });

  await alert.present();
}
async AlertNoInfo() {
  console.log(this.alertClass)
  const alert = await this.alertController.create({

    cssClass: this.alertClass,
    message: '<h5 class='+ this.alertMessageH5 +'>Nije moguće završiti objavu</h5><br/><p class='+ this.alertMessageP +'>Obavezne stavke su <br/><br/>- Unos države i regije<br/>- Unos opisa ili fotografije</p>',
   
    buttons: ['OK']
  });

  await alert.present();
}

async AlertNoSpecialChars() {
  const alert = await this.alertController.create({

    cssClass: this.alertClass,
    message: '<h5 class='+ this.alertMessageH5 +'>Nije moguće završiti objavu</h5><br/><p class='+ this.alertMessageP +'>Razlog <br/><br/>- Koristite nedopuštene znakove, molimo koristite slova, brojve ili dopuštene znakove ( ? ! @ , i slično).</p>',

    buttons: ['OK']
  });

  await alert.present();
}



chooseDesc(){
  document.getElementById('text_area').style.display = "none";
  document.getElementById('date_time_picker').style.display = "none";
  document.getElementById('region_select').style.display = "none";
  document.getElementById('image_picker').style.display = "none"; 
  document.getElementById('ui_picker_id').style.display = "none";
  document.getElementById('ion_icon_5').setAttribute("color","danger")
  document.getElementById('ion_icon_3').setAttribute("color","light")
  document.getElementById('ion_icon_2').setAttribute("color","light")
  document.getElementById('ion_icon_1').setAttribute("color","light")
  document.getElementById('ion_icon_4').setAttribute("color","light")
  document.getElementById('text_area').style.display = "block";




}



chooseTime(){
  document.getElementById('text_area').style.display = "none";
  document.getElementById('date_time_picker').style.display = "none";
  document.getElementById('region_select').style.display = "none";
  document.getElementById('image_picker').style.display = "none"; 
  document.getElementById('ui_picker_id').style.display = "none";
  document.getElementById('ion_icon_1').setAttribute("color","light")
  document.getElementById('ion_icon_2').setAttribute("color","light")
  document.getElementById('ion_icon_3').setAttribute("color","light")
  document.getElementById('ion_icon_4').setAttribute("color","light")
  document.getElementById('ion_icon_5').setAttribute("color","light")

  if(this.BTimeOpened){
    this.BTimeOpened = false;
    this.BWhereOpened = false;
    this.BUIOpened = false;
    this.BImageOpened = false; 
    document.getElementById('text_area').style.display = "block";
    document.getElementById('ion_icon_5').setAttribute("color","danger")


  }else{
    this.BTimeOpened= true;      
    this.BWhereOpened = false;
    this.BUIOpened = false;
    this.BImageOpened = false;
    this.BTAOpened = false;
    document.getElementById('date_time_picker').style.display = "block";
    document.getElementById('ion_icon_3').setAttribute("color","danger")


  }
}
  BUIOpened = false;
  BTAOpened = true;
chooseUI(){
    document.getElementById('text_area').style.display = "none";
    document.getElementById('date_time_picker').style.display = "none";
    document.getElementById('region_select').style.display = "none";
    document.getElementById('image_picker').style.display = "none"; 
    document.getElementById('ui_picker_id').style.display = "none";
    document.getElementById('ion_icon_1').setAttribute("color","light")
    document.getElementById('ion_icon_2').setAttribute("color","light")
    document.getElementById('ion_icon_3').setAttribute("color","light")
    document.getElementById('ion_icon_4').setAttribute("color","light")
    document.getElementById('ion_icon_5').setAttribute("color","light")

  if(this.BUIOpened){
    this.BUIOpened = false;
    this.BTimeOpened = false;
    this.BWhereOpened = false;
    this.BImageOpened = false;
    
    document.getElementById('text_area').style.display = "block"; 
    document.getElementById('ion_icon_5').setAttribute("color","danger")

  }else{
    this.BUIOpened= true;     
    this.BTimeOpened = false;
    this.BWhereOpened = false;
    this.BImageOpened = false;
    document.getElementById('ui_picker_id').style.display = "block"; 
    document.getElementById('ion_icon_4').setAttribute("color","danger")
  }
}

chooseFile(){
  document.getElementById('text_area').style.display = "none";
  document.getElementById('date_time_picker').style.display = "none";
  document.getElementById('region_select').style.display = "none";
  document.getElementById('image_picker').style.display = "none"; 
  document.getElementById('ui_picker_id').style.display = "none";
  document.getElementById('ion_icon_1').setAttribute("color","light")
  document.getElementById('ion_icon_2').setAttribute("color","light")
  document.getElementById('ion_icon_3').setAttribute("color","light")
  document.getElementById('ion_icon_4').setAttribute("color","light")
  document.getElementById('ion_icon_5').setAttribute("color","light")


  if(this.BImageOpened){
    this.BImageOpened = false;
    this.BTimeOpened = false;
    this.BUIOpened = false;
    this.BWhereOpened = false;
    document.getElementById('text_area').style.display = "block";
    document.getElementById('ion_icon_5').setAttribute("color","danger")


  }else{
    this.BWhereOpened= false;
    this.BTimeOpened = false;
    this.BUIOpened = false;
    this.BImageOpened = true;
    document.getElementById('image_picker').style.display = "block";
    document.getElementById('ion_icon_2').setAttribute("color","danger")

  }
}
chooseWhere(){
  document.getElementById('text_area').style.display = "none";
  document.getElementById('date_time_picker').style.display = "none";
  document.getElementById('region_select').style.display = "none";
  document.getElementById('image_picker').style.display = "none"; 
  document.getElementById('ui_picker_id').style.display = "none";
  document.getElementById('ion_icon_1').setAttribute("color","light")
  document.getElementById('ion_icon_2').setAttribute("color","light")
  document.getElementById('ion_icon_3').setAttribute("color","light")
  document.getElementById('ion_icon_4').setAttribute("color","light")
  document.getElementById('ion_icon_5').setAttribute("color","light")



  if(this.BWhereOpened){
    this.BWhereOpened = false;
    this.BTimeOpened = false;
    this.BUIOpened = false;
    this.BImageOpened = false;
    document.getElementById('text_area').style.display = "block";
    document.getElementById('ion_icon_5').setAttribute("color","danger")


  }else{
    this.BWhereOpened= true;
    this.BTimeOpened = false;
    this.BUIOpened = false;
    this.BImageOpened = false;
    document.getElementById('region_select').style.display = "block";
    document.getElementById('ion_icon_1').setAttribute("color","danger")

  }
}
dateFilter(value){
  this.new_post_date = value;
  document.getElementById("ion_icon_3").setAttribute("color","danger")
 
}
timeFilter(value){
  this.new_post_time = value;
}
infoFilter(value){
  this.new_post_info = value;
  //console.log(value,value.length)
  if(value.length > 5){
    document.getElementById("check1" ).setAttribute("color","success")
    document.getElementById('check1p').style.color = "lightgreen";
  }else{
    if(this.currentImage.length > 3){
      document.getElementById("check1" ).setAttribute("color","success")
      document.getElementById('check1p').style.color = "lightgreen";
    }else{
      document.getElementById("check1" ).setAttribute("color","medium")
      if(this.user.getUI() === "1"){
        document.getElementById('check1p').style.color = "lightgray";
      }else if(this.user.getUI() === "2"){
        document.getElementById('check1p').style.color = "black";
      }
    }

  }
}
lokacijaFilter(value){
  this.new_post_lokacija = value;
}
regijaFilter(value){
  this.new_post_regija = value;
  document.getElementById("ion_icon_1").setAttribute("color","danger")
  document.getElementById("check2" ).setAttribute("color","success")
  document.getElementById('check2p').style.color = "lightgreen";

}
drzavaFilter(value){
  document.getElementById('region_filter_1').style.display = "none";
  document.getElementById('region_filter_2').style.display = "none";
  document.getElementById('region_filter_3').style.display = "none";

  if(value == "hrv"){
    document.getElementById('region_filter_1').style.display = "block";
    this.new_post_drzava = this.new_post_drzava1;
  }else if(value == "srb"){
    document.getElementById('region_filter_2').style.display = "block";
    this.new_post_drzava = this.new_post_drzava2;
  }else if(value=="bih"){
    document.getElementById('region_filter_3').style.display = "block";
    this.new_post_drzava = this.new_post_drzava3;

  }else{
  console.log(value);
  }
}



ChangeCommentButton(number){
  document.getElementById('cb1').style.backgroundImage = this.comment_image1e;
  document.getElementById('cb2').style.backgroundImage = this.comment_image2e;
  document.getElementById('cb3').style.backgroundImage = this.comment_image3e;
  document.getElementById('cb4').style.backgroundImage = this.comment_image4e;
  if(number==1){
    this.comment_image_info = 1;
    //document.getElementById('commentimage').style.backgroundImage = this.comment_image1;
    document.getElementById('cb1').style.backgroundImage = this.comment_image1;
  }else if(number==2){
    this.comment_image_info = 2;
    //document.getElementById('commentimage').style.backgroundImage = this.comment_image2;
    document.getElementById('cb2').style.backgroundImage = this.comment_image2;
  }else if(number==3){
    this.comment_image_info = 3;
    //document.getElementById('commentimage').style.backgroundImage = this.comment_image3;
    document.getElementById('cb3').style.backgroundImage = this.comment_image3;
  }else if(number==4){
    this.comment_image_info = 4;
    //document.getElementById('commentimage').style.backgroundImage = this.comment_image4;
    document.getElementById('cb4').style.backgroundImage = this.comment_image4;
    
  }
}
ChangeShareButton(number){
  document.getElementById('sb1').style.backgroundImage = this.share_image1e;
  document.getElementById('sb2').style.backgroundImage = this.share_image2e;
  document.getElementById('sb3').style.backgroundImage = this.share_image3e;
  document.getElementById('sb4').style.backgroundImage = this.share_image4e;
  if(number==1){
    this.share_image_info = 1;
    //document.getElementById('shareimage').style.backgroundImage = this.share_image1;
    document.getElementById('sb1').style.backgroundImage = this.share_image1;
  }else if(number==2){
    this.share_image_info = 2;
    //document.getElementById('shareimage').style.backgroundImage = this.share_image2;
    document.getElementById('sb2').style.backgroundImage = this.share_image2;
  }else if(number==3){
    this.share_image_info = 3;
    //document.getElementById('shareimage').style.backgroundImage = this.share_image3;
    document.getElementById('sb3').style.backgroundImage = this.share_image3;
  }else if(number==4){
    this.share_image_info = 4;
    //document.getElementById('shareimage').style.backgroundImage = this.share_image4;
    document.getElementById('sb4').style.backgroundImage = this.share_image4;
    
  }
}
ChangeLikeButton(number){
  document.getElementById('lb1').style.backgroundImage = this.like_image1e;
  document.getElementById('lb2').style.backgroundImage = this.like_image2e;
  document.getElementById('lb3').style.backgroundImage = this.like_image3e;
  document.getElementById('lb4').style.backgroundImage = this.like_image4e;
  if(number==1){
    this.like_image_info = 1;
    //document.getElementById('likeimage').style.backgroundImage = this.like_image1;
    document.getElementById('lb1').style.backgroundImage = this.like_image1;
  }else if(number==2){
    this.like_image_info = 2;
    //document.getElementById('likeimage').style.backgroundImage = this.like_image2;
    document.getElementById('lb2').style.backgroundImage = this.like_image2;

  }else if(number==3){
    this.like_image_info = 3;
    //document.getElementById('likeimage').style.backgroundImage = this.like_image3;
    document.getElementById('lb3').style.backgroundImage = this.like_image3;

  }else if(number==4){
    this.like_image_info = 4;
    //document.getElementById('likeimage').style.backgroundImage = this.like_image4;
    document.getElementById('lb4').style.backgroundImage = this.like_image4;

  }
}
/*regionChangeHrv(){
  for(let i=0;i<20;i++){
    this.regije[i] = null;
  }
  for(let i =0;i<this.regijeHrv.length;i++){
    this.regije[i] = this.regijeHrv[i];
  }
}
regionChangeSrb(){

  for(let i=0;i<this.regije.length;i++){
    this.regije[i] = null;
  }
  for(let i =0;i<this.regijeSrb.length;i++){
    this.regije[i] = this.regijeSrb[i];
  }
}
regionChangeBih(){
  for(let i=0;i<this.regije.length;i++){
    this.regije[i] = null;
  }
  for(let i =0;i<this.regijeBih.length;i++){
    this.regije[i] = this.regijeBih[i];
  }
}*/


async OpenShare(id) {
  let link = "https://www.spotted.com.hr/objava/?id=" + id;

  const alert = await this.alertController.create({
    header: 'Način djeljenja',
    cssClass : this.alertClass,
    inputs: [
      {
        name: 'wap',
        type: 'radio',
        label: 'WhatsApp',
        value: 'wap',
      },
      {
        name: 'tw',
        type: 'radio',
        label: 'Twitter',
        value: 'tw'
      },
      {
        name: 'fb',
        type: 'radio',
        label: 'Facebook',
        value: 'fb'
      },
      {
        name: 'ema',
        type: 'radio',
        label: 'Email',
        value: 'ema'
      },
      {
        name: 'cb',
        type: 'radio',
        label: 'Kopiraj poveznicu',
        value: 'cb'
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
          if(data === "wap"){
            this.socialsharing.shareViaWhatsApp(link, null,null)
          }else if(data === "tw"){
            this.socialsharing.shareViaTwitter(link)
          }else if(data === "fb"){
            this.socialsharing.shareViaFacebook(link, null /* img */, null)
          }else if(data === "cb"){
            this.clipboard.copy(link);
            this.clipboard.paste().then(
              (resolve: string) => {
                //alert(resolve);
                this.ToastErrorClipBoard()
              },
              (reject: string) => {
                //alert('Error: ' + reject);
              }
            );
          }else if(data === "ema"){
            this.socialsharing.shareViaEmail(
              link, // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
              "Spotted objava",
              null,
              null,
              null, // BCC: must be null or an array
            );
          }
        }
      }
    ]
  });

  await alert.present();
}




changeCommentIcon(){
  if(this.commentOpened){
    this.hideAllIcons();
  }else{
  this.showCommentIcons();
  this.hideLikeIcons();
  this.hideShareIcons();
  }
  
}
changeLikeIcon(){
  if(this.likeOpened){
    this.hideAllIcons();
  }else{
  this.hideCommentIcons();
  this.hideShareIcons();
  this.showLikeIcons();
  }
}
changeShareIcon(){
  if(this.shareOpened){
    this.hideAllIcons();
  }else{
  this.showShareIcons();
  this.hideLikeIcons();
  this.hideCommentIcons();
  }
}
showCommentIcons(){
  document.getElementById('commentmenu').style.display = "block";
  this.commentOpened = true;
}
showLikeIcons(){
  document.getElementById('likemenu').style.display = "block";
  this.likeOpened = true;
}
showShareIcons(){
  document.getElementById('sharemenu').style.display = "block";
  this.shareOpened = true;
}
hideCommentIcons(){
  this.commentOpened = false;
  document.getElementById('commentmenu').style.display = "none";
}
hideLikeIcons(){
  document.getElementById('likemenu').style.display = "none";
  this.likeOpened = false;
}
hideShareIcons(){
  document.getElementById('sharemenu').style.display = "none";
  this.shareOpened = false;
}
hideAllIcons(){
  this.hideShareIcons();
  this.hideLikeIcons();
  this.hideCommentIcons();
}

getPostWithId(id){
  for(let i = 0;i<this.Posts.length;i++){
    if(id == this.Posts[i].id){
      return this.Posts[i]
    }
  }
}

quickLike:boolean = false
QuickLike(id){
  
  if(this.quickLike){
    this.LikePost(id)
  }else{
    setTimeout(()=>{
      this.quickLike = false
    },500)
  }
  this.quickLike = true

}

getIsPostWithIdLiked(string:string){
  for(let i = 0;i<this.user.LikedPosts.length;i++){
    if(this.user.LikedPosts[i] === string){
      return true
    }
  }
  return false
}

canShowLikeAnimation:boolean = true;
showAnimationLike(element_id,object){
  if(!this.canShowLikeAnimation)
    return
  this.canShowLikeAnimation = false;
  let itemrr = document.getElementById(element_id + "_fastLike")
  let image = "url('" + object.like_image + "')"
  itemrr.style.backgroundImage = image
  itemrr.style.width = "110px"
  itemrr.style.height = "220px"
  itemrr.style.marginLeft = "-55px"
  itemrr.style.backgroundSize = "115px"
  setTimeout(() => {
    itemrr.style.opacity = "0"
    setTimeout(()=>{
      itemrr.style.backgroundSize = "0px"
      setTimeout(()=>{
        itemrr.style.opacity = "1"
        this.canShowLikeAnimation = true;
      },300)
    },300)
  }, 800);
}

LikePost(element_id){
  let  object = this.getPostWithId(element_id)
  this.showAnimationLike(element_id,object)

  for(let i = 0;i<this.user.LikedPosts.length;i++){
    if(this.user.LikedPosts[i] === element_id){
      return
    }
  }
  if(document.getElementById(element_id).style.color == "red"){
    object.setIsLiked(true)
    return 0
  }
  if(object.getIsLiked() == false){


    let serverURL = "https://www.spotted.com.hr/change_likes/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,key: 1, id: element_id},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
       if(answer == "Liked/Unliked"){
        object.setIsLiked(true)
        document.getElementById(element_id).style.color = "red";
        object.ChangeLikeNumbersFor(0)
        this.user.LikedPosts.push(element_id)
       }else{
        //nema interneta
      }
     },
    (error : any) =>
    {
      console.log('Something went wrong!');
      this.AlertErrorUpload()
    });
  }

}


OpenFullPost(element_id){
  if(this.getPostWithId(element_id).getComLocked()){

    // if locked do error cant load comments locked by admin
  }else{
    this.user.setfullId(element_id)
    //get object with id . isliked
    let object = this.getPostWithId(element_id)
    if(object.getIsLiked()){
      this.user.SetIsPostLiked(true)
    }else{
      this.user.SetIsPostLiked(false)

    }
  }
  this.appVariables.leaveApp = false
  this.router.navigate(['home/fullpost']);


}

}
