import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})

export class PhonesComponent {
  constructor(private phonesApi: ApisService, private router: Router){}

ischecked: boolean = false
allIstrue: boolean = true
searchIsTrue: boolean = false
isSearchEmpty:boolean = false
phonesData: Array<any> = [];
comparedPhones: Array<any> = [];
quary:any = ''
category:string = 'phone'
removingElement:number = 0

// Get the phones
ngOnInit() {
  this.phonesApi.getPhones().subscribe((data: Array<any>) => {this.phonesData = data})
}

// Get the results from the search
getResults() { 
  if(this.quary){
    this.phonesApi.getresults(this.quary, this.category).subscribe((data: Array<any>) => {
    if(data.length != 0){
      this.phonesData = data
      this.allIstrue = false
      this.searchIsTrue = true
      this.isSearchEmpty = false
    }else{
      this.allIstrue = false
      this.searchIsTrue = false
      this.isSearchEmpty = true
    }
    })
  }else{
    alert('You must write an input to search')
  }
}

// Do if user check on the checkbox
doIfChecked(phone:any, event:any){
  if(!this.comparedPhones.includes(phone) && event.target.checked === true){
    this.comparedPhones.push(phone)
  }else if(this.comparedPhones.includes(phone) && event.target.checked === false){
    this.removingElement = this.comparedPhones.findIndex(p => p === phone)
    this.comparedPhones.splice(this.removingElement, 1)
  }
}

// Do if user click io the compare button
goCompare(){
  if(this.comparedPhones.length >= 2 ){
    this.phonesApi.comaredProducts = this.comparedPhones
    this.router.navigate(['dashboard/comparedproducts'])
  }else{
    alert('To comare you must select at least 2 products')
  }
}
}

