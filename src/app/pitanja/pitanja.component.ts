import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MainVariables } from '../app.variables';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pitanja',
  templateUrl: './pitanja.component.html',
  styleUrls: ['./pitanja.component.scss'],
})
export class PitanjaComponent implements OnInit {
  jezik:any;

  constructor(
    private platform:Platform,
    private router:Router,
    public mainVar:MainVariables,
    public alertController:AlertController,
    private user:UserService
  ) {
    this.checkUI()
    if(this.user.jezik === "3" || this.user.jezik === "4" ){
      let json = JSON.stringify(this.srb)
      this.jezik = JSON.parse(json)
    }else{
      let json = JSON.stringify(this.hrv)
      this.jezik = JSON.parse(json)
    }
  }



  hrv = {
    Pitanja:"Pitanja",
    U_kojem:"U kojom gradu se ja nalazim?",
    Nasa_aplikacija:"Naša aplikacija za sad pokriva Hrvatsku, Srbiju i Bosnu i Hercegovinu. Države su podjeljene na područja (neka područja sadrže više gradova). Ako se nalazite imeđu dva područja dozvoljeno je postaviti istu objavu na više područja. Kartu koji grad se nalazi u kojem području možete pronaći na našoj web stranici. :)",
    Koji_grad:"Koji grad da izaberim ako želim da svi iz te države vide?",
    Cesto_ljudi:"Često ljudi žele objaviti za sva područja, nažalost to nije moguće jer se jedno područje može odabrati. Naš savjet je da postavite na glavni grada (Beograd, Zagreb ili Sarajevo) jer prilikom pokretanja aplikacije filter je postavljen na glavne gradove zbog največeg broja objava. Također moguće je staviti da objava svima bude na vrhu, bezobzira na kojoj je regiji filter. Tu mogućnost potrebno je zatražiti od admina preko email ili kao nagrada za prijedlog/grešku.",
    Sta_znaci:"Šta znači premium član?",
    Nasu_aplikaciju:"Našu aplikaciju mogu koristiti svi nakon registracije potpuno besplatno, ali održavanje aplikacije je trošak te zbog toga koristimo reklame. Premium član nema reklame u aplikaciji i ima veće privilegije. Više o tome možete pročititati na našoj internet stranici.",
    Dobro:"Dobro, a kako da postanem premium član?",
    Premium_clan:"Premium član možete postati doniranjem putem naše web stranice, kupovanjem premium aplikacije, davanjem dobrog prijedloga, prijavljivanjem greške ili kao neka druga nagrada.",
    Da_li:"Da li sam onda i admin?",
    Ne_za:"Ne, za admina postoji drugačija procedura. Potrebno postati premium član preko nagrade za prijedlog/grešku i komunikacija s nekim adminom. Email admina i aplikacije je isti. Najnoviji email možete provjeriti Menu / Postavke / Pošalji nam email.",
    Koliko_je:"Koliko je potrebno da moja objava bude vidljima drugima?",
    Objava_ce:"Objava će biti vidljiva na aplikaciji u roku od 2 sata jer svaka objava mora proći određene procedure. Kako na aplikaciji ne bi bilo neželjenog sadržaja, oglasa drugih korisnika potrebno je neko kratko vrijeme da se objava odobri. Najčešče objava postaje vidljiva za nekoliko minuta ako je s njom sve uredu.",
    Znaci_ako:"Znači ako se ne objavi u roku od 2 sata moram ponovo probat?",
    Rijetke_su:"Rijetke su situacije da ne dođe do objave.Najčešći razlozi su neprikladan sadržaj ili vlastiti oglas koji nije dopušten od strane nas. Ukoliko osoba pokušava istu objavu koja sadrži neželjen sadržaj više puta objaviti može biti kažnjena ili blokirana.",
    Nisam_objavljivao:"Nisam objavljivao nikakav zabranjen sadržaj svejedno nije bilo objavljeno.",
    Postoje_situacije:"Postoje situacije kada je sadržaj primjeren ali ne bude objavljen. Razlog tome je prevelika fotografija ili preslaba internet konekcija, ali ako se to i dogodi prilikom pokušaja objavljivanja bit će te obaviješteni da pokušate ponovo. Takve situacije su vrlo rijetke.",
    Da_li_je:"Da li je istina da se ne smije screenshot koristiti?",
    Cesto_vam:"Često Vam aplikacija neće dati fotografiranje ili snimanje ekrana. Ukoliko dopusti nama će biti vidljivo i moguće je dobivanje kazne ili blokiranje.",
    Hocu_li:"Hoću li postat premium član ako ostavim pozitivan komentar i ocjenu na trgovini play?",
    U_tom:"U tom trenutku ne, ali nama su vidljivi korisnici koji su ostavili pozitivan komentar. Takve korisnike povremeno nagrađujemo ako duže vrijeme koriste našu aplikaciju.",
    Postao_sam:"Postao sam premium član, jel dozvoljeno da nekom prodam profil sad?",
    Nije_dozvoljeno:"Nije dozvoljeno prodavati članstvo. Svako prodavanje bit će kažneno i taj profil će biti trajno blokiran. Prodavanje članstva nama je vidljivo. Za više o tome obratite se adminu.",
    Da_li_mogu:"Da li mogu biti kažnjen na još neki način osim objavljivanja neželjenog sadržaja?",
    Da_jedan:"Da, jedan od načina je ostavljanje neprimjerenog  komentara na objavi. Sve o toj temi možete pročitati u našim pravilima. Menu / Postavke / Pravila korištenja.",
    Napravio_sam:"Napravio sam objavu, ali bez slike. Mogu li je ikako dodati naknadno?",
    Da_ako:"Da, ako nije prošlo puno vremena od objave, ako je ta objava isključivo stavljena s tog profila  i ako to admin dopusti. Ukoliko postoji takva situacija dovoljno je poslati email adminu i objava će biti ažurirana i ponovo stavljena.",
    Htio_bi:"Htio bi provjeriti kako će aplikacija izgledati u drugim bojama prije kupovanja premium članstva.",
    Na_nasoj:"Na našoj internet stranici postoji screenshot aplikacije u mogućim temama. Ako Vam se ne svidi nijedna pošaljite nam prijedlog mogućih boja.",
    Kako_cu:"Kako ću znat da li je moja objava postala vidljiva drugima?",
    Informacije:"Informacije o svakoj vašoj objavi možete pogledati na Profil / Vaše nedavne objave.",
    Evo:"Evo zadnje pitanje obećajem. Šta ako imam prijedlog, ali mislim da ga Vam je netko već poslao?",
    Ukoliko:"Ukoliko i postoji već takav prijedlog mi ćemo Vas nagraditi jer nam je drago da želite poboljšati aplikaciju.",
  }

  srb = {
    Pitanja:"Питања",
    U_kojem:"У којом граду се ја налазим?",
    Nasa_aplikacija:"Наша апликација за сад покрива Хрватску, Србију и Босну и Херцеговину. Државе су подељене на подручја (нека подручја садрже више градова). Ако се налазите имеђу два подручја дозвољено је поставити исту објаву на више подручја. Карту који град се налази у којем подручју можете пронаћи на нашој њеб страници. :)",
    Koji_grad:"Који град да изаберим ако желим да сви из те државе виде?",
    Cesto_ljudi:"Често људи желе објавити за сва подручја, нажалост то није могуће јер се једно подручје може одабрати. Наш савјет је да поставите на главни града (Београд, Загреб или Сарајево) јер приликом покретања апликације филтер је постављен на главне градове због највечег броја објава. Такођер могуће је ставити да објава свима буде на врху, безобзира на којој је регији филтер. Ту могућност потребно је затражити од админа преко емаил или као награда за предлог/грешку.",
    Sta_znaci:"Шта значи премиум члан?",
    Nasu_aplikaciju:"Нашу апликацију могу користити сви након регистрације потпуно бесплатно, али одржавање апликације је трошак те због тога користимо рекламе. Премиум члан нема рекламе у апликацији и има веће привилегије. Више о томе можете прочититати на нашој интернет страници.",
    Dobro:"Добро, а како да постанем премиум члан?",
    Premium_clan:"Премиум члан можете постати донирањем путем наше њеб странице, куповањем премиум апликације, давањем доброг предлога, пријављивањем грешке или као нека друга награда.",
    Da_li:"Да ли сам онда и админ?",
    Ne_za:"Не, за админа постоји другачија процедура. Потребно постати премиум члан преко награде за предлог/грешку и комуникација с неким админом. Емаил админа и апликације је исти. Најновији емаил можете провјерити Мену / Поставке / Пошаљи нам емаил.",
    Koliko_je:"Колико је потребно да моја објава буде видљима другима?",
    Objava_ce:"Објава ће бити видљива на апликацији у року од 2 сата јер свака објава мора проћи одређене процедуре. Како на апликацији не би било нежељеног садржаја, огласа других корисника потребно је неко кратко време да се објава одобри. Најчешче објава постаје видљива за неколико минута ако је с њом све уреду.",
    Znaci_ako:"Значи ако се не објави у року од 2 сата морам поново пробат?",
    Rijetke_su:"Ретке су ситуације да не дође до објаве.Најчешћи разлози су неприкладан садржај или властити оглас који није допуштен од стране нас. Уколико особа покушава исту објаву која садржи нежељен садржај више пута објавити може бити кажњена или блокирана.",
    Nisam_objavljivao:"Нисам објављивао никакав забрањен садржај свеједно није било објављено.",
    Postoje_situacije:"Постоје ситуације када је садржај примјерен али не буде објављен. Разлог томе је превелика фотографија или преслаба интернет конекција, али ако се то и догоди приликом покушаја објављивања бит ће те обавештени да покушате поново. Такве ситуације су врло ретке.",
    Da_li_je:"Да ли је истина да се не сме сцреенсхот користити?",
    Cesto_vam:"Често Вам апликација неће дати фотографирање или снимање екрана. Уколико допусти нама ће бити видљиво и могуће је добивање казне или блокирање.",
    Hocu_li:"Хоћу ли постат премиум члан ако оставим позитиван коментар и оцјену на трговини плаy?",
    U_tom:"У том тренутку не, али нама су видљиви корисници који су оставили позитиван коментар. Такве кориснике повремено награђујемо ако дуже време користе нашу апликацију.",
    Postao_sam:"Постао сам премиум члан, јел дозвољено да неком продам налог сад?",
    Nije_dozvoljeno:"Није дозвољено продавати чланство. Свако продавање бит ће кажнено и тај налог ће бити трајно блокиран. Продавање чланства нама је видљиво. За више о томе обратите се админу.",
    Da_li_mogu:"Да ли могу бити кажњен на још неки начин осим објављивања нежељеног садржаја?",
    Da_jedan:"Да, један од начина је остављање непримјереног коментара на објави. Све о тој теми можете прочитати у нашим правилима. Мену / Поставке / Правила кориштења.",
    Napravio_sam:"Направио сам објаву, али без слике. Могу ли је икако додати накнадно?",
    Da_ako:"Да, ако није прошло пуно времена од објаве, ако је та објава искључиво стављена с тог налога и ако то админ допусти. Уколико постоји таква ситуација довољно је послати емаил админу и објава ће бити ажурирана и поново стављена.",
    Htio_bi:"Хтио би провјерити како ће апликација изгледати у другим бојама пре куповања премиум чланства.",
    Na_nasoj:"На нашој интернет страници постоји сцреенсхот апликације у могућим темама. Ако Вам се не свиди ниједна пошаљите нам предлог могућих боја.",
    Kako_cu:"Како ћу знат да ли је моја објава постала видљива другима?",
    Informacije:"Информације о свакој вашој објави можете погледати на Налог / Ваше недавне објаве.",
    Evo:"Ево задње питање обећајем. Шта ако имам предлог, али мислим да га Вам је нетко већ послао?",
    Ukoliko:"Уколико и постоји већ такав предлог ми ћемо Вас наградити јер нам је драго да желите побољшати апликацију.",

  }
  


  ngOnInit() {}

  
  checkUI(){
    setTimeout(()=>{
      let theme = this.user.getUI().toString()
      if(theme === "1"){
      }else if(theme === "2"){

        let items = document.getElementsByClassName("dark_theme")
        items[0].classList.add("light_theme")
        items[0].classList.remove("dark_theme")
        let item = document.getElementById("content_id_pitanja")
        item.classList.add("light_theme")
        item.classList.remove("dark_theme")
      }
    },50)

  }

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

}
