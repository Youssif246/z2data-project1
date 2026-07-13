import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablets',
  templateUrl: './tablets.component.html',
  styleUrls: ['./tablets.component.css']
})

export class TabletsComponent {
  constructor(private tabletsApi: ApisService, private router: Router){}

ischecked: boolean = false
allIstrue: boolean = true
searchIsTrue: boolean = false
isSearchEmpty:boolean = false
tabletsData: any[] = [];
comparedTablets: any[] = [];
quary:any = ''
category:string = 'tablet'
removingElement:number = 0

// Get the tablets
ngOnInit() {
  this.tabletsApi.getablets().subscribe((data: Array<any>) => {this.tabletsData = data})
}

// Get the results from the search
getResults() { 
  if(this.quary){
    this.tabletsApi.getresults(this.quary, this.category).subscribe((data: Array<any>) => {
    if(data.length != 0){
      this.tabletsData = data
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
doIfChecked(tablet:any, event:any){
  if(!this.comparedTablets.includes(tablet) && event.target.checked === true){
    this.comparedTablets.push(tablet)
  }else if(this.comparedTablets.includes(tablet) && event.target.checked === false){
    this.removingElement = this.comparedTablets.findIndex(p => p === tablet)
    this.comparedTablets.splice(this.removingElement, 1)
  }
}

// Do if user click io the compare button
goCompare(){
  if(this.comparedTablets.length >= 2 ){
    this.tabletsApi.comaredProducts = this.comparedTablets
    this.router.navigate(['dashboard/comparedproducts'])
  }else{
    alert('To comare you must select at least 2 products')
  }
}
}
