import { Injectable } from '@angular/core'


@Injectable()
export class Post{

    public id:string;
    public imageURL:string;
    public description:string;
    public drzava:string;
    public regija:string;
    public lokacija:string;
    public datum:string;
    public vrijeme:string;
    public likes:number;
    public comments:number;
    public layout_info:number;
    public upload_date:string;
    private isLiked:boolean = false;
    public like_image:string;
    public comment_image:string;
    public share_image:string;
    private fullID: string = "-1"
    private comments_locked:boolean
    public approved:string

    constructor(){
    }

    BonusLikeTag(){
        return this.likes + 1;
    }

    getIsLiked(){
        return this.isLiked
    }
    setIsLiked(bool:boolean){
        this.isLiked = bool
    }

    getDesc(){
        return this.description
    }
    ChangeLikeNumbersFor(add){
        this.likes = this.likes + add;
    }
    SepareLayout(){
        let number = this.layout_info%10
        this.share_image = "../../assets/images/emoji/share" + number + ".png"
        number = (Math.floor(this.layout_info/10))%10
        this.comment_image = "../../assets/images/emoji/comment" + number + ".png"
        number = (Math.floor(this.layout_info/100))%10
        this.like_image = "../../assets/images/emoji/like" + number + ".png"

    }
    getFullID(){
        return this.fullID
    }
    setFullID(string){
        this.fullID = string
    }
    setComLocked(string){
        if(string == "no"){
            this.comments_locked = false;
        }else if(string == "ye"){
            this.comments_locked = false;
        }
    }
    getComLocked(){
        return this.comments_locked;
    }
}