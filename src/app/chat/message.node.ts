import { Injectable } from '@angular/core'
import { Message } from './message.post';

@Injectable()
export class Node{
    public ID:string;
    public type:string;
    public user1:string;
    public user2:string;
    public date:string;
    public poruke:Message[] = []
    public seen_user:boolean// dali user treba pogledat
    public short_code:string
    public node_img:string = "../../assets/images/chat/svrlja2.png"


    constructor(){
    }
    AddMessage(mess:Message){
        this.poruke.push(mess)
    }
    MakeShortCode(){ 
        let len = this.poruke.length
        let item = this.poruke[len -1]
        if(item.GetMessage().length > 20){
            this.short_code = item.GetMessage().slice(0,20) + "..."
        }else{
            this.short_code = item.GetMessage()
        }
        this.SetRandomImg()
    }
    SetRandomImg(){
        let random = Math.floor((Math.random()*6)) // 0-5
        if(random < 2){
            this.node_img = "../../assets/images/chat/svrlja" + 1 +".png"
        }else if(random > 4){
            this.node_img = "../../assets/images/chat/svrlja" + 5 +".png"
        }else{
            this.node_img = "../../assets/images/chat/svrlja" + random +".png"
        }

        
    }

   

}