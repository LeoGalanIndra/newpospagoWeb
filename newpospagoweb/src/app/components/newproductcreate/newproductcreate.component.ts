import { Component, OnInit } from '@angular/core';
import { NewProductContract } from '../../models/new-product-contract';
import { BillAccount } from '../../models/bill-account';
import { Plan } from '../../models/plan';
import { AddServices } from '../../models/add-services';

@Component({
  selector: 'app-newproductcreate',
  templateUrl: './newproductcreate.component.html',
  styleUrl: './newproductcreate.component.css'
})
export class NewproductcreateComponent implements OnInit {

  idContract: number = NaN;

  newContract: NewProductContract = {
    contract: {
      idAccount: NaN,
      id: this.idContract,
      estado: '',
      editar: false,
      informeVenta: false,
      seguimientoLineas: false,
      activacionLineas: false,
      eliminacionLineas: false,
      edicionLineas: false,
      numeroContrato: NaN,
      tipoContrato: '',
      inicioVigencia: '',
      mesesContrato: NaN,
      finVigencia: '',
      codigoVendedor: NaN,
      valorBolsa: NaN,
      saldo: NaN
    },
    billAccounts: [],
    discount: {
      meses: [],
      motivoDescuento: "",
      valorDescuento: 0
    },
    plans: []

  };

  newPlan: Plan = {
    tipoProducto: '',
    familia: '',
    producto: '',
    plan: '',
    cantidad: NaN,
    valorUnitario: NaN,
    valorDescuento: NaN,
    motivoDescuento: '',
    grupo: '', 
    idPromocion: NaN
  };

  serviciosAdicionales: AddServices [] = [] ; 

  selectedAccountId: number | null = null;

  constructor() {

  }

  ngOnInit(): void {
    this.idContract = Math.random();
  }

  adicionarCuenta() {

    let index = 1;

    if (this.newContract.billAccounts.length > 0) {
      index = this.newContract.billAccounts[this.newContract.billAccounts.length - 1].id;
      index++;

    }

    let newBillAccount: BillAccount = {
      id: index,
      idContract: this.idContract,
      cuentaFacturacion: NaN,
      cicloFacturacion: NaN,
      fechaCreacion: ''
    };

    this.newContract.billAccounts.push({ ...newBillAccount });

  }

  eliminarCuenta(index: number) {
    this.newContract.billAccounts.splice(index, 1);
  }

  selectAccount(id: number) {
    this.selectedAccountId = id;
  }

  toggleMonth(month: string) {
    const index = this.newContract.discount.meses.indexOf(month);
    if (index === -1) {
      this.newContract.discount.meses.push(month);
    } else {
      this.newContract.discount.meses.splice(index, 1);
    }
  }

  agregarPlan() {
    this.newContract.plans.push({ ...this.newPlan });
    this.newPlan = {
      tipoProducto: '',
      familia: '',
      producto: '',
      plan: '',
      cantidad: NaN,
      valorUnitario: NaN,
      valorDescuento: NaN,
      motivoDescuento: '',
      grupo: '', 
      idPromocion: NaN
    };
  }

  eliminarPlan(index: number) {
    this.newContract.plans.splice(index, 1);
  }

  adicionarServicioAdicional() {
    this.serviciosAdicionales.push({
      tipo: '',
      cargoBasico: '',
      descuento: '', 
      idPlan: '' 
    });
  }

  eliminarServicioAdicional(index: number) {
    this.serviciosAdicionales.splice(index, 1);
  }


}
