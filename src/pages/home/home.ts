import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	columns:any;
	columnDefs:any;
	rows:any = [];
	rowData:any;
  constructor(public navCtrl: NavController,
  	  	public api: ApiRestProvider,
  	  	public helper: HelperProvider) {

  	this.columns = [
        { name:'bookingId' ,title: 'BookingId',sort:true},
        { name:'tutenUserClient.firstName' ,title: 'Cliente' },
        { name:'bookingTime' ,title: 'Fecha de creación' },
        { name:'bookingAddress' ,title: 'Dirección' },
        { name:'bookingPrice' ,title: 'Precio' }
      ];
    this.getInfo();


  }

  getInfo(){
  		this.helper.presentLoading();
  	  	this.api.infoUser().then((data)=>{
  		this.rows = data;
  		let rowsTemp = [];
  		for(let i=0;i< this.rows.length;i++){
	  		rowsTemp.push({
	  			'bookingId': this.rows[i].bookingId,
	  			'firstName': JSON.parse(this.rows[i].bookingFields).firstName,
	  			'bookingTime': JSON.parse(this.rows[i].bookingFields).date,
	  			'bookingAddress': JSON.parse(this.rows[i].bookingFields).address,
	  			'bookingPrice': this.rows[i].bookingPrice
	  		});
  		}
  		this.rows = rowsTemp;
  		this.helper.dismissLoading();
  	});
  	
  }

  idSummary(values) {
  	console.log();
  }

}
