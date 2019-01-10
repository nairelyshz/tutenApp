import { AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {
	loading : any;
  token:string;
  constructor(private alertCtrl:AlertController, 
  			private toastCtrl: ToastController,
  			private loadingCtrl: LoadingController,
        private storage:Storage   
   ) {
  }

  toast(msj){

    let toast = this.toastCtrl.create({
      message: msj,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  
  }

  openLoading(){
  	this.loading = this.loadingCtrl.create({
        content: `Cargando...`,
        cssClass:'loading'
	});
	this.loading.present();
  }

 closeLoading(){
  	this.loading.dismiss();
  }

  async setLocalStorage(data){
    await this.storage.set('token',data);
  }

  async getLocalStorage(){
      let promise= new Promise((resolve,reject)=>{
      this.storage.get('token').then((token)=>{ 
        this.token=token;
        return resolve(token);
      });
    });
    return promise;
  }

}
