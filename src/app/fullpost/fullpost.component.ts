import { Component, OnInit } from '@angular/core';
import { Post } from '../post.class'
import { UserService } from '../user.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { userInfo } from 'os';
import { Comment } from './comment.class'
import { Router } from '@angular/router';
import { LoadingController, ToastController, Platform, AlertController } from '@ionic/angular';
import { InstagramUser } from './instagram.user';
import { MainVariables } from '../app.variables';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';


@Component({
  selector: 'app-fullpost',
  templateUrl: './fullpost.component.html',
  styleUrls: ['./fullpost.component.scss'],
})
export class FullpostComponent implements OnInit {

  InstagramUsers = []
  jezik:any;

  constructor(
    public http:Http,
    public user:UserService,
    public router: Router,
    private post:Post,
    private loadingController: LoadingController,
    public toast: ToastController,
    public platform:Platform,
    public alertController: AlertController,
    public appVariables:MainVariables,
    private socialsharing:SocialSharing,
    private clipboard:Clipboard

  ) {
    //this.user.setfullId("63828233")
    //this.user.setNadimak("tulipan")//

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

    this.checkUI()
    this.LoadPostWithId(user.getfullId())
    this.LoadAllComments()
    this.onThisPage = true;
    this.ColorLikeCounter()
   }
   alertClass =""
   alertMessageH5=""
   alertMessageP=""
   loaderCustomClassCss=""
   toastClass=""

   PrijaviKomentar(id){
    let serverURL = "https://www.spotted.com.hr/prijavi_komentar/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {key:0},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
      if(answer === "Reported"){
        this.ReportedToast()
        for(let i = 0; i < this.Comment_array.length;i++){
          if(this.Comment_array[i].id === id){
            console.log(id,this.Comment_array[i].id)
            document.getElementById(id).style.display = "none"
            break;
          }
        }
      }else{
        //toast ucinjeno
      }
    })

   }

   checkUI(){
    setTimeout(()=>{
      let theme = this.user.getUI()
      if(theme === "1"){
        document.getElementById("comment_banner").style.backgroundColor = "black"
      }else if(theme === "2"){
        let items = document.getElementsByClassName("dark_theme")
        items[0].classList.add("light_theme")
        items[0].classList.remove("dark_theme")
        //items = document.getElementsByClassName("dark_theme")
        items[1].classList.add("light_theme")
        items[1].classList.remove("dark_theme")
        let item = document.getElementById("fullcontent_id")
        item.classList.add("light_theme")
        item.classList.remove("dark_theme")
        document.getElementById("comment_banner").style.backgroundColor = "white"

      }
    },100)

    if(this.user.jezik === "3" || this.user.jezik === "4" ){
      let json = JSON.stringify(this.srb)
      this.jezik = JSON.parse(json)
    }else{
      let json = JSON.stringify(this.hrv)
      this.jezik = JSON.parse(json)
    }
  }

  hrv = {
    Opis:"Opis",
    Fotografija:"Slika",
    Komentiraj:"Komentiraj",
    Napisi_komentar:"Dodaj komentar",
    Podijeli:"Podijeli",
    Prekini:"Prekini",
    Prijavi_komentar:"Prijavi komentar",
    Unesi_komentar:"Unesite svoj komentar ovdje..."

  }

  srb = {
    Opis:"Опис",
    Fotografija:"Слика",
    Komentiraj:"Коментирај",
    Napisi_komentar:"Додај коментар",
    Podijeli:"Подели",
    Prekini:"Прекини",
    Prijavi_komentar:"Пријави коментар",
    Unesi_komentar:"Унесите свој коментар овђе..."

  }
  
  selectKomentar
  openSuggestions:boolean = false;
  userLenTry = 0

   suggestInstagramUsers(string){
    if(string.length < 3){
      this.InstagramUsers = []
      return 
    }
    if(this.tagTime === false){
      return 
    }
    this.userLenTry = string.length
    let tmpLenTry = string.length
    let serverURL = "https://www.spotted.com.hr/instagram_search/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,key: string},
        url       : any      	= serverURL + "index.php";
  
    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      if(this.userLenTry != tmpLenTry){
        return
      }
      let answer = data.text()
      if(answer != "NoUsers"){
        this.InstagramUsers = []
        let json = JSON.parse(answer)
        for(let i = 0;i < json.users.length;i++){
          let tmp = new InstagramUser
          tmp.TagName = json.users[i].tag_name
          tmp.FullName = json.users[i].name
          tmp.ImageUrl = json.users[i].img
          //console.log(tmp.ImageUrl)
          if(tmp.ImageUrl[tmp.ImageUrl.length-1] === '"'){
            tmp.ImageUrl = tmp.ImageUrl.slice(0,tmp.ImageUrl.length-1)
          }

          if(tmp.FullName.length > 26){//max size 26
            tmp.FullName = tmp.TagName.slice(0,26)
          }
          if(tmp.ImageUrl.includes("text") || tmp.ImageUrl.includes("width")){
            tmp.ImageUrl = "../../assets/images/no_image_error/no-image.jpg"
          }
          this.InstagramUsers.push(tmp);
          document.getElementById("content_id").style.height = "164px"
        }
      }
    })
  }
  tagUser(string){
    document.getElementById(string).style.opacity = "0.01"
    setTimeout(()=>{
      document.getElementById(string).setAttribute("src","../../assets/images/no_image_error/check.png")
    },250)
    setTimeout(()=>{
      document.getElementById(string).style.opacity = "1"
    },500)

    setTimeout(()=>{
      for(let i = this.selectKomentar.length-1 ;i >= 0 ; i--){
        if(this.selectKomentar[i] === "@"){
          this.selectKomentar = this.selectKomentar.slice(0,i) + "@" + string + " "
          this.InstagramUsers = []
          this.tagTime = false;
          setTimeout(()=>{
            this.global_username = ""
            this.tagTime = true;
          },200)
          break;
        }
      }
    },1100)
    this.selectKomentar = this.selectKomentar
  }

  

  ngOnInit() {}
  async AlertLeaveApk() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Napusti aplikaciju?',
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
          }
        }
      ]
    });
  }

   posts = []
   post_id
   post_image
   post_description
   post_drzava
   post_regija
   post_lokacija
   post_datum
   post_vrijeme
   post_likes
   post_comments
   post_layout_info
   post_upload_time
   UNESENI_KOMENTAR
   post_likes_image


   openInstagramProfile(profile_tag){
     let tag = profile_tag.slice(1,profile_tag.length)
     let link = "https://www.instagram.com/" + tag + "/"
     window.open(link)
   }

  LoadPostWithId(id){
    let serverURL = "https://www.spotted.com.hr/get_post_with_id/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,key:id},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      //console.log(data)
      let answer = data.text()
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
        for(let i = 0;i<this.user.LikedPosts.length;i++){
          if(this.user.LikedPosts[i] === tmp_post.id){
            tmp_post.setIsLiked(true)
          }
        }
        if(tmp_post.lokacija === "none"){tmp_post.lokacija = ""}

        
        let image_link
        //console.log(json.imgURL)
        if(json.imgURL == "ye"){
          image_link = "https://www.spotted.com.hr/image_uploader/images/" + tmp_post.id +".png"
        }else if(json.imgURL == "no"){
          image_link = "https://www.spotted.com.hr/image_uploader/images/no_image.png"
        }else{
          image_link = json.imgURL
        }

        tmp_post.imageURL = image_link
        tmp_post.SepareLayout()

        this.posts.push(tmp_post)
        this.post_likes_image = tmp_post.like_image

        }else if(answer == "No Ip Adress!"){
          //this.router.navigate(['home/register']);
       }else{
        //this.router.navigate(['home/register']);
      }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       this.ToastNoInternet()

    });
  }

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
  async ToastErrorClipBoard() {
    var welcome = "Kopirano u međuspremnik";
    const toast = await this.toast.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }
  

  PrekiniKomentar(){
    document.getElementById("comment_box").style.display = "none"
    document.getElementById("comment_banner").style.display = "none"

  }

  openPostMenu(){
    if(document.getElementById("comment_box").style.display == "block"){
      document.getElementById("comment_box").style.display = "none"
      document.getElementById("comment_banner").style.display = "none"
    }else{
      this.getContent().scrollToTop(500)
      setTimeout(()=>{
        document.getElementById("comment_banner").style.display = "none"
        document.getElementById("comment_box").style.display = "block"
      },10)

    }

  }

  getContent() {
    return document.querySelectorAll('ion-content')[1];
  }
  

  goBack(){
    this.onThisPage = false;
    document.getElementById("comment_box").style.display = "none"
    this.router.navigate(['/home'])
  }

  tagTime = false
  tagPos = 0;
  infoFilter(string){
    //console.log(this.tagTime)
    this.UNESENI_KOMENTAR = string
    /*if(string.length < 3){
      this.InstagramUsers = []
      return 
    }*/
    if(string[string.length-1] == "@"){
      this.tagTime = true;
      //console.log("true")
      return
    }

    if(string[string.length-1] == " "){
      this.global_username = ""
      this.InstagramUsers = []
      this.tagTime = false
      return
    }
    if(string.includes("@")){
      if(this.tagTime === false){
        return
      }
      let startTag = 0;
      for(let i = string.length-1;i>=0;i--){
        if(string[i] === "@"){
          startTag = i;
          break;
        }
      }
      let endTag = 0;
      for(let i = startTag+1;i<string.length;i++){
        if(string[i].match(/[a-zA-Z0-9._]/i)){
          endTag++;
          if(i == string.length-1){
            this.tagTime = true
            let username = string.slice(startTag+1,endTag+startTag+1)
            console.log(username)
            this.global_username = username
            this.suggestInstagramUsers(username)
          }
        }else{
          break;
        }
      }
    }
  }
  global_username = " "


  PostKomentar(){
    if(this.UNESENI_KOMENTAR.length < 5 || this.UNESENI_KOMENTAR.length > 500 || this.UNESENI_KOMENTAR.includes(":end:'")){
      //komentar sadrzi kljucne rijece ili znakove {end start} // do 2500 znakova
      //alert prekratko da bi se poslalo
    }else{

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
        this.PostKomentar()
        }else if(answer == "Not Exist!"){
          this.UploadPost(number)
       }else{
          //this.AlertErrorUpload()
       }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       //this.AlertErrorUpload()

    });
  }}

  UploadPost(number){
    //console.log(this.user.getID())
    let serverURL = "https://www.spotted.com.hr/set_comment/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {key:3,id:this.user.getfullId(),comment_id: number,user_id: this.user.getNadimak(),comment:this.UNESENI_KOMENTAR},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
        let answer = data.text()
       console.log("Server http sended.")
       console.log("Response for get_available_comment_id is " + data.text())
       if(answer == "Inserted"){
          this.openPostMenu()
          this.IncreaseCommentNumber()
          this.RefreshPage()
          document.getElementById("comment_banner").style.display = "none"
        }else if(answer == "Error"){
          this.ToastNoInternet()
       }else{
          this.ToastNoInternet()
       }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       this.ToastNoInternet()

    });
  }

  RefreshPage(){

    this.Loader(500)
    this.LoadAllComments()
    
  }

  async ReportedToast() {
    var welcome = "Komentar će ubrzo biti uklonjen"
    if(this.user.jezik === "3" || this.user.jezik === "4" ){
      welcome = "Коментар ће убрзо бити уклоњен"
    }
    const toast = await this.toast.create({
      cssClass:this.toastClass,
      message: welcome,
      duration: 2000,
    });
    toast.present();
  }


  async presentToast() {
    var welcome = 'Vaš komentar dodan je uspješno'
    if(this.user.jezik === "3" || this.user.jezik === "4" ){
      welcome = "Ваш коментар додан је успешно"
    }
    const toast = await this.toast.create({
      cssClass:this.toastClass,
      message: welcome,
      duration: 2000,
    });
    toast.present();
  }

  async ToastNoInternet() {
    var welcome = 'Molimo provjerite Vašu internet vezu'
    if(this.user.jezik === "3" || this.user.jezik === "4" ){
      welcome = "Молимо провјерите Вашу интернет конекцију"
    }
    const toast = await this.toast.create({
      cssClass:this.toastClass,
      message: welcome,
      duration: 2000,
    });
    toast.present();
  }

  async Loader(duration) {
    const loading = await this.loadingController.create({
      message: '',
      duration: duration,
      cssClass:'custom-loader-class'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    this.presentToast()
  
  }

  IncreaseCommentNumber(){
    let serverURL = "https://www.spotted.com.hr/change_comment/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,id:this.user.getfullId()},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
        let answer = data.text()

       if(answer == "Liked/Unliked"){
        //vas komentar ce ubrzo biti objavljen

        }else if(answer == "Error"){
          this.ToastNoInternet()
       }else{
          this.ToastNoInternet()
       }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       this.ToastNoInternet()

    });
  }


  



  LoadAllComments(){
    this.Comment_array = []
    let number = this.user.getfullId()
    let serverURL = "https://www.spotted.com.hr/get_comments/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,key: number},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
        let answer = data.text()
       //console.log("Response for get_available_comment_id is " + data.text())
       if(answer.includes('{"post_id":"')){
         this.CreateComments(answer)
       }else if(answer.includes("'EOF:!!")){
         
       }else{
          //this.ToastNoInternet()

       }
     },
    (error : any) =>
    {
       console.log('Something went wrong!');
       this.ToastNoInternet()

    });

  }

  brojac = 2
  Comment_array = []
  CreateComments(string){
    //console.log(string)
    if(string.includes(`:end:'"}`)){

      let endPos = string.indexOf("':end:'")
      let json = string.slice(0,endPos)
      json = json + '"}'
      //console.log(json)
      json = JSON.parse(json)
      let tmp_post_id = json.post_id
      let tmp_id  = json.id
      let tmp_user_id = json.user_id
      let tmp_comment = json.comment
      let tmp_num_likes = json.num_likes


      let tmp_comm = new Comment()
      tmp_comm.post_id = tmp_post_id
      tmp_comm.id = tmp_id
      tmp_comm.user_name = tmp_user_id
      tmp_comm.komentar = tmp_comment
      tmp_comm.likes = tmp_num_likes
      for(let i = 0;i<this.user.LikedComments.length;i++){
        if(this.user.LikedComments[i] === tmp_comm.id){
          tmp_comm.liked = true;
        }
      }
      this.Comment_array.push(tmp_comm)
      tmp_comm.SliceTags()

      let startPosition = string.indexOf(`end:'"}`) + 7; 
      string = string.slice(startPosition,string.length)
      this.CreateComments(string)
    }else{

      this.Comment_array.sort((a,b) => (+a.likes > +b.likes) ? -1 : 1)
    }
  }

  LikePost(element_id){
    if(this.user.getIsPostLiked() == false){
      for(let i = 0;i < this.user.LikedPosts.length;i++){
        if(this.user.LikedPosts[i] === element_id){
          return
        }
      }

      this.user.SetIsPostLiked(true)

      let serverURL = "https://www.spotted.com.hr/change_likes/"
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {pass:3,key: 1, id:element_id},
          url       : any      	= serverURL + "index.php";
  
      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>{
        let answer = data.text()
         if(answer == "Liked/Unliked"){
          this.user.LikedPosts.push(element_id)
          document.getElementById("like_color").style.color = "red";
          document.getElementById(element_id).style.color = "red";
          //let value = document.getElementById(element_id ).textContent
          //let numbe:number = +value;
          //numbe +=1;
          //document.getElementById(element_id).textContent = numbe.toString()
          console.log(document.getElementById(element_id))
          this.posts[0].likes +=1;
         }else{
          this.ToastNoInternet()
        }
       },
      (error : any) =>
      {
        console.log('Something went wrong!');
        this.ToastNoInternet()
      });
  }
}

  onThisPage:boolean = false;
  ColorLikeCounter(){
    setInterval(() => {
      try{
          if(this.onThisPage){
            if(this.user.getIsPostLiked()){
              document.getElementById("like_color").style.color = "red";
            }
          }
        }
        catch(e){}
  }, 300);
  }


  
  FindIdFromString(string){
    var startPosition = 7; // 7-- starting map ID
    var endPosition = string.indexOf('"imgURL"') - 2; // 3 cuz "," is end of last string
    var result = string.slice(startPosition, endPosition);
    return result
  }

  FindImageURLFromString(string){
    var startPosition = string.indexOf('"imgURL"') + 10; // 7 cuz image has 7 chars
    var endPosition = string.indexOf('"description"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    if(final == "invalidURL"){
      return "319bd745-30b6-464c-8320-3267131b819a" // no image link
    }
    return final
    }

  FindDescriptionFromString(string){
    var startPosition = string.indexOf('"description"') + 15; // 14 cuz desc has 14 chars
    var endPosition = string.indexOf('"drzava"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    return final
    }

  FindLayoutInfoFromString(string){
    var startPosition = string.indexOf('"layout_info"') + 15; // 14 cuz desc has 14 chars
    var endPosition = string.indexOf('"time_uploaded"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    return final
    }
  FindTimeUploadedFromString(string){
    var startPosition = string.indexOf('"time_uploaded"') + 17; // 14 cuz desc has 14 chars
    var endPosition = string.indexOf("':end:'"); // 3 cuz "," is end of last string  
    var final = string.slice(startPosition, endPosition);
    return final
    }

  FindDrzavaFromString(string){
    var startPosition = string.indexOf('"drzava"') + 11; // 14 cuz desc has 14 chars
    var endPosition = string.indexOf('"regija"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    console.log(final)
    if(final == "hrv"){
      return "Hrvatska"
    }else if(final == "bih"){
      return "Bosna i Hercegovina"
    }else{
      return "Srbija"
    }
    }

  FindRegijaFromString(string){
    var startPosition = string.indexOf('"regija"') + 10; // +4
    var endPosition = string.indexOf('"lokacija"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    return final//add sve filtere
    }

  FindLokacijaFromString(string){
    var startPosition = string.indexOf('"lokacija"') + 12; // +4
    var endPosition = string.indexOf('"datum"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    return final//add sve filtere
    }

  FindDatumFromString(string){
    var startPosition = string.indexOf('"datum"') + 9; // +4
    var endPosition = string.indexOf('"vrijeme"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    return final//add sve filtere
    }

  FindVrijemeFromString(string){
    var startPosition = string.indexOf('"vrijeme"') + 11; // +4
    var endPosition = string.indexOf('"likes"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    return final//add sve filtere
    }

  FindLikesFromString(string){
    var startPosition = string.indexOf('"likes"') + 9; // +4
    var endPosition = string.indexOf('"komentari"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    return final//add sve filtere
    }

  FindCommentsFromString(string){
    var startPosition = string.indexOf('"komentari"') + 13; // +4
    var endPosition = string.indexOf('"layout_info"') - 2; // 3 cuz "," is end of last string
    var final = string.slice(startPosition, endPosition);
    return final//add sve filtere
    }

    LikeComment(comment_id){
      for(let i = 0;i < this.user.LikedComments.length;i++){
        if(this.user.LikedComments[i] === comment_id){
          return
        }
      }
      let serverURL = "https://www.spotted.com.hr/like_comment_with_id/"
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {pass:3,id:comment_id},
          url       : any      	= serverURL + "index.php";
  
      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>{
        let answer = data.text()
         if(answer == "Liked/Unliked"){
          document.getElementById("like_num" + comment_id).style.color = "red"
          let object = this.GetCommentWithId(comment_id)
          object.AddLike()
          this.user.LikedComments.push(comment_id)
         }else{
           this.ToastNoInternet()
          //nema interneta
          ///ZAVRSITI OVU MOTODU KOJA Lajka komentar.
        }
       },
      (error : any) =>
      {
        console.log('Something went wrong!');
        this.ToastNoInternet()
      });
    }

    GetCommentWithId(id){
      for(let i = 0;i < this.Comment_array.length; i++){
        if(this.Comment_array[i].getId() == id){
          return this.Comment_array[i]
        }
      }
    }
  
}
