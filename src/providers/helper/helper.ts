import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {
  constructor(private http: HttpClient,
              private alCtrl:AlertController,
              private loadCtrl:LoadingController,
              private toastCtrl:ToastController) {
              console.log('Hello HelperProvider Provider');
             }
  getAlert(title: string, message: string){
    let makeAlert = this.alCtrl.create({
      title: title,
      message: message
    })
    makeAlert.present();
    return makeAlert;
  }
  getLoading(content:string) {
    let loading = this.loadCtrl.create({
      content:content
    })
    loading.present();
    return loading;
  }
  getToast(message:string,duration?:number) {
    let toast = this.toastCtrl.create({
      message:message,
      duration:(duration) ? duration : 1000,
      position:'bottom'
    })
    toast.present();
    return toast;
  }

}
