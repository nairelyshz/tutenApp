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

  constructor(private alertCtrl:AlertController, 
  			private toastCtrl: ToastController,
  			private loadingCtrl: LoadingController,   
   ) {
    console.log('Hello HelperProvider Provider');
  }

  presentToast(msj){

    let toast = this.toastCtrl.create({
      message: msj,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  
  }

  presentLoading(){
  	this.loading = this.loadingCtrl.create({
        content: `Cargando...`,
        cssClass:'loading'
	});
	this.loading.present();
  }

  dismissLoading(){
  	this.loading.dismiss();
  }

  setLocalStorage(data){
    
  }

 getLocalStorage(){
   // let promise=new Promise((resolve,reject)=>{
  //     this.localStorage.get('type_tr2').then((type)=>{
  //       this.type=type;
  //       console.log("desde  helper",this.type);
  //       return this.localStorage.get('uid_tr2');
  //     })
  //     .then((uid)=>{
  //       this.userUID=uid;
  //       return resolve();
        
  //       //return this.localStorage.get('phone_tr2');
  //     })
      
  // });
  //   return promise;
  }

}
