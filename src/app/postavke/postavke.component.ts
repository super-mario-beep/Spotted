import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router"

import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { MainVariables } from '../app.variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'app-postavke',
  templateUrl: './postavke.component.html',
  styleUrls: ['./postavke.component.scss'],
})
export class PostavkeComponent implements OnInit {
  jezik:any;

  constructor(    
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public user: UserService,
    public navCtrl: NavController,
    public toastController: ToastController,
    private platform:Platform,
    public mainVar: MainVariables,
    private http: Http,
    private emailComposer: EmailComposer,


    ) {
      let theme = this.user.getUI().toString()
      if(theme === "1"){
        this.toastClass = "custom-toast"
      }else if(theme === "2"){
        this.toastClass = "custom-toast-light"
      }
      this.checkUI()
      this.getUSERui()
      if(this.user.jezik === "3" || this.user.jezik === "4" ){
        let json = JSON.stringify(this.srb)
        this.jezik = JSON.parse(json)
      }else{
        let json = JSON.stringify(this.hrv)
        this.jezik = JSON.parse(json)
      }

    }

  ngOnInit() {}
    terms = "<h2>Privacy Policy</h2> <p> NeoblastApps built the Spotted app as a Free app. This SERVICE is provided by NeoblastApps at no cost and is intended for use as is. </p> <p> This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service. </p> <p> If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy. </p> <p> The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Spotted unless otherwise defined in this Privacy Policy. </p> <p><strong>Information Collection and Use</strong></p> <p> For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to Instagram account if added. The information that I request will be retained on your device and is not collected by me in any way. </p> <p> The app does use third party services that may collect information used to identify you. </p> <div><p> Link to privacy policy of third party service providers used by the app </p> <ul><li><a>Google Play Services</a></li><li><a>AdMob</a></li><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></ul></div> <p><strong>Log Data</strong></p> <p> I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics. </p> <p><strong>Cookies</strong></p> <p> Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. </p> <p> This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service. </p> <p><strong>Service Providers</strong></p> <p> I may employ third-party companies and individuals due to the following reasons: </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p> I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose. </p> <p><strong>Prohibited Activities</strong></p> <p> If a user engages in a prohibited activity, we can suspend or even terminate their account. If we incur damages due to a user’s activity, we may consider filing a lawsuit. </p> <ul> <li>Systematically retrieving data or content from our Site to create a collection or database without written permission from us.</li> <li>Trick, defraud, or mislead us or other users, especially in any attempt to learn sensitive account information such as user passwords.</li> <li>Circumvent, disable, or otherwise interfere with security-related features of our Site. This includes features that prevent/restrict the use of any content limits site usage.</li> <li>Disparage, tarnish, or otherwise harm, in our opinion, our company and/or our Site.</li> <li>Harass, abuse, or harm another person using any information obtained from our site.</li> <li>Use the support services improperly, or submit false reports of abuse or misconduct.</li> <li>Use our site inconsistently with any applicable laws or regulations.</li> <li>Advertise or offer to sell goods and services on our Site.</li> <li>Framing or linking to our Site without authorization.</li> <li>Attempt to upload or transmit viruses, Trojan horses, or other materials (including excessive use of capital letters and spamming) that interferes with any party's uninterrupted use of our Site and its features.</li> <li>Use scripts, data-mining, robots, or similar data gathering tools to send comments or messages.</li> <li>Delete the copyright or other proprietary rights notice from any content.</li> <li>Impersonate another user or person or use the username of another user.</li> <li>Sell or otherwise transfer their profile.</li> <li>Upload any materials that actively or passively collects information or acts as a transmission mechanism (includes gifs, 1x1 pixels, web bugs, cookies, spyware, pcms, etc.)</li> <li>Interfere, disrupt, or create an undue burden on our Site, networks, or services.</li> <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of our Site to us.</li> <li>Copy/adapt our Site's software (includes Flash, PHP, HTML, JavaScript, or other code).</li> <li>Bypass measures of our Site designed to prevent/restrict access.</li> <li>Decipher, decompile, disassemble, or reverse engineer any of the software that makes up our Site.</li> <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.</li> <li>Use any automated system (spiders, robots, cheat utility, scraper, offline reader) to access the site, or launch any unauthorized script or software (Unless as a result of a standard search engine or internet browser usage).</li> <li>Use our site in an unauthorized way (collecting usernames, email addresses, of users for the purpose of sending unsolicited email, or creaitng user accounts by automated means or under false pretenses).</li> <li>Use our site in an effort to compete with us, or otherwise use our Site and/or the content Content for any revenue-generating endeavor or commercial enterprise.</li> <li>Download / screenshot any materials that actively or passively collects information.</li> <li>Strictly prohibited from posting photos or personal information about persons who have not given you permission to do so.</li><li>By creating an account, you agree to our policies and acknowledge that you are more than 13 years old</li> <li>Stricly forbidden to publish a content that is not intended for anyone under the age of 18.</li> </ul> <p> I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose. </p> <p><strong>Security</strong></p> <p> I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security. </p> <p><strong>Links to Other Sites</strong></p> <p> This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. </p> <p><strong>Children’s Privacy</strong></p> <p> These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions. </p> <p><strong>Changes to This Privacy Policy</strong></p> <p> I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page. </p> <p><strong>Contact Us</strong></p> <p> If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at spotted-admin@spotted.com.hr. </p> <p>App Privacy Policy</p> "
    hrv = {
      Postavke:"Postavke",
      Promjenite_temu_aplikacije:"Promjenite temu aplikacije",
      Tamna_tema:"Tamna tema",
      Svijetla_tema:"Svijetla tema",
      Zlatna_s_bijelim_kontrastom:"Zlatna s bijelim kontrastom",
      Promjenite_jezik_aplikacije:"Promjenite jezik aplikacije",
      Hrv_latinica:"Hrv ( latinica )",
      Srb_cirilica:"Srb ( ćirilica )",
      BiH_latinica:"BiH ( latinica )",
      BiH_cirilica:"BiH ( ćirilica )",
      postjetite_web:"Posjetite našu web stranicu",
      na_nasoj_web:"Na našoj web stranici možete pronaći više o aplikaciji. Pronašli ste grešku ili imate prijedlog? Obratite nam se preko naše web stranice.",
      Posjeti_stranicu:"Posjeti stranicu",
      Doprinos:"Doprinos",
      nasa_apk:"Naša aplikacija je besplatna, ali zbog održavanja koristimo reklame. Doniraj našoj web stranici bilo koji iznos i postani premium član.",
      Doniraj:"Doniraj",
      Posalji_nam_email:"Pošalji nam mail",
      slobodno_nam_posalji:"Slobodno nam pošalji mail na spotted-admin@spotted.com.hr. Odgovaramo u vrlo kratkom roku.",
      Posalji_mail:"Pošalji mail",
      Pravila_koristenja:"Pravila korištenja",
      procitaj_pravila:"Pročitaj ponovo pravila korištenja naše aplikacije. Možete ih pročitati ovdje, ali i na našoj web stranici.",
      Procitaj:"Pročitaj",
      Verzija_aplikacije:"Verzija aplikacije",
      trenutna_apk : "Trenutna instalriana verzija je 2.0.6. Provjerite da li postoji ažuriranje",
      Provjeri:"Provjeri",

    }
    srb = {
      Postavke:"Поставке",
      Promjenite_temu_aplikacije:"Промјените тему апликације",
      Tamna_tema:"Тамна тема",
      Svijetla_tema:"Светла тема",
      Zlatna_s_bijelim_kontrastom:"Златна с белим контрастом",
      Promjenite_jezik_aplikacije:"Промјените језик апликације",
      Hrv_latinica:"Хрв ( латиница )",
      Srb_cirilica:"Срб ( ћирилица )",
      BiH_latinica:"БиХ ( латиница )",
      BiH_cirilica:"БиХ ( ћирилица )",
      postjetite_web:"Посјетите нашу њеб страницу",
      na_nasoj_web:"На нашој њеб страници можете пронаћи више о апликацији. Пронашли сте грешку или имате предлог? Обратите нам се преко наше њеб странице.",
      Posjeti_stranicu:"Посјети страницу",
      Doprinos:"Допринос",
      nasa_apk:"Наша апликација је бесплатна, али због одржавања користимо рекламе. Донирај нашој њеб страници било који износ и постани премиум члан.",
      Doniraj:"Донирај",
      Posalji_nam_email:"Пошаљи нам маил",
      slobodno_nam_posalji:"Слободно нам пошаљи маил на споттед-админ@споттед.цом.хр. Одговарамо у врло кратком року.",
      Posalji_mail:"Пошаљи маил",
      Pravila_koristenja:"Правила кориштења",
      procitaj_pravila:"Прочитај поново правила кориштења наше апликације. Можете их прочитати овђе, али и на нашој њеб страници.",
      Procitaj:"Прочитај",
      Verzija_aplikacije:"Верзија апликације",
      trenutna_apk: "Тренутна инсталриана верзија је 2.0.6. Провјерите да ли постоји ажурирање",
      Provjeri:"Провери",
    }


  changeUserLanguage(value){
    value = value.toString()
    let serverURL = "https://www.spotted.com.hr/change_jezik/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { key:value , id: this.user.getID(),pass:3},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
      console.log(answer)
      if(answer === "Changed"){
        console.log("dfdfd")
        this.router.navigate(['./home/login'])
        setTimeout(()=>{
          window.location.reload();
        },150)
      }
    })
  }

  toastClass = ""
  async CantUse() {
    var welcome = "Nažalost, ovu temu mogu koristiti samo premium članovi."
    if(this.user.jezik === "3" || this.user.jezik === "4" ){
      welcome = "Нажалост, ову тему могу користити само премиум чланови."
    }
    const toast = await this.toastController.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 2500,
      position: "bottom",
    });
    toast.present();
  }
  
  sendEmail(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        let email = {
          to: 'spotted-admin@spotted.com.hr',
          attachments: [
          ],
          subject: 'Upit preko aplikacije',
          body: '',
          isHtml: true
        }
        
        // Send a text message using default options
        this.emailComposer.open(email)
      }
     });
  }
    
  checkUI(){
    setTimeout(()=>{
      let theme = this.user.getUI().toString()
      if(theme === "1"){
      }else if(theme === "2"){
        let items = document.getElementsByClassName("dark_theme")
        items[0].classList.add("light_theme")
        items[0].classList.remove("dark_theme")
        let item = document.getElementById("content_id")
        item.classList.add("light_theme")
        item.classList.remove("dark_theme")

      }
    },50)

  }


  getUSERui(){
    setTimeout(()=>{
      if(this.user.getUI() == "1"){
        document.getElementById("dark_theme_id").setAttribute("checked","true")
      }else if(this.user.getUI() == "2"){
        document.getElementById("light_theme_id").setAttribute("checked","true")
      }

      if(this.user.jezik === "2"){
        document.getElementById("l2").setAttribute("checked","true")
      }else if(this.user.jezik === "3"){
        document.getElementById("l3").setAttribute("checked","true")
      }else if(this.user.jezik === "4"){
        document.getElementById("l4").setAttribute("checked","true")
      }else{
        document.getElementById("l1").setAttribute("checked","true")
      }

    },150)

  }



  changeUserUI(value){
    if(value === 1){
      if(this.user.getUI() == value){
      }else{ 
        this.changeOnServerUI(value)
      }
    }else if(value === 2){
      if(this.user.getUI() == value){
      }else{
        this.changeOnServerUI(value)
      }
    }
  }

  changeOnServerUI(value){
    let serverURL = "https://www.spotted.com.hr/change_user_ui/"
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { key:value , id: this.user.getID(),pass:3},
        url       : any      	= serverURL + "index.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data : any) =>{
      let answer = data.text()
      console.log(answer)
      if(answer == "Changed"){
        this.user.setUI(value.toString())
        this.router.navigate(['./home/login'])
        setTimeout(()=>{
          window.location.reload();
        },150)
      }
    })
  }


  openWeb(){
    window.open("https://www.spotted.com.hr/o_aplikaciji")
  }
  OpenDonate(){
    window.open("https://www.spotted.com.hr/donate")
  }

  openVersion(){
    this.CorrentVersion()
  }

  async CorrentVersion() {
    var welcome = "Imate najnoviju verziju aplikacije"
    if(this.user.jezik === "3" || this.user.jezik === "4" ){
      welcome = "Имате најновију верзију апликације"
    }
    const toast = await this.toastController.create({
      cssClass: this.toastClass,
      message: welcome,
      duration: 2500,
      position: "bottom",
    });
    toast.present();
  }


  async alertPravila() {
    let theme =""
    if(this.user.getUI() == "1"){
      theme = "alert-class"
    }else if(this.user.getUI() == "2"){
      theme = "alert-class-light"
    }

    const alert = await this.alertController.create({
      //header: 'Pravila korištenja',
      message: this.terms,
      cssClass : theme,
      buttons: ['Zatvori']
    });

    await alert.present();
  }

  openTerms(){
    this.alertPravila()
  }
  checkVer(){
    //goto trg play
  }
}
