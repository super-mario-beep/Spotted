import { Component, OnInit,Renderer } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router"
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Message } from './message.post';
import { Node } from './message.node';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


//import { PopoverComponent } from '../../component/popover/popover.component';
@Component({
  selector: 'app-search',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  Poruke = []
  Obavjesti = []
  mess = []
  messID:string
  Reciver:string;
  KeyboardHeight:number = 0
  ShowInput:boolean = false;
  toastClass:string = "custom-toast"
  constructor(public menu:MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public user: UserService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public popoverController:PopoverController,
    private http: Http,
    private platform: Platform,
    private keyboard: Keyboard,
    private renderer:Renderer,
    private toast:ToastController,
    private localNotifications: LocalNotifications
    ) {

      if(this.user.messageUser.length > 0){
        this.user_id = this.user.messageUser
        setTimeout(()=>{
          this.OpenNewMessage()
          this.user.messageUser = ""
        },100)
      }

      if(this.user.getUI()==="2"){
        setTimeout(() => {
          let items = document.getElementById("header_chat_ion")
          items.classList.add("light_theme")
          items.classList.remove("dark_theme")
          let itema = document.getElementById("new_message_div")
          itema.classList.add("light_theme")
          itema.classList.remove("dark_theme")
          let itemb = document.getElementById("filter_content_id")
          itemb.classList.add("light_theme")
          itemb.classList.remove("dark_theme") 
          this.toastClass = "custom-toast-light"
        });
      }
      this.GetNotif("no")
      this.Url = 0;
      if(this.user.HasNotif()===2){
        setTimeout(()=>{
          this.ChangeSegment(2)
          document.getElementById("seg1").setAttribute("checked","false")
          document.getElementById("seg2").setAttribute("checked","true")
        },100)
      }

      window.addEventListener("keyboardWillShow",(e) => {
        let json = JSON.stringify(e);
        let a = JSON.parse(json)
        this.KeyboardHeight = a.keyboardHeight
        this.showKeyboardWithInput(this.Url)
      })
      window.addEventListener("keyboardWillHide",(e)=>{
        this.hideKeyboardWithInput(this.Url)
      })

  }


  ChangeSegment(number){

    if(number === 1){
      document.getElementById("poruke_div_id").style.display = "block"
      document.getElementById("obavjesti_div_id").style.display = "none"

    }else if(number === 2){
      document.getElementById("poruke_div_id").style.display = "none"
      document.getElementById("obavjesti_div_id").style.display = "block"

    }
  }


  doRefresh(event){
    document.getElementById("spinnder_infL").style.display = "block"
    document.getElementById("refresher_id").style.display = "none"
    event.target.complete();
    setTimeout(() => {
      this.GetNotif("yes")
    }, 650);
  }

  AddMessageInJson(){
    if(this.MessNew.length < 1)
      return

    //let json = JSON.stringify(this.mess)
    let a = new Message
    a.SetMessage(this.MessNew)
    a.SetTime(this.GetCurrentHours());
    a.SetSender(this.user.getID())
    this.mess.push(a)
    if(this.mess.length > 25){
      console.log(this.mess.length - 25)
      let len = this.mess.length - 25;
      for(let i = 0 ; i < len;i++){
        this.mess.splice(0, 1);

      }
    }
    console.log(this.mess)

    let text = JSON.stringify(this.mess)
    this.MessNew = ""

    let serverURL = "https://www.spotted.com.hr/chat/add_message/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,text:text,id:this.messID,seen:this.Reciver},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let ans:string = data.text()
      console.log(ans)
      setTimeout(()=>{
        let id = "mess" + this.user.getID()
        let items =  document.querySelectorAll(".message_box")
        let len = items.length
        for(let i = 0;i<len;i++){
          if(items[i].id === id){
            items[i].classList.add("message_box_r")
            items[i].classList.remove("message_box")
          }
        }
        let itemsa = document.querySelectorAll('ion-content')
        for(let i =0;i < itemsa.length;i++){
          if(itemsa[i].id === "content_div_messages"){
            itemsa[i].scrollToBottom(100)
            break;
          }
        }
      },10)
    })
  }

  MessNew = ""
  ChangeMessNew(string){
    this.MessNew = string;
  }

  goback(){
    if(this.Url === 0){// 0-chat menu, 1 message or notif, 2- new mess
      this.router.navigate(['/home'])
    }else if(this.Url === 1){
      this.Url = 0;
      document.getElementById("chat_menu").style.display = "none"
      document.getElementById("poruke_div_id").style.display = "block"
      document.getElementById("obavjesti_div_id").style.display = "none"
      document.getElementById("new_message_div").style.display = "none"
      document.getElementById("segment_id_mess").style.display = "flex"
      document.getElementById("seg1").setAttribute("checked","true")
      document.getElementById("seg2").setAttribute("checked","false")
      document.getElementById("create_new_mess_tl").style.display = "block"
      let toolbar = document.getElementById("head_line_chat")
      toolbar.textContent = "Chat"
      this.GetNotif("yes")


    }else if(this.Url === 2){
      this.Url = 0;
      this.GetNotif("yes")
      document.getElementById("segment_id_mess").style.display = "flex"
      document.getElementById("poruke_div_id").style.display = "block"
      document.getElementById("new_message_div").style.display = "none"
      document.getElementById("obavjesti_div_id").style.display = "none"
      document.getElementById("create_new_mess_tl").style.display = "block"
      document.getElementById("seg1").setAttribute("checked","true")
      document.getElementById("seg2").setAttribute("checked","false")
      let toolbar = document.getElementById("head_line_chat")
      toolbar.textContent = "Chat"
    }
  }
  
  Url:number = 0

  showKeyboardWithInput(number:number){
    if(number === 2){
      if(this.CustomMode){return}
      let itema = document.querySelectorAll("ion-toolbar")
      let minus = 44;
      for(let i = 0;i < itema.length;i++){
        if(itema[i].id === "header_messages_ion"){
          minus = itema[i].clientHeight
        }
      }
      let height = (this.KeyboardHeight + 50 - minus).toString() + "px"
      document.getElementById("backgound_keyboard_hidden").style.height = this.KeyboardHeight.toString() + "px" 
      document.getElementById("new_mess_div_id").style.height =  height
    }else if(number === 1){
      this.ShowInput
      let itema = document.querySelectorAll("ion-toolbar")
      let minus = 44;
      for(let i = 0;i < itema.length;i++){
        if(itema[i].id === "header_messages_ion"){
          minus = itema[i].clientHeight
        }
      }
      let height = (this.KeyboardHeight + 50 - minus).toString() + "px"
      document.getElementById("add_new_ess_background").style.height = this.KeyboardHeight.toString() + "px" 
      document.getElementById("content_div_messages").style.height =  height
    }
  }

  CustomMode:boolean = false;
  onFocus(){
    this.CustomMode = true;
  }

  onFocusOut(){
    this.CustomMode = false
  }

  hideKeyboardWithInput(number:number){
    if(number === 1){
      let minus = 44;
      let itema = document.querySelectorAll("ion-toolbar")
      for(let i = 0;i < itema.length;i++){
        if(itema[i].id === "header_messages_ion"){
          minus = itema[i].clientHeight
        }
      }
      let height = (this.platform.height() - minus - 50).toString() + "px"
      document.getElementById("content_div_messages").style.height =  height
      document.getElementById("add_new_ess_background").style.height = "1px" 
    }else if(number === 2){
      if(this.CustomMode){return}
      let minus = 44;
      let itema = document.querySelectorAll("ion-toolbar")
      for(let i = 0;i < itema.length;i++){
        if(itema[i].id === "header_messages_ion"){
          minus = itema[i].clientHeight
        }
      }
      let height = (this.platform.height() - minus - 50).toString() + "px"
      document.getElementById("new_mess_div_id").style.height =  height
      document.getElementById("backgound_keyboard_hidden").style.height = "1px" 
    }
  }

  OpenNewMessage(){


    this.Url = 2;
    document.getElementById("new_message_div").style.display = "block"
    let itema = document.querySelectorAll("ion-toolbar")
    let minus = 44;
    for(let i = 0;i < itema.length;i++){
      if(itema[i].id === "header_messages_ion"){
        minus = itema[i].clientHeight
      }
    }
    let height = (this.platform.height() - minus - 52).toString() + "px"
    //let height = (this.platform.height() - 52).toString() + "px"
    document.getElementById("new_mess_div_id").style.height = height
    
    let toolbar = document.getElementById("head_line_chat")
    toolbar.textContent = "Nova poruka"

    document.getElementById("segment_id_mess").style.display = "none"
    document.getElementById("poruke_div_id").style.display = "none"
    document.getElementById("new_mess_div_id").style.display = "block"
    document.getElementById("create_new_mess_tl").style.display = "none"
  }

  CreateMessages(json){
    this.Url = 1
    console.log(json)
    if(json.user1 === this.user.getID()){
      this.Reciver = json.user2;
    }else{this.Reciver = json.user1}
    document.getElementById("chat_menu").style.display = "block"
    this.mess = []
    for(let i = 0; i <json.poruke.length;i++){
      let a = new Message
      a.SetMessage(json.poruke[i].Message)
      a.SetTime(json.poruke[i].Time);
      a.SetSender(json.poruke[i].sender)
      this.mess.push(a)
      this.messID = json.ID
    }

    setTimeout(()=>{
      let id = "mess" + this.user.getID()
      let items =  document.querySelectorAll(".message_box")
      let len = items.length
      for(let i = 0;i<len;i++){
        if(items[i].id === id){
          items[i].classList.add("message_box_r")
          items[i].classList.remove("message_box")
        }
      }
    },10)

    let item = this.GetNodeWithId(this.messID,json.user2)
    console.log(item.seen_user)
    if(item.seen_user){
      item.seen_user = false;
      item.MakeShortCode()
      let serverURL = "https://www.spotted.com.hr/chat/change_seen/"
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {pass:3,id:this.messID,user:this.user.getID()},
          url       : any      	= serverURL + "index.php";
  
      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>{
        console.log(data.text())
  
      })
    }



    document.getElementById("poruke_div_id").style.display = "none"
    document.getElementById("obavjesti_div_id").style.display = "none"

    document.getElementById("segment_id_mess").style.display = "none"

    if(json.user2 === "0"){
      document.getElementById("enter_mess").style.display = "none"
    }else{
      document.getElementById("enter_mess").style.display = "block"
    }
    
    let itema = document.querySelectorAll("ion-toolbar")
    let minus = 44;
    for(let i = 0;i < itema.length;i++){
      if(itema[i].id === "header_messages_ion"){
        minus = itema[i].clientHeight
      }
    }
    let height = (this.platform.height() - minus - 52).toString() + "px"
    document.getElementById("content_div_messages").style.height = height

    let toolbar = document.getElementById("head_line_chat")
    toolbar.textContent = "#" + item.user2
    document.getElementById("create_new_mess_tl").style.display = "none"

    setTimeout(() => {
      let items = document.querySelectorAll('ion-content')
      for(let i =0;i < items.length;i++){
        if(items[i].id === "content_div_messages"){
          items[i].scrollToBottom(100)
          break;
        }
      }
    }, 100);
  }

  GetNodeWithId(string,param){// type - 1/any - poruke niz , 0-obavijest niz
    if(param === "0"){
      for(let i = 0;i < this.Obavjesti.length;i++){
        if(this.Obavjesti[i].ID === string){
          return this.Obavjesti[i]
        }
      }
    }else{
      for(let i = 0;i < this.Poruke.length;i++){
        if(this.Poruke[i].ID === string){
          return this.Poruke[i]
        }
      }
    }
  }

  GetNotif(string){
    let serverURL = "https://www.spotted.com.hr/chat/get_node/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {pass:3,id:this.user.getID()},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let ans = data.text()
      
      if(ans.length < 4){
        if(string === "yes"){
          document.getElementById("refresher_id").style.display = "block"
          document.getElementById("spinnder_infL").style.display = "none"
        }
        return 0
      }

      for(let i = 0;i < ans.length;i++){
        if(ans[i] === "\n")
          ans = ans.replace("\n", " ");
        else if(ans[i] === "\r")
          ans = ans.replace("\r", " ");   
        else if(ans[i] === "\t")
          ans = ans.replace("\t", " ");
        
      }
      //console.log(ans)

      this.Poruke = []
      this.Obavjesti = []
      let json = JSON.parse(ans)
      console.log(json)
      for(let i = 0;i<json.length;i++){
        if(json[i].type === "1"){
          let chat = new Node
          chat.user1 = this.user.getID()
          if(json[i].first === this.user.getID()){
            chat.user2 = json[i].second
          }else{
            chat.user2 = json[i].first
          }
          if(json[i].seen_user === this.user.getID()){
            chat.seen_user = true;
          }else if(json[i].seen_user === "all"){
            chat.seen_user = false
          }else{chat.seen_user = false}

          chat.date = json[i].date
          chat.ID = json[i].id
          if(Array.isArray(json[i].node)){
            for(let j = 0;j<json[i].node.length;j++){
              let mess = new Message;
              mess.SetMessage(json[i].node[j].Message)
              mess.SetTime(json[i].node[j].Time)
              mess.SetSender(json[i].node[j].sender)
              chat.AddMessage(mess)
  
            }
            chat.MakeShortCode()
            this.Poruke.push(chat)
          }else{
            for(let j = 0;j<1;j++){
              let mess = new Message;
              mess.SetMessage(json[i].node.Message)
              mess.SetTime(json[i].node.Time)
              mess.SetSender(json[i].node.sender)
              chat.AddMessage(mess)
            }
            chat.MakeShortCode()
            this.Poruke.push(chat)
          }

          this.Poruke.sort((x, y) =>{
            if(y.seen_user != x.seen_user){
              return y.seen_user - x.seen_user;
            }else{
              return y.date > x.date ? 1 : -1;
            }
          })

        }else{


          let chat = new Node
          chat.user1 = this.user.getID()
          if(json[i].first === this.user.getID()){
            chat.user2 = json[i].second
          }else{
            chat.user2 = json[i].first
          }
          if(json[i].seen_user === this.user.getID()){
            chat.seen_user = true;
          }else if(json[i].seen_user === "all"){
            chat.seen_user = false
          }else{chat.seen_user = false}

          chat.date = json[i].date
          chat.ID = json[i].id
          if(Array.isArray(json[i].node)){
            for(let j = 0;j<json[i].node.length;j++){
              let mess = new Message;
              mess.SetMessage(json[i].node[j].Message)
              mess.SetTime(json[i].node[j].Time)
              mess.SetSender(json[i].node[j].sender)
              chat.AddMessage(mess)
  
            }
            chat.MakeShortCode()
            this.Obavjesti.push(chat)
          }else{
            for(let j = 0;j<1;j++){
              let mess = new Message;
              mess.SetMessage(json[i].node.Message)
              mess.SetTime(json[i].node.Time)
              mess.SetSender(json[i].node.sender)
              chat.AddMessage(mess)
            }
            chat.MakeShortCode()
            this.Obavjesti.push(chat)
          }






        }
      }
      if(string === "yes"){
        document.getElementById("refresher_id").style.display = "block"
        document.getElementById("spinnder_infL").style.display = "none"
      }
    })
  }


  GetCurrentHours(){
    let date = (new Date())
    let minutes = date.getMinutes().toString()
    if(+minutes < 10){
      minutes =  "0" + minutes
    }
    let hours =  date.getHours().toString()
    if(+hours < 10){
      hours =  "0" + hours
    }
    return (hours + ":" + minutes)
  }
  
  message:string = ""
  user_id:string = ""
  user_nadimak:string = ""
  ChangeMessage(string){
    this.message = string
  }
  ChangeId(string){
    this.user_id = string
  }
  ChangeNadimak(string){
    this.user_nadimak = string
  }

  CreateNode(){

    let chat_id = this.user.getID() + "-" + this.user_id
    let type = "1"
      let date = (new Date())
      let datum = date.getDate().toString()
      let month = date.getMonth().toString()
      if(+datum < 10){
        datum =  "0" + datum
      }
      if(+month+1 < 10){
        month =  (month+1).toString()
      }else{month = (+month+1).toString()}
    let create_date = datum+"."+month+"."+date.getFullYear()

    let mess = new Message;
    mess.SetMessage(this.message)
    mess.SetSender(this.user.getID())
      let minutes = date.getMinutes().toString()
      if(+minutes < 10){
        minutes =  "0" + minutes
      }
      let hours =  date.getHours().toString()
      if(+hours < 10){
        hours =  "0" + hours
      }
    mess.SetTime(hours + ":" + minutes)
    let poruka = JSON.stringify(mess)

    let serverURL = "https://www.spotted.com.hr/chat/create_node/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {poruka,seen_user:this.user_id,id:chat_id,type:"1",pass:3,fir:this.user.getID(),sec:this.user_id,date:create_date},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let ans:string = data.text()
      console.log(ans)
      if(ans === "Node_added"){
        this.goback()
        this.CustomToast("Poruka uspješna poslana")
        //toast poruka poslana
      }else if(ans === "Error"){
        //neki error se desia
      }else{
        //error
      }
    })
  }

  CheckNode(){
    if(this.user_id.length < 1 || !this.user_id.match(/^[0-9]+$/)){
      this.CustomToast("Molimo unesite id korisnika odnosno njegov broj")
      return 
    }
    if(this.message.length <1){
      return
    }

    let chat_id = this.user.getID() + "-" + this.user_id
    let chat_id2 = + this.user_id + "-" +this.user.getID() 
    let serverURL = "https://www.spotted.com.hr/chat/node_exist/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {id:chat_id,id2:chat_id2,pass:3},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let ans:string = data.text()
      console.log(ans)
      if(ans === "NOT_EXIST_NODE"){
        this.CreateNode()
        this.user_id = ""
        this.message = ""
      }else if(ans.includes("EXIST_NODE")){
        console.log(ans)
        for(let i =0;i<this.Poruke.length;i++){
          if(this.Poruke[i].ID === (this.user.getID() + "-" + this.user_id)){
            document.getElementById("new_message_div").style.display = "none"
            this.CreateMessages(this.Poruke[i])
          }else if(this.Poruke[i].ID === (this.user_id  + "-" + this.user.getID())){
            document.getElementById("new_message_div").style.display = "none"
            this.CreateMessages(this.Poruke[i])
          }
        }
        this.user_id = ""
        this.message = ""
        //console.log(item)
        //this.CreateNode()
        // prvo otkrij koji je node
        //odvedi u chat
      }else{
        //error
      }
    })
  }

  async CustomToast(string){
    var welcome = string;
    const toast = await this.toastController.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 2200,
      position: "bottom",
    });
    toast.present();
  }

  ngOnInit() {

  }

}
