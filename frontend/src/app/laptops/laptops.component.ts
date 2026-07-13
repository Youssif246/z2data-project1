import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})

export class LaptopsComponent {
  constructor(private laptopsApi: ApisService, private router:Router){}

ischecked: boolean = false
allIstrue: boolean = true
searchIsTrue: boolean = false
isSearchEmpty:boolean = false
laptopsData: Array<any> = [];
comparedlaptops: Array<any> = [];
quary:any = ''
category:string = 'laptop'
removingElement:number = 0

// Get the laptops
ngOnInit() {
  this.laptopsApi.getablets().subscribe((data: Array<any>) => {this.laptopsData = data})
}

// Get the results from the search
getResults() { 
  if(this.quary){
    this.laptopsApi.getresults(this.quary, this.category).subscribe((data: Array<any>) => {
    if(data.length != 0){
      this.laptopsData = data
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
  if(!this.comparedlaptops.includes(phone) && event.target.checked === true){
    this.comparedlaptops.push(phone)
  }else if(this.comparedlaptops.includes(phone) && event.target.checked === false){
    this.removingElement = this.comparedlaptops.findIndex(p => p === phone)
    this.comparedlaptops.splice(this.removingElement, 1)
  }
}

// Do if user click io the compare button
goCompare(){
  if(this.comparedlaptops.length >= 2 ){
    this.laptopsApi.comaredProducts = this.comparedlaptops
    this.router.navigate(['dashboard/comparedproducts'])
  }else{
    alert('To comare you must select at least 2 products')
  }
}
}
