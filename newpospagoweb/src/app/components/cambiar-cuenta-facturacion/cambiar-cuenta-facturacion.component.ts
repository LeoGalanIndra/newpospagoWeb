import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-cambiar-cuenta-facturacion',
  templateUrl: './cambiar-cuenta-facturacion.component.html',
  styleUrl: './cambiar-cuenta-facturacion.component.css'
})
export class CambiarCuentaFacturacionComponent implements OnInit,  OnDestroy{


  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;


  constructor(private modalService: ModalService){

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();

    
  }


  uploadFile(){

  }


  ejecutarProceso(){

    this.sub = this.modalService
      .openModal(this.entry,
        'Confirmación del proceso',
        'Se realizaran cambios de líneas entre cuentas, Al dar click en confirmar usted esta aprobando este cambio. Desea continuar?')

      .subscribe((v) => {
        //your logic

        

      });

  }


  onFileChange(event: any) {

  }

}
