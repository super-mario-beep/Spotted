import { Injectable } from '@angular/core'
import { Subcomment } from './subcomment.class';

@Injectable()
export class Comment{

    public post_id:string;
    public id:string;
    public user_name:string;
    public komentar:string;
    public likes:number;
    public liked:boolean = false;
    private subcomment = []



    constructor(){
    }

    getId(){
        return this.id;
    }
    AddLike(){
        let plus = +this.likes + 1
        this.likes = plus;
    }
    SliceTags(){
        let string = this.komentar
        let length = string.length
        let cursor = 0
        for(let i = 0;i < length; i++){
            if(string[i] == "@"){
                //console.log(i)
                let object = new Subcomment
                let tmp_text = string.slice(cursor,i)
                object.textCom = tmp_text

                for(let j = i+1;j<=length;j++){
                    if(j==length || (string[j].includes(" ")) || !string[j].match(/^[0-9a-zA-Z!._]+$/)){
                        let tmp_tag = string.slice(i,j)
                        //console.log(i,j)
                        object.tagCom = tmp_tag
                        this.subcomment.push(object)
                        cursor = j
                        break;
                    }

                }   
            }
        }
        let object = new Subcomment
        let tmp_text = string.slice(cursor,length)
        object.textCom = tmp_text
        object.tagCom = ""
        this.subcomment.push(object)
        //console.log(this.subcomment)
    }


}