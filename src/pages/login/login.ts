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
  response:any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public api: ApiRestProvider,
  	private formBuilder: FormBuilder,
    private helper : HelperProvider) {
    this.createLoginForm();
  }


  createLoginForm(){
  	this.loginForm = this.formBuilder.group({
  		app: ['APP_BCK'],
  		email:[''], //: testapis@tuten.cl
  		password:['']
  	});
  }

  login(){
    this.helper.openLoading();
    this.api.login(this.loginForm.value).then((resp)=>{
      this.helper.closeLoading();
      this.response = resp;
      if(this.response.status){
        this.helper.setLocalStorage(this.response.data.sessionTokenBck);
        this.navCtrl.push(HomePage);
      }else{
        this.helper.toast("Error! verifique las credenciales ingresadas");
      }
    });
    
  }


}
