import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PhonesComponent } from './phones/phones.component';
import { LaptopsComponent } from './laptops/laptops.component';
import { TabletsComponent } from './tablets/tablets.component'; 
import { ComparedComponent } from './compared/compared.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'signin', component: LoginPageComponent, title:'Sign in'},
  {path:'', redirectTo:'signin', pathMatch:'full'},
  {path:'dashboard', redirectTo:'dashboard/phones', pathMatch:'full'},
  {path:'dashboard/phones', component: PhonesComponent, title:'Dashboard'},
  {path:'dashboard/laptops', component: LaptopsComponent, title:'Dashboard'},
  {path:'dashboard/tablets', component: TabletsComponent, title:'Dashboard'},
  {path:'dashboard/comparedproducts', component: ComparedComponent, title:'Dashboard'},
  {path:'**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
