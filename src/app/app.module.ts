import { NgModule, Renderer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//all should be imported only here with postfix Module
import { Http, HttpModule } from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { UserService } from './user.service';
import { MainVariables } from './app.variables';
import { Post } from './post.class';
//import { SQLite } from '@ionic-native/sqlite/ngx';
import { IonicStorageModule } from '@ionic/storage';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';
import { IonContent } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    MainVariables,
    IonicStorageModule.forRoot(),

    //File
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UniqueDeviceID,
    UserService,
    Post,
    //File,
    FileTransfer,
    Camera,
    PhotoViewer,
    AdMobFree,
    AndroidFullScreen,
    EmailComposer,
    ScreenOrientation,
    Keyboard,
    AppVersion,
    LocalNotifications,
    Clipboard,
    SocialSharing


  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
