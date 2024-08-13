import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NewProductContract } from '../../models/new-product-contract';
import { BillAccount } from '../../models/bill-account';
import { Plan } from '../../models/plan';
import { AddServices } from '../../models/add-services';
import { Linea } from '../../models/linea';
import { Device } from '../../models/device';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Tax } from '../../models/tax';

@Component({
  selector: 'app-newproductcreate',
  templateUrl: './newproductcreate.component.html',
  styleUrl: './newproductcreate.component.css'
})
export class NewproductcreateComponent implements OnInit, OnChanges {

  idContract: number = NaN;

  newContract: NewProductContract = {
    contract: {
      idAccount: NaN,
      idContract: NaN,
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
      valorNoRedimible: 0,
    },
    billAccounts: [],
    discount: {
      meses: [],
      motivoDescuento: "",
      valorDescuento: 0, 
      idContract: NaN
    },
    plans: [],
    lineas: [],
    devices: []  

  };

  newPlan: Plan = {
    tipoProducto: '',
    familia: '',
    producto: '',
    plan: '',
    cantidad: NaN,
    valorUnitario: NaN,
    valorDescuento: 0,
    motivoDescuento: '',
    grupo: '',
    idPromocion: 'Sin campaña',
    valorTotal: 0,
    idCuentaFacturacion: NaN,
    idPlan: 1,
    tipoEnvio: '',
    vozAndSMS: null, 
    cuentaFacturacion: null , 
    idContract: NaN
  };

  showedPlans: Plan[] = [];

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

    idPlan: NaN, 
    addServices: [], 
    idContract: NaN
  };

  portableLines: Linea[] = [];

  nuevoEquipo: Device = {
    equipo: '',
    cantidadInventario: 0,
    cantidad: 0,
    valorEquipo: 0,
    porcentajeDescuento: 0,
    valorDescontado: 0,
    redencionEquipos: '',
    id: NaN, 
    idContract: NaN

  };

  addService: AddServices = {
    cargoBasico: NaN,
    descuento: NaN,
    idPlan: NaN,
    tipo: '',


  };

  vozAndSMSService: AddServices = {
    cargoBasico: 10000,
    descuento: 0,
    idPlan: 1,
    tipo: 'VozAndSMS',
  };

  aplicaVozAndSMS: boolean = true ; 

  ivaTax: Tax = {
    id : 0, 
    name: 'IVA', 
    value: 0.19 
  }

  selectedBillAccount: BillAccount = {
    cicloFacturacion : NaN , 
    cuentaFacturacion: NaN , 
    fechaCreacion: '' , 
    id: NaN , 
    idContract : this.idContract
  }

  selectedPlanId: number | null = null;

  idAccountParam: any | null = null;
  idContractParam: any | null = null;
  documentNumberParam: any | null = null;
  legalNameParam: string | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.idContract = Math.random();

    this.route.queryParamMap.subscribe(params => {

      console.log("recieve: " + params.get('documentNumber'));

      this.idAccountParam = params.get('idAccount');
      this.idContractParam = params.get('idContract');
      this.documentNumberParam = params.get('documentNumber');
      this.legalNameParam = params.get('legalName');

    });

    this.idContract = this.idContractParam == "-1" ? Math.random() : this.idContractParam;

    this.newContract.contract.idContract = this.idContract ; 

    this.adicionarServicioAdicionalDefault();




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

  selectAccount(id: BillAccount) {
    let selectedAccountId = id.id;
    this.selectedBillAccount = id ; 
    this.showedPlans = this.newContract.plans.filter(c => c.idCuentaFacturacion === selectedAccountId);
  }

  selectPlan(id: number) {
    console.log("selectPlan: " + id);
    this.selectedPlanId = id;
    console.log(this.selectedPlanId);
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

    let idCuentaFacturacion = this.selectedBillAccount.id;
    let cuentaFacturacionValue = this.selectedBillAccount.cuentaFacturacion ; 

    this.newPlan.idCuentaFacturacion = idCuentaFacturacion ? idCuentaFacturacion : NaN;
    this.newPlan.valorUnitario += this.calcularTotalCargosServiciosAdicionales();
    this.newPlan.vozAndSMS = this.aplicaVozAndSMS ? this.vozAndSMSService : null ; 
    this.newPlan.cuentaFacturacion = cuentaFacturacionValue ; 
    this.newPlan.idContract = this.idContract ; 

    this.newContract.plans.push({ ...this.newPlan });

    this.showedPlans = this.newContract.plans.filter(c => c.idCuentaFacturacion === idCuentaFacturacion );

    let newIdPlan = this.newContract.plans[this.newContract.plans.length - 1].idPlan + 1;

    this.newPlan = {
      tipoProducto: '',
      familia: '',
      producto: '',
      plan: '',
      cantidad: NaN,
      valorUnitario: NaN,
      valorDescuento: 0,
      motivoDescuento: '',
      grupo: '',
      idPromocion: 'Sin campaña',
      valorTotal: 0,
      idCuentaFacturacion: NaN,
      idPlan: newIdPlan,
      tipoEnvio: '', 
      vozAndSMS: null, 
      cuentaFacturacion: null, 
      idContract: NaN
       
    };
  }

  eliminarPlan(index: number) {

    this.newContract.plans.splice(index, 1);
    this.showedPlans = this.newContract.plans.filter(c => c.idCuentaFacturacion === this.selectedBillAccount.id );
  }

  adicionarServicioAdicional() {
    this.newLinea.addServices.push({ ... this.addService });

    let addServiceId = this.addService.idPlan + 1;

    this.addService = {
      cargoBasico: 0,
      descuento: 0,
      idPlan: addServiceId,
      tipo: '',

    };
  }

  adicionarServicioAdicionalDefault() {

    

    
  }

  eliminarServicioAdicional(index: number) {
    this.newLinea.addServices.splice(index, 1);
  }

  adicionarLinea() {

    this.newLinea.idPlan = this.selectedPlanId ? this.selectedPlanId : -1;

    let results: Plan[] = this.newContract.plans.filter(c => c.idPlan === this.newLinea.idPlan);
    let mySelectedPlan = results[0];

    this.newLinea.familia = mySelectedPlan.familia;
    this.newLinea.grupo = mySelectedPlan.grupo;
    this.newLinea.idCuentaFacturacion = mySelectedPlan.idCuentaFacturacion;
    this.newLinea.idPromocion = mySelectedPlan.idPromocion;
    this.newLinea.motivoDescuento = mySelectedPlan.motivoDescuento;
    this.newLinea.producto = mySelectedPlan.producto;
    this.newLinea.plan = mySelectedPlan.plan;
    this.newLinea.tipoEnvio = mySelectedPlan.tipoEnvio;
    this.newLinea.valorUnitario = mySelectedPlan.valorUnitario;
    this.newLinea.valorDescuento = mySelectedPlan.valorDescuento;
    this.newLinea.idContract = this.idContract ; 

    this.newContract.lineas.push({ ...this.newLinea });

    this.portableLines = this.newContract.lineas.filter(line => line.tipoLinea === 'Portabilidad' || line.tipoLinea === 'Portabilidad Con Cesión De Contrato');

    console.log(this.newContract.lineas);

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
      idPlan: NaN, 
      addServices: [], 
      idContract: NaN
    };
  }

  eliminarLinea(index: number) {
    this.newContract.lineas.splice(index, 1);
  }

  adicionarEquipo() {
    this.nuevoEquipo.idContract = this.idContract ; 
    this.newContract.devices.push({ ...this.nuevoEquipo });
    this.nuevoEquipo = {
      equipo: '',
      cantidadInventario: 0,
      cantidad: 0,
      valorEquipo: 0,
      porcentajeDescuento: 0,
      valorDescontado: 0,
      redencionEquipos: '',
      id: NaN, 
      idContract: NaN
    };
  }

  eliminarEquipo(index: number) {
    this.newContract.devices.splice(index, 1);
  }

  calcularMesFinContrato() {

    if (this.newContract.contract.inicioVigencia && this.newContract.contract.mesesContrato > 0) {
      // Convertir la fecha inicial a un objeto Date
      const startDate = new Date(this.newContract.contract.inicioVigencia);

      // Sumar los meses
      const newDate = new Date(startDate.setMonth(startDate.getMonth() + this.newContract.contract.mesesContrato));


      // Asignar la nueva fecha al atributo del componente
      this.newContract.contract.finVigencia = newDate.toDateString();
    }

    this.newContract.contract.inicioVigencia
  }

  calcularTotalCargosServiciosAdicionales() {

    if (!this.aplicaVozAndSMS) {
      return 0;
    }

    return this.vozAndSMSService.cargoBasico ; 

    /** return this.newContract
      .addServices
      .map(a => a.cargoBasico)
      .reduce((a, b) => a + b);*/


  }

  activarVozAndSMS(){

  }

  crearContrato(){
    console.log("crearContrato "); 

    console.log(this.newContract);

  }

  guardarContrato(){
    console.log("GUARDAR"); 
    console.log(this.newContract);

  }

  uploadFile(){

  }

  onFileChange(event: any){

  }

  crearCuentasFacturacion(){
    console.log("crearCuentasFacturacion "); 

  }

  cargarRegistrosMasivos(){
    
  }



}
