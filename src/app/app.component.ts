import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OfflineManagerService } from './Services/offline-manager.service';
import { ConnectionStatus, NetworkService } from './Services/network.service';



import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private offlineManager: OfflineManagerService,
    private networkService: NetworkService,
    private menu: MenuController
  
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if (this.platform.is('android')) {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#FEFEFE');
    }

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status == ConnectionStatus.Online) {
          this.offlineManager.checkForEvents().subscribe();
        }
      });
    });
  }

  openEnd() {

    this.menu.close('first')
      }
  
}
