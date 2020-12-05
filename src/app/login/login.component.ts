import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import {Md5} from 'ts-md5/dist/md5'


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    backgroundImages = []
    numberOfBackgroundImages:number = 5
    terms = "<h2>Privacy Policy</h2> <p> NeoblastApps built the Spotted app as a Free app. This SERVICE is provided by NeoblastApps at no cost and is intended for use as is. </p> <p> This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service. </p> <p> If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy. </p> <p> The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Spotted unless otherwise defined in this Privacy Policy. </p> <p><strong>Information Collection and Use</strong></p> <p> For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to Instagram account if added. The information that I request will be retained on your device and is not collected by me in any way. </p> <p> The app does use third party services that may collect information used to identify you. </p> <div><p> Link to privacy policy of third party service providers used by the app </p> <ul><li><a>Google Play Services</a></li><li><a>AdMob</a></li><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></ul></div> <p><strong>Log Data</strong></p> <p> I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics. </p> <p><strong>Cookies</strong></p> <p> Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. </p> <p> This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service. </p> <p><strong>Service Providers</strong></p> <p> I may employ third-party companies and individuals due to the following reasons: </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p> I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose. </p> <p><strong>Prohibited Activities</strong></p> <p> If a user engages in a prohibited activity, we can suspend or even terminate their account. If we incur damages due to a user’s activity, we may consider filing a lawsuit. </p> <ul> <li>Systematically retrieving data or content from our Site to create a collection or database without written permission from us.</li> <li>Trick, defraud, or mislead us or other users, especially in any attempt to learn sensitive account information such as user passwords.</li> <li>Circumvent, disable, or otherwise interfere with security-related features of our Site. This includes features that prevent/restrict the use of any content limits site usage.</li> <li>Disparage, tarnish, or otherwise harm, in our opinion, our company and/or our Site.</li> <li>Harass, abuse, or harm another person using any information obtained from our site.</li> <li>Use the support services improperly, or submit false reports of abuse or misconduct.</li> <li>Use our site inconsistently with any applicable laws or regulations.</li> <li>Advertise or offer to sell goods and services on our Site.</li> <li>Framing or linking to our Site without authorization.</li> <li>Attempt to upload or transmit viruses, Trojan horses, or other materials (including excessive use of capital letters and spamming) that interferes with any party's uninterrupted use of our Site and its features.</li> <li>Use scripts, data-mining, robots, or similar data gathering tools to send comments or messages.</li> <li>Delete the copyright or other proprietary rights notice from any content.</li> <li>Impersonate another user or person or use the username of another user.</li> <li>Sell or otherwise transfer their profile.</li> <li>Upload any materials that actively or passively collects information or acts as a transmission mechanism (includes gifs, 1x1 pixels, web bugs, cookies, spyware, pcms, etc.)</li> <li>Interfere, disrupt, or create an undue burden on our Site, networks, or services.</li> <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of our Site to us.</li> <li>Copy/adapt our Site's software (includes Flash, PHP, HTML, JavaScript, or other code).</li> <li>Bypass measures of our Site designed to prevent/restrict access.</li> <li>Decipher, decompile, disassemble, or reverse engineer any of the software that makes up our Site.</li> <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.</li> <li>Use any automated system (spiders, robots, cheat utility, scraper, offline reader) to access the site, or launch any unauthorized script or software (Unless as a result of a standard search engine or internet browser usage).</li> <li>Use our site in an unauthorized way (collecting usernames, email addresses, of users for the purpose of sending unsolicited email, or creaitng user accounts by automated means or under false pretenses).</li> <li>Use our site in an effort to compete with us, or otherwise use our Site and/or the content Content for any revenue-generating endeavor or commercial enterprise.</li> <li>Download / screenshot any materials that actively or passively collects information.</li> <li>Strictly prohibited from posting photos or personal information about persons who have not given you permission to do so.</li><li>By creating an account, you agree to our policies and acknowledge that you are more than 13 years old</li> <li>Stricly forbidden to publish a content that is not intended for anyone under the age of 18.</li> </ul> <p> I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose. </p> <p><strong>Security</strong></p> <p> I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security. </p> <p><strong>Links to Other Sites</strong></p> <p> This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. </p> <p><strong>Children’s Privacy</strong></p> <p> These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions. </p> <p><strong>Changes to This Privacy Policy</strong></p> <p> I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page. </p> <p><strong>Contact Us</strong></p> <p> If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at spotted-admin@spotted.com.hr. </p> <p>App Privacy Policy</p> "

    constructor(
        private router: Router,
        private user: UserService,
        private alertController: AlertController,
        private loadingController: LoadingController,
        private menuCtrl:MenuController,
        private toastController:ToastController,
        private http:Http,
        private deivceID:UniqueDeviceID,
        private platform: Platform,
        private statusBar:StatusBar,
        //private sqlite: SQLite,
        private storage: Storage,
        private admobFree: AdMobFree

    ){
      this.Loader()
      this.CheckLogin()
      this.statusBar.overlaysWebView(false)
      this.user.SetEnableMenu(false)
      for(let i = 1; i <= this.numberOfBackgroundImages; i++){
        this.backgroundImages.push("url('../../assets/images/login/login_image" + i + ".png')")
      }
      this.menuCtrl.enable(false)
      this.menuCtrl.swipeGesture(false)

    }
    ngOnInit() {
        this.preloadingBackgrounds()
    }

    
    async AskForUI(id){
      const alert = await this.alertController.create({
        header: 'Dobrodošli,',
        message: "Izaberite temu aplikacije, trenutno je postavljena tamna tema. Uvjek možete temu promjenitit u postvkama.",
        buttons: [
          {
            text: 'Nastavi s svjetlom temom',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.LoaderTema()
              let serverURL = "https://www.spotted.com.hr/change_user_ui/"
              let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
                  options 	: any		= { key:"2" , id: id,pass:3},
                  url       : any      	= serverURL + "index.php";
          
              this.http.post(url, JSON.stringify(options), headers)
              .subscribe((data : any) =>{
                let answer = data.text()
                if(answer == "Changed"){
                  this.user.setUI("2")
                  setTimeout(()=>{
                    this.GoTutorialAlert()
                  },50)
                }
              })


            }
          }, {
            text: 'Nastavi s tamnom temom',
            handler: () => {
              this.LoaderTema()
              let serverURL = "https://www.spotted.com.hr/change_user_ui/"
              let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
                  options 	: any		= { key:"1" , id: id,pass:3},
                  url       : any      	= serverURL + "index.php";
          
              this.http.post(url, JSON.stringify(options), headers)
              .subscribe((data : any) =>{
                let answer = data.text()
                if(answer == "Changed"){
                  this.user.setUI("1")
                  setTimeout(()=>{
                    this.GoTutorialAlert()
                  },50)
                }
              })

            }
          }
        ]
      });
  
      await alert.present();
    }

    async GoTutorialAlert(){
      const alert = await this.alertController.create({
        header: 'Dobrodošli,',
        message: "želite li proći kroz kratki uvod kako koristiti našu aplikaciju. Nije obavezno i uvijek to možete naknadno pogledati u Menu / Profil /  Kako koristiti aplikaciju.",
        buttons: [
          {
            text: 'Nastavi koristiti aplikaciju',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              window.location.reload()
            }
          }, {
            text: 'Pogledaj vodič za korištenje',
            handler: () => {
              this.GoToTutorial()
              }
            }
          
        ]
      });
  
      await alert.present();
    }

    async GoToTutorial(){
      const loading = await this.loadingController.create({
        duration:500,
        //cssClass:'custom-loader-class'
      });
      await loading.present();

      this.router.navigate(["/home"])
      setTimeout(()=>{
        this.router.navigate(["/home/tutorial"])
        setTimeout(()=>{
          this.loadingController.dismiss()
        },100)
      },100)

    }

    async LoaderTema() {
      const loading = await this.loadingController.create({
        message: 'Pričekajte',
        duration: 600,
        //cssClass:'custom-loader-class'
      });
      await loading.present();
      const { role, data } = await loading.onDidDismiss();
    }

    async Loader() {
      const loading = await this.loadingController.create({
        message: '',
        duration: 400,
        //cssClass:'custom-loader-class'
      });
      await loading.present();
      const { role, data } = await loading.onDidDismiss();
    }

    CheckLogin(){
      try{
        this.storage.get('deviceID').then((val)=>{
          console.log(val)
          if(val != undefined){
            this.GetUserFromServer(val)
          }
        })

      }catch(e){}
    }
    
    loading = this.loadingController
    async GetUserFromServer(nadimak){
      let loader  = this.loading.create({
        message: '',
        duration: 5000,
      });
      (await loader).present
    

      let serverURL = "https://www.spotted.com.hr/get_user_with_nadimak/"
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {key : nadimak,pass:3},
          url       : any      	= serverURL + "index.php";
      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>{
        let answer = data.text()
         //console.log("User with id : " + answer)
        if(answer.includes("!#!")){
          let endPos = answer.indexOf("!#!")
          let user_id = answer.slice(0,endPos)
          let isPremium = answer.slice(endPos + 3, endPos + 4)
          let isAdmin = answer.slice(endPos + 4, endPos + 5)
          let instagram = answer.slice(endPos + 5, answer.length-2)
          let UI = answer.slice(answer.length-2,answer.length-1)
          let jezik = answer.slice(answer.length-1,answer.length)
          //console.log(jezik)
          this.user.jezik = jezik
          this.user.setInstagram(instagram)
          this.user.setUI(UI)
          this.USER_ISPREMIUM = isPremium
          this.USER_ISADMIN = isAdmin
          this.storage.clear()
          this.storage.set('deviceID', nadimak);
          this.onThisPage = false
          this.user.setNadimak(nadimak)
          this.user.setPremium(this.USER_ISPREMIUM)
          this.user.setAdmin(this.USER_ISADMIN)
          this.user.setID(user_id)
          this.SwitchTheme()
          if(this.user.getInstagram().length > 2){
            document.getElementById("user_instagram").textContent = "@" + this.user.getInstagram()
          }else{
            document.getElementById("user_instagram").textContent = " "
          }
          document.getElementById("user_name").textContent = this.user.getNadimak()
          
          document.getElementById("user_id").textContent = "ID #" + this.user.getID()


          if(jezik === "3" || jezik ==="4"){
            document.getElementById("user_id").textContent = "ИД #" + this.user.getID()
            document.getElementById("jezik_menu").textContent = "Мену"
            document.getElementById("naslovnica_jezik").textContent = "Насловница"
            document.getElementById("profil_jezik").textContent = "Профил"
            document.getElementById("pitanja_jezik").textContent = "Честа питања" 
            document.getElementById("postavke_jezik").textContent = "Поставке" 
            document.getElementById("admin_jezik").textContent = "Административни послови" 
            document.getElementById("odjavise_jezik").textContent = "Одјави се" 
          }

          if(this.user.isAdmin()){
            document.getElementById("admin_panel").style.display = "block"

          }else{
           document.getElementById("admin_panel").style.display = "none"
          }    
          this.LoadBannerAd(0)// chance for banner ad
          this.user.SetEnableMenu(true)
          this.menuCtrl.enable(true)
          this.menuCtrl.swipeEnable(true)
          this.router.navigate(['./home']);
          this.loading.dismiss()


        }
       },
      (error : any) =>
      {
        this.loading.dismiss()
        this.AlertFatalError()
      });
  
    }
    LoadBannerAd(chance){
      let ran = Math.random()*100;
      if(ran > chance){
        return
      }
      
      const bannerConfig: AdMobFreeBannerConfig = {
        id: "ca-app-pub-9933506788213398/9773003308",
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.banner.prepare()
        .then(() => {
          //console.log("banner ready")
      })
      .catch(e => console.log(e));
    }

    loginUID: string ="";
    getLoginUID(){
      return this.loginUID;
    }
  
  
    getLoginNadimak(){
      return this.LogEmail;
    }
    backgroundCount = 0;
    RegNad = "";
    RegLoz = "";
    RegLoz2 = "";
    LogNad
    LogEmail:string = "";
    LogLoz = "";
    RegEmail = "";
    nadimakTakken = false;

    RegistrirajSe(){
        this.CustomLoader(150)
        console.log("Nadimak :" + this.RegNad);
        if(this.CheckNadimak(this.RegNad)){
          this.AlertPrekratakNadimak();
        }else if(this.CheckNadimakTakken(this.RegNad)){
        } 
      }
    
    
      SpecialChars(string){
       if(string.match(/^[0-9a-zA-Z]+$/)){
         return 1
       }
       return 0
      }
      CheckNadimakTakken(string){

        if(this.SpecialChars(string)){
          
        }else{
          this.AlertNadimakSpecialChar()
          return 0
        }

        if(this.SpecialChars(this.RegLoz)){

        }else{
          this.AlertLozinkaSpecialChar()
          return 0
        }
        
        let serverURL = "https://www.spotted.com.hr/nadimak_method/"
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= {key : string,pass:3},
            url       : any      	= serverURL + "index.php";
        this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>{
          let answer = data.text()
           console.log("LoginExist http sended and: " + answer)
           if(answer == "Exist"){
             this.nadimakTakken = true;
             this.AlertNadimakZauzet();
            }else if(answer == "Not Exist"){
              this.nadimakTakken = false;
              if(this.NadimakAdminFilter(this.RegNad)){
                this.AlertNadimakSadrziAdmin();
              }else if(this.RegLoz.length < 6){
                this.AlertPrekratkaLozinka();
              }else if(this.RegLoz != this.RegLoz2){
                this.AlertLozinkeNisuIste();
              }else{
                this.AlertKreirajProfil();
              }
           }else{
            this.nadimakTakken = false;
    
          }
    
          
    
         },
        (error : any) =>
        {
          this.AlertFatalError()
        });
    
    
        return false;
      }

      SwitchTheme(){
        setTimeout(()=>{
          let theme = this.user.getUI()
          if(theme === "0" || theme === "1"){

          }else if(theme === "2"){
            let items = document.getElementsByClassName("dark_theme")
            items[0].classList.add("light_theme")
            items[0].classList.remove("dark_theme")
            items = document.getElementsByClassName("dark_theme")
            items[0].classList.add("light_theme")
            items[0].classList.remove("dark_theme")
            items = document.getElementsByClassName("dark_theme")
            items[0].classList.add("light_theme")
            items[0].classList.remove("dark_theme")
          }
        },100)

      }

      CheckNadimak(string){
        if(string.includes("Nadimak") || string.includes("nadimak") || string.includes(":")){
          return true
        }else if(string.includes("pass") || string.includes("Pass") || string.includes("Password")){
          return true
        }else if(string.includes("password") || string.includes("IsAdmin") || string.includes("IsPremium")){
          return true
        }else if(string.includes("adress") || string.includes("User") || string.includes("user")){
          return true
        }
        if(string.length<4){
          return true
        }
        
        return false
      }


      async CustomLoader(number:number) {
        const loading = await this.loadingController.create({
          message: '',
          duration: number,
          //cssClass:'custom-loader-class'
        });
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
      }

      PrijaviSe(){
        this.CustomLoader(150)
        if(this.LogLoz.length >= 6){
          this.LogIn(this.LogEmail,this.LogLoz)
        }else{
          this.AlertPrekratkaLozinka();
        }
      }
    
      USER_INFORMATION = "";
      USER_NADIMAK
      USER_PASSWORD
      USER_ISADMIN = false
      USER_ISPREMIUM = false
      SetUserInformations(string){
      
    
        var startPosition = string.indexOf("Premium:") + 8 ; //
        var endPosition = string.indexOf("Admin:"); // 3 cuz "," is end of last string
        if(string.slice(startPosition, endPosition)== "1"){
          this.USER_ISPREMIUM = true;
        }else{
          this.USER_ISPREMIUM = false;
        }
    
    
        startPosition = string.indexOf("Admin:") + 6; //
        if(string.slice(startPosition, startPosition+1) == "1"){
          this.USER_ISADMIN = true;
          }else{
          this.USER_ISADMIN = false;
        }
    
        startPosition = string.indexOf("ID:") + 3 ; //
        endPosition = string.indexOf("Premium:"); // 3 cuz "," is end of last string
        this.USER_ID = string.slice(startPosition,endPosition)
    
        startPosition = string.indexOf("Instagram:") + 10 ; //
        this.INSTAGRAM = string.slice(startPosition,string.length-2)

        this.user.setUI(string.slice(string.length-2,string.length-1))
        let jezik = string.slice(string.length-1,string.length)
        this.user.jezik = jezik
      }
      INSTAGRAM:string = ""
    
      LogIn(nadimak,lozinka){
        if(this.SpecialChars(nadimak)){

        }else{
          this.AlertNadimakSpecialChar()
          return 0; 
        }

        if(this.SpecialChars(lozinka)){

        }else{
          this.AlertNadimakSpecialChar()
          return 0; 
        }

        let serverURL = "https://www.spotted.com.hr/check_user/"
        console.log(Md5.hashStr(lozinka))
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= {key:3,nadimak : nadimak,lozinka : Md5.hashStr(lozinka)},
            url       : any      	= serverURL + "index.php";
        this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>{
          let answer = data.text()
          console.log(answer)
           if(answer.includes("ID:") && answer.includes("Premium:")){
              this.SetUserInformations(answer)
              this.storage.clear()
              this.storage.set('deviceID', nadimak);
             this.onThisPage = false
             this.user.setNadimak(nadimak)
             this.user.setPassword(lozinka)
             this.user.setPremium(this.USER_ISPREMIUM)
             this.user.setAdmin(this.USER_ISADMIN)
             this.user.setID(this.USER_ID)
             this.user.setInstagram(this.INSTAGRAM)
             this.user.SetEnableMenu(true)
             document.getElementById("user_name").textContent = this.user.getNadimak()
             document.getElementById("user_id").textContent = "ID " + "#" + this.user.getID()
             if(this.user.isAdmin()){
              document.getElementById("admin_panel").style.display = "block"

             }else{
              document.getElementById("admin_panel").style.display = "none"
             }

            if(this.user.getInstagram().length > 2){
              document.getElementById("user_instagram").textContent = "@" + this.user.getInstagram()
            }else{
              document.getElementById("user_instagram").textContent = " "
            }
  
            if(this.user.jezik === "3" || this.user.jezik ==="4"){
              document.getElementById("user_id").textContent = "ИД #" + this.user.getID()
              document.getElementById("jezik_menu").textContent = "Мену"
              document.getElementById("naslovnica_jezik").textContent = "Насловница"
              document.getElementById("profil_jezik").textContent = "Профил"
              document.getElementById("pitanja_jezik").textContent = "Честа питања" 
              document.getElementById("postavke_jezik").textContent = "Поставке" 
              document.getElementById("admin_jezik").textContent = "Административни послови" 
              document.getElementById("odjavise_jezik").textContent = "Одјави се" 
            }
             this.SwitchTheme()
             this.menuCtrl.enable(true)
             this.menuCtrl.swipeEnable(true)
             this.LoadBannerAd(0)
             this.router.navigate(['./home']);
            }else if(answer == "Not Exist!"){
              this.AlertUneseniKriviPodatci()
           }else{
            this.AlertFatalError()
          }
         
         },
        (error : any) =>
        {
           this.AlertFatalError()
    
        });
      }

    
      async AlertUneseniKriviPodatci() {
        const alert = await this.alertController.create({
          header: 'Greška',
          message: "Nažalost unesen je krivi nadimak ili lozinka.",
          buttons: [
            {
              text: 'Prekid',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Probaj ponovo',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });
    
        await alert.present();
      }
    
    
      async AlertFatalError() {
        const alert = await this.alertController.create({
          header: 'Greška',
          message: "Nažalost nastala je pogreška zbog koje nije moguće nastavljanje s korištenjem aplikacije. Provjerite Vašu vezu s internetom ili pokušajte kasnije.",
          buttons: [
            {
              text: 'Prekid',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: 'Probaj ponovo',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });
    
        await alert.present();
      }

      async AlertNadimakSpecialChar() {
        const alert = await this.alertController.create({
          header: 'Greška',
          message: "Nadimak sadrži zabranjena slova. Molimo koristite velika,mala slova ili brojeve. Znakove nije dopušteno koristiti.",
          buttons: [
            {
              text: 'Prekid',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: 'Probaj ponovo',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });
    
        await alert.present();
      }

      async AlertLozinkaSpecialChar() {
        const alert = await this.alertController.create({
          header: 'Greška',
          message: "Lozinka sadrži zabranjena slova. Molimo koristite velika, mala slova ili brojeve. Znakove nije dopušteno koristiti.",
          buttons: [
            {
              text: 'Prekid',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: 'Probaj Ponovo',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });
    
        await alert.present();
      }
    
      async AlertNoInternet() {
        const alert = await this.alertController.create({
          header: 'Greška',
          message: "Nažalost nismo se uspjeli spojiti s internetom, provjerite internet vezu ili pokušajte kasnije.",
          buttons: [
            {
              text: 'Prekid',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: 'Ponovo probaj',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]
        });
    
        await alert.present();
      }
    
    
    
      async AlertKreirajProfil() {
        const alert = await this.alertController.create({
          header: 'Kreiraj profil?',
          message: "Pritiskom tipke 'Kreiraj profil' potvrđujete da ste pročitali, razumjeli i da se slažete s našim pravilima korištenja.",
          buttons: [
            {
              text: 'Prekid',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: 'Kreiraj profil',
              handler: () => {
                console.log('Confirm Okay');
                this.GetUserID()
              }
            }
          ]
        });
    
        await alert.present();
      }
    
      KreirajProfil(number){
        //Md5.hashStr("sdf")
        let serverURL = "https://www.spotted.com.hr/create_user/"
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= {pass:3,nadimak : this.RegNad,lozinka : Md5.hashStr(this.RegLoz), key:number},
            url       : any      	= serverURL + "index.php";
        this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>{
          let answer = data.text()
           console.log("CreateProfile http sended and: " + answer)
           if(answer == "Inserted"){
              this.storage.clear()
              this.storage.set('deviceID', this.RegNad);
              this.onThisPage = false
             this.user.setNadimak(this.RegNad)
             this.user.setPassword(this.RegLoz)
             this.user.setPremium(false)
             this.user.setAdmin(false)
             this.user.setID(this.USER_ID)
             this.user.setIP(this.USER_IP)
             this.user.SetEnableMenu(true)
             this.menuCtrl.enable(true)
             this.menuCtrl.swipeEnable(true)
             this.user.setUI("1")
             this.AskForUI(number)
    
            }else if(answer == "Error"){
              this.AlertNoInternet()
    
           }else{
            this.AlertNoInternet()
    
          }
         
         },
        (error : any) =>
        {
           this.AlertFatalError()
    
        });
    
    
      }
    
      USER_IP
      USER_ID

    
      GetUserID(){
    
        var random_id = Math.floor(Math.random() * 999999999) + 1
        var number = random_id.toString()
        let serverURL = "https://www.spotted.com.hr/get_available_user_id/"
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options 	: any		= {key: number,pass:3},
            url       : any      	= serverURL + "index.php";
    
        this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data : any) =>{
            let answer = data.text()
           console.log("Server http sended.")
           console.log("Response for get_available_id is " + data.text())
           if(answer == "Exist!"){
            this.GetUserID()
            }else if(answer == "Not Exist!"){
              this.KreirajProfil(number)
           }else{
              this.AlertNoInternet()
           }
         },
        (error : any) =>
        {
           console.log('Something went wrong!');
           this.AlertFatalError()
    
        });
    
      }

    
    
      LogNadChange(string){
        this.LogEmail = string;
      }
      LogLozChange(string){
        this.LogLoz = string;
      }
      async AlertLogin() {
        const alert = await this.alertController.create({
          header: 'Nije moguće ulogirati se',
          subHeader: 'Razlog: ',
          message: '- Uneseno krivi nadimak ili lozinka.',
    
          buttons: ['OK']
        });
    
        await alert.present();
      }
      async AlertFailRegistracija() {
        const alert = await this.alertController.create({
          header: 'Nije moguće kreirati profil',
          subHeader: 'Razlog: ',
          message: '- Profil s tim nadimkom već postoji.',
    
          buttons: ['OK']
        });
    
        await alert.present();
      }
      async AlertPrekratkaLozinka() {
        const alert = await this.alertController.create({
          header: 'Nije moguće kreirati profil',
          subHeader: 'Razlog: ',
          message: '- Lozinka mora sadžavati barem 6 znakova.',
    
          buttons: ['OK']
        });
    
        await alert.present();
      }
      async AlertLozinkeNisuIste() {
        const alert = await this.alertController.create({
          header: 'Nije moguće kreirati profil',
          subHeader: 'Razlog: ',
          message: '- Lozinke se ne poklapaju.',
    
          buttons: ['OK']
        });
    
        await alert.present();
      }
      async AlertPrekratakNadimak() {
        const alert = await this.alertController.create({
          header: 'Nije moguće kreirati profil',
          subHeader: 'Razlog: ',
          message: '- Nadimak mora sadržavati barem 4 slova ili broja<br/>- Nadimak nesmije sadržavati neke znakove ili riječ "admin" ',
          buttons: ['OK']
        });
    
        await alert.present();
      }
      async AlertNadimakZauzet() {
        const alert = await this.alertController.create({
          header: 'Nije moguće kreirati profil',
          subHeader: 'Razlog: ',
          message: '- Nadimak je već zauzet',
    
          buttons: ['OK']
        });
    
        await alert.present();
      }
      async AlertNadimakSadrziAdmin() {
        const alert = await this.alertController.create({
          header: 'Nije moguće kreirati profil',
          subHeader: 'Razlog: ',
          message: '- Nadimak sadrzi riječ admin',
    
          buttons: ['OK']
        });
    
        await alert.present();
      }
      openRegistraciju(){
        document.getElementById('login_div').style.display = "none";
        document.getElementById('registracija_div').style.display = "block";
      }
      openPrijavu(){
        document.getElementById('login_div').style.display = "block";
        document.getElementById('registracija_div').style.display = "none";
      }
      RegNadChange(string){
        this.RegNad = string;
      }
      RegEmailChange(string){
        this.RegEmail = string;
      }
      RegLozChange(string){
        this.RegLoz = string;
      }
      RegLoz2Change(string){
        this.RegLoz2 = string;
      }
      NadimakAdminFilter(string){
        let x = 0;
        for(let i = 0;i<string.length;i++){
          if(string.charAt(i)=="a" || string.charAt(i)=="A"){
            if(string.charAt(i+1)=="d" || string.charAt(i+1)=="D"){
              if(string.charAt(i+2)=="m" || string.charAt(i+2)=="M"){
                if(string.charAt(i+3)=="i" || string.charAt(i+3)=="I"){
                  if(string.charAt(i+4)=="n" || string.charAt(i+4)=="N"){
                    return true;
                  }
                }
              }
            }
          }
        }
        return false;
      }
      preloading_time = true;
      changing_time = 10
      preloading_count=0;

    
      preloadingBackgrounds(){
        this.preloading_count++;
        //console.log("preloading")
        setTimeout(() => {
          this.backgroundCount++;
          let index = this.backgroundCount % 5;
          document.getElementById('background_id').style.backgroundImage = this.backgroundImages[index];
          if(this.preloading_count < 5){
          this.preloadingBackgrounds();
          }else{
            this.changing_time = 2500
            this.loadingBackgrounds();
          }
      }, this.changing_time);
      }
      onThisPage = true
    
      loadingBackgrounds(){
        setInterval(() => {
          if(this.onThisPage){
            this.backgroundCount++;
            let index = this.backgroundCount % this.numberOfBackgroundImages;
            document.getElementById('background_id').style.backgroundImage = this.backgroundImages[index];
        }
      }, this.changing_time);
      }
    
      openTerms(){
        this.alertPravila()
      }
      recovery(){
        this.alertRecovery()
      }
    
      async alertPravila() {
        const alert = await this.alertController.create({
          header: 'Pravila korištenja',
          message: this.terms,
          buttons: ['Zatvori']
        });
    
        await alert.present();
      }
    
      async alertRecovery() {
        const alert = await this.alertController.create({
          header: 'Zaboravili ste lozinku?',
          message: "Pošaljite mail na spotted-admin@spotted.com.hr i naši admini će Vam pomoći vratiti profil.",
          buttons: ['Zatvori']
        });
    
        await alert.present();
      }

}