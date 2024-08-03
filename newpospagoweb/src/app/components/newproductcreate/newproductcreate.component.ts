import { Component, OnInit } from '@angular/core';
import { NewProductContract } from '../../models/new-product-contract';
import { BillAccount } from '../../models/bill-account';
import { Plan } from '../../models/plan';
import { AddServices } from '../../models/add-services';
import { Linea } from '../../models/linea';
import { Device } from '../../models/device';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

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
      numeroContrato: '',
      tipoContrato: '',
      inicioVigencia: '',
      mesesContrato: NaN,
      finVigencia: null,
      codigoVendedor: NaN,
      valorBolsa: NaN,
      saldo: NaN, 
      valorNoRedimible: 0 ,
    },
    billAccounts: [],
    discount: {
      meses: [],
      motivoDescuento: "",
      valorDescuento: 0
    },
    plans: [], 
    lineas: [] , 
    devices: []

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
    idPromocion: 0, 
    valorTotal: 0 , 
    idCuentaFacturacion: NaN, 
    idPlan: 0 
  };
  
  newLinea: Linea = {
    tipoLinea: '',
    numeroLinea: NaN,
    imsi: NaN,
    imei: '',
    operador: '',
    tipoPersona: '',
    tipoIdentificacion: '',
    numeroDocumento: NaN,
    nombre: '',
    fechaExpedicion: NaN,
    tipoEnvio: '' , 
    idPlan: NaN
  };

  nuevoEquipo: Device = {
    equipo: '',
    cantidadInventario: 0,
    cantidad: 0,
    valorEquipo: 0,
    porcentajeDescuento: 0,
    valorDescontado: 0,
    redencionEquipos: '', 
    id: NaN
  };

  serviciosAdicionales: AddServices [] = [] ; 

  selectedAccountId: number | null = null;

  selectedPlanId: number | null = null;

  idAccountParam: any | null = null; 
  idContractParam: any | null = null ; 
  documentNumberParam: any | null = null ;
  legalNameParam: string | null = null ;

  constructor(private route: ActivatedRoute, private dataService: DataService ) {

  }

  ngOnInit(): void {
    this.idContract = Math.random();

    this.route.queryParamMap.subscribe(params => {

      console.log("recieve: " + params.get('documentNumber') ); 

      this.idAccountParam = params.get('idAccount');
      this.idContractParam = params.get('idContract');
      this.documentNumberParam = params.get('documentNumber');
      this.legalNameParam = params.get('legalName');
      
    });

    this.idContract = this.idContractParam == "-1" ? Math.random() : this.idContractParam;
    

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

  selectPlan(id: number) {
    this.selectedPlanId = id;
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

    let idCuentaFacturacion = this.selectedAccountId ; 

    this.newPlan.idCuentaFacturacion = idCuentaFacturacion ? idCuentaFacturacion : NaN ; 

    this.newContract.plans.push({ ...this.newPlan });

    let newIdPlan = this.newContract.plans.length + 1 ; 

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
      idPromocion: NaN, 
      valorTotal: 0 , 
      idCuentaFacturacion: NaN , 
      idPlan : newIdPlan
    };
  }

  eliminarPlan(index: number) {
    console.log("para borrar indez" + index); 
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

  adicionarLinea() {

    console.log(this.newLinea); 

    this.newLinea.idPlan = this.selectedPlanId ? this.selectedPlanId : -1 ; 

    this.newContract.lineas.push({ ...this.newLinea });

    console.log(this.newContract.lineas) ; 

    this.newLinea = {
      tipoLinea: '',
      numeroLinea: NaN,
      imsi: NaN,
      imei: '',
      operador: '',
      tipoPersona: '',
      tipoIdentificacion: '',
      numeroDocumento: NaN,
      nombre: '',
      fechaExpedicion: NaN,
      tipoEnvio: '' , 
      idPlan: NaN
    };
  }

  eliminarLinea(index: number) {
    this.newContract.lineas.splice(index, 1);
  }

  adicionarEquipo() {
    this.newContract.devices.push({ ...this.nuevoEquipo });
    this.nuevoEquipo = {
      equipo: '',
      cantidadInventario: 0,
      cantidad: 0,
      valorEquipo: 0,
      porcentajeDescuento: 0,
      valorDescontado: 0,
      redencionEquipos: '', 
      id: NaN
    };
  }

  eliminarEquipo(index: number) {
    this.newContract.devices.splice(index, 1);
  }

  calcularMesFinContrato(){

    if (this.newContract.contract.inicioVigencia && this.newContract.contract.mesesContrato > 0 ) {
      // Convertir la fecha inicial a un objeto Date
      const startDate = new Date(this.newContract.contract.inicioVigencia);
      
      // Sumar los meses
      const newDate = new Date(startDate.setMonth(startDate.getMonth() + this.newContract.contract.mesesContrato));
      
      
      // Asignar la nueva fecha al atributo del componente
      this.newContract.contract.finVigencia =  newDate.toDateString() ;
    }

    this.newContract.contract.inicioVigencia 
  }


}
