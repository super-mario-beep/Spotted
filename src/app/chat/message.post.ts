import { Injectable } from '@angular/core'

@Injectable()
export class Message{
    private sender:string;
    private Time:string = ""
    private Message:string = ""

    constructor(){
    }

    GetMessage(){
        return this.Message
    }
    SetMessage(string){
        this.Message = string
    }
    SetTime(string){
        this.Time = string
    }
    GetTime(){
        return this.Time
    }
    SetSender(string){
        this.sender = string;
    }
    GetSender(){
        return this.sender
    }


}