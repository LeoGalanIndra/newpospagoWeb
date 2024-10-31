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
import { SucessModalComponent } from './components/modals/sucess-modal/sucess-modal.component';
import { NewproductdetailComponent } from './components/newproductdetail/newproductdetail.component';
import { CambiarCuentaFacturacionComponent } from './components/cambiar-cuenta-facturacion/cambiar-cuenta-facturacion.component';
import { NipComponent } from './components/nip/nip.component';
import { NumberFormatDirective } from './number-format.directive';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ResumenOfertaComponent } from './resumen-oferta/resumen-oferta.component';



@NgModule({
  declarations: [
    AppComponent,
    NumberFormatDirective,
    NewproductmasterComponent,
    DashboardComponent,
    NewproductcreateComponent,
    ConfirmationModalComponent,
    SucessModalComponent,
    NewproductdetailComponent,
    CambiarCuentaFacturacionComponent,
    NipComponent,
    ResumenOfertaComponent, 
    NumberFormatDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
