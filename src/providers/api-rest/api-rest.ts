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
		
		let uri = "https://dev.tuten.cl/TutenREST/rest/user/"+encodeURIComponent(data.email);
		return new Promise(resolve => {
		this.http.put(uri,{},
			{headers:{'Accept':'application/json',"app":"APP_BCK","password":data.password}}).subscribe(data => {
	  		resolve({status:true,data:data});
		}, err => {
			
	  		resolve({status:false});
		});
		});
	}

	infoUser(data){
		return new Promise(resolve => {
		this.http.get("https://dev.tuten.cl:443/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=false",
			{headers:{'Accept':'application/json',
			"app":"APP_BCK",
			"adminemail":"testapis@tuten.cl",
			"email":"contacto@tuten.cl",
			"token":data}}).subscribe(data => {


	  		resolve({status:true,data:data});
		}, err => {
	  		resolve({status:false,message:'Error de conexión'});
		});
		});
	}

  

}
