import { Injectable } from '@angular/core'

interface user {
    LogEmail: string,
    uid: string
    num: Number

}


@Injectable()
export class UserService{
    private user: user


    private USER_NADIMAK: string;
    private USER_PASSWORD:string;
    private USER_ADMIN: boolean;
    private USER_PREMIUM: boolean;
    private USER_ID:string;
    private USER_IP:string;
    private postID:string;
    private INSTAGRAM:string;
    // main variables static
    private enableMenu:boolean = true;
    private isPostLiked:boolean = false;
    private USER_INTERFACE:string;
    public jezik:string = "1"// 1-hrv,bihL,bihC,srb
    private Notification:number = 0;
    public LikedComments = []
    public LikedPosts = []
    public messageUser:string = ""
    constructor(){
    }


    SetNotif(state:number){
        this.Notification = state
    }
    HasNotif(){
        return this.Notification
    }
    setUI(string){
        this.USER_INTERFACE = string
    }
    getUI(){
        return this.USER_INTERFACE
    }
    setInstagram(string){
        this.INSTAGRAM = string;
    }
    getInstagram(){
        return this.INSTAGRAM
    }
    SetIsPostLiked(bool:boolean){
        this.isPostLiked = bool;
    }
    getIsPostLiked(){
        return this.isPostLiked
    }

    GetEnableMenu(){
        return this.enableMenu;
    }
    SetEnableMenu(is:boolean){
        this.enableMenu = is;
    }

    getNadimak(){
        return this.USER_NADIMAK
    }
    getPassword(){
        return this.USER_PASSWORD
    }
    isAdmin(){
        return this.USER_ADMIN
    }
    isPremium(){
        return this.USER_PREMIUM
    }
    getID(){
        return this.USER_ID
    }
    getIP(){
        return this.USER_IP
    }

    setNadimak(string){
        this.USER_NADIMAK = string;
    }
    setPassword(string){
        this.USER_PASSWORD = string;
    }
    setPremium(string){
        this.USER_PREMIUM = string;
    }
    setAdmin(string){
        if(string === "1" || string == true)
            this.USER_ADMIN = true;
        else
            this.USER_ADMIN = false;
    }
    setID(string){
        this.USER_ID = string;
    }
    setIP(string){
        this.USER_IP = string;
    }

    setUser(user: user){
        this.user = user
    }
    getUID(){

        return this.user.uid
    }

    getfullId(){
        return this.postID
    }
    setfullId(string){
        this.postID = string
    }


}