import { Injectable } from '@angular/core'
import { NgModule } from '@angular/core';

interface Vari {
    LogEmail: string,
    uid: string
}

@NgModule()
@Injectable()
export class MainVariables{
    private user: Vari
    private drzava: string;
    public filterHrv:boolean = true;
    public filterSrb:boolean = true;
    public filterBih:boolean = true;
    public selectedHrvRegije = ["1" , "2" , "3", "4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"]
    public selectedSrbRegije = ["1"]
    public selectedBihRegije = ["1"]
    private username:string;
    private reloadPage:Boolean = false;
    public loadedPosts:string[] = []
    public leaveApp:boolean = true;

    constructor(){
    }
    getRegionHrv(){
        return this.selectedHrvRegije
    }
    getRegionSrb(){
        return this.selectedSrbRegije
    }
    getRegionBih(){
        return this.selectedBihRegije
    }

    getMarkedRegions(){
        let tmp_array = []
        if(this.selectedHrvRegije.length > 0){
            for(let i = 0;i<this.selectedHrvRegije.length;i++)
                tmp_array.push(this.selectedHrvRegije[i])
        }
        if(this.selectedBihRegije.length > 0){
            for(let i = 0;i<this.selectedBihRegije.length;i++)
                tmp_array.push(this.selectedBihRegije[i])
        }
        if(this.selectedSrbRegije.length > 0){
            for(let i = 0;i<this.selectedSrbRegije.length;i++)
                tmp_array.push(this.selectedSrbRegije[i])
        }
        return tmp_array
    }

    clearRegion(string:string){
        if(string == "hrv"){
            this.selectedHrvRegije = []
        }else if(string == "srb"){
            this.selectedSrbRegije = []
        }else if(string == "bih"){
            this.selectedBihRegije = []
        }
    }
    setReloadPage(bool:boolean){
        this.reloadPage = bool
    }
    getReloadPage(){
        return this.reloadPage
    }

    getRegions(){
        return this.selectedHrvRegije,this.selectedSrbRegije,this.selectedBihRegije
    }

    copyHrvRegije(regije:string[]){
        for(var i =0;i<regije.length;i++){
            this.selectedHrvRegije[i] = regije[i]
        }
    }
    copyBihRegije(regije:string[]){
        for(var i =0;i<regije.length;i++){
            this.selectedBihRegije[i] = regije[i]
        }
    }
    copySrbRegije(regije:string[]){
        for(var i =0;i<regije.length;i++){
            this.selectedSrbRegije[i] = regije[i]
        }
    }
    setUser(user: Vari){
        this.user = user
    } 
    getUID(){

        return this.user.uid
    }
    IsFilterHrv(){
        return this.filterHrv
    }
    IsFilterSrb(){
        return this.filterSrb
    }
    IsFilterBih(){
        return this.filterBih
    }
    setIsFilterHrv(){
        if(this.filterHrv){
            this.filterHrv = false;
        }else{
        this.filterHrv = true;
        }
    }
    setIsFilterSrb(){
        if(this.filterSrb){
            this.filterSrb = false;
        }else{
        this.filterSrb = true;
        }
    }
    setIsFilterBih(){
        if(this.filterBih){
            this.filterBih = false;
        }else{
        this.filterBih = true;
        }
    }
    setUsername(usern:string){
        this.username = usern.toLowerCase();
    }
    getUsername(){
        return this.username
    }

}