import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewproductmasterComponent } from './components/newproductmaster/newproductmaster.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewproductcreateComponent } from './components/newproductcreate/newproductcreate.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { ModalService } from './services/modal/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    NewproductmasterComponent,
    DashboardComponent,
    NewproductcreateComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    
    FormsModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
