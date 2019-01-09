import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { HelperProvider } from '../../providers/helper/helper';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm : FormGroup;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public api: ApiRestProvider,
  	private formBuilder: FormBuilder,
    private helper : HelperProvider) {
    this.createLoginForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createLoginForm(){
  	this.loginForm = this.formBuilder.group({
  		app: ['APP_BCK'],
  		email:['testapis@tuten.cl'], //: testapis@tuten.cl
  		password:['1234']
  	});
  }

  login(){
    this.helper.presentLoading();
    this.api.login(this.loginForm.value).then((resp)=>{
      
      this.helper.dismissLoading();
      this.navCtrl.push(HomePage);
    });
    
  }


}
