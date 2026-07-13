import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compared',
  templateUrl: './compared.component.html',
  styleUrls: ['./compared.component.css']
})

export class ComparedComponent {
  constructor(private compareResults: ApisService, private router:Router){}

tranfaredComparedProducts:any = this.compareResults.comaredProducts
recomendation:any
isGeted:boolean = false
stopLoader:boolean = true

// Display the comparison
ngOnInit(){
  this.compareResults.getComparison(this.tranfaredComparedProducts).subscribe((data) => {
  if(data.status === 'no'){
    this.isGeted = false
    this.stopLoader = false    
    this.router.navigate(['dashboard/phones'])
  }else{
    this.recomendation = data 
    this.isGeted = true
    this.stopLoader = false    
  }
}) 
}
}
