import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewproductmasterComponent } from './components/newproductmaster/newproductmaster.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewproductcreateComponent } from './components/newproductcreate/newproductcreate.component';
import { NewproductdetailComponent } from './components/newproductdetail/newproductdetail.component';

const routes: Routes = [

  { path: '', component: NewproductmasterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'newproduct', component: NewproductmasterComponent },
  { path: 'createproduct', component: NewproductcreateComponent },
  { path: 'detailproduct', component: NewproductdetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
