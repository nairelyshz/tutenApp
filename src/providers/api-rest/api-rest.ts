import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiRestProvider {
	url : string = "https://dev.tuten.cl/TutenREST/#!/user/";
  constructor(public http: HttpClient) {
    console.log('Hello ApiRestProvider Provider');
  }

	login(data){
		//console.log(this.url+encodeURIComponent(data.user))
		return new Promise(resolve => {
		this.http.put("https://dev.tuten.cl/TutenREST/rest/user/testapis@tuten.cl",{},
			{headers:{'Accept':'application/json',"app":"APP_BCK","password":"1234"}}).subscribe(data => {
	  		resolve(data);
		}, err => {
			
	  		resolve({status:false,message:'Error de conexión'});
		});
		});
	}

	infoUser(){
		return new Promise(resolve => {
		this.http.get("https://dev.tuten.cl:443/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=false",
			{headers:{'Accept':'application/json',
			"app":"APP_BCK",
			"adminemail":"testapis@tuten.cl",
			"email":"contacto@tuten.cl",
			"token":"testapis@tuten.cl7pukibien7mjb6ie7q6dphgka5"}}).subscribe(data => {


	  		resolve(data);
		}, err => {
	  		resolve({status:false,message:'Error de conexión'});
		});
		});
	}

  

}
