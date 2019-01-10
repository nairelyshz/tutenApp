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
	colPrice:any =[];
	rows:any = [];
  originalRows:any ;
	colId:any = [];
  response:any;
  optionCheck:any;
  modelCheck:any;
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

  async getInfo(){
    let token;
    this.helper.openLoading();
    await this.helper.getLocalStorage().then(async (data)=>{
      token = data;
      
        this.api.infoUser(token).then((data)=>{
          this.response = data;
          if(this.response.status){
            this.setRows(this.response.data);
            this.helper.closeLoading();
          }else{
            this.helper.closeLoading();
            this.helper.toast("Error! No se pudo recuperar los datos, intente nuevamente");
          } 
      });
    });  	
  }

  setRows(data){
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
                this.colId.push(this.rows[i].bookingId);
                this.colPrice.push(this.rows[i].bookingPrice);
            }
            this.originalRows = rowsTemp;
            this.rows = rowsTemp;
  }

  filter(event) {
    this.rows = this.originalRows;
    if(this.optionCheck && this.modelCheck){
        if(this.optionCheck==0 || this.modelCheck==0){
 
        }else if(event.target.value == ''){
            this.rows = this.originalRows;
        }else{
            if(this.optionCheck==1){
                if(this.modelCheck==1){
                    this.filterMenor(this.colId,event.target.value);
                }else{
                    this.filterMayor(this.colPrice,event.target.value);
                }
            }else{
                if(this.modelCheck==1){
                    this.filterMenor(this.colId,event.target.value);
                }else{
                    this.filterMayor(this.colPrice,event.target.value);
                }
            }
        }
    }else{
      this.helper.toast("Debe seleccionar correctamente los campos para filtrar");
    }
  }

  filterMenor(rows,num){
    let newRows = [];
      for(let i=0;i< rows.length;i++){
        if(rows[i]<=num){
          newRows.push(this.rows[i]);
        }
      }
      this.rows = newRows;
  }

  filterMayor(rows,num){
      let newRows = [];
      for(let i=0;i< rows.length;i++){
        if(rows[i]>=num){
            newRows.push(this.rows[i]);
        }
      }
      this.rows = newRows;
  }

}
