import { Component, OnInit } from '@angular/core';
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
      valorNoRedimible: 0,
    },
    billAccounts: [],
    discount: {
      meses: [],
      motivoDescuento: "",
      valorDescuento: 0
    },
    plans: [],
    lineas: [],
    devices: [],
    addServices: [],

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

    idPlan: NaN
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
    id: NaN
  };

  addService: AddServices = {
    cargoBasico: NaN,
    descuento: NaN,
    idPlan: NaN,
    tipo: '',


  };

  ivaTax: Tax = {
    id : 0, 
    name: 'IVA', 
    value: 0.19 
  }

  selectedAccountId: number | null = null;

  selectedPlanId: number | null = null;

  idAccountParam: any | null = null;
  idContractParam: any | null = null;
  documentNumberParam: any | null = null;
  legalNameParam: string | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) {

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

  selectAccount(id: number) {
    this.selectedAccountId = id;
    this.showedPlans = this.newContract.plans.filter(c => c.idCuentaFacturacion === this.selectedAccountId);
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

    let idCuentaFacturacion = this.selectedAccountId;

    this.newPlan.idCuentaFacturacion = idCuentaFacturacion ? idCuentaFacturacion : NaN;
    this.newPlan.valorUnitario += this.calcularTotalCargosServiciosAdicionales();

    this.newContract.plans.push({ ...this.newPlan });

    this.showedPlans = this.newContract.plans.filter(c => c.idCuentaFacturacion === this.selectedAccountId);

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
      tipoEnvio: ''
    };
  }

  eliminarPlan(index: number) {

    this.newContract.plans.splice(index, 1);
    this.showedPlans = this.newContract.plans.filter(c => c.idCuentaFacturacion === this.selectedAccountId);
  }

  adicionarServicioAdicional() {
    this.newContract.addServices.push({ ... this.addService });

    let addServiceId = this.addService.idPlan + 1;

    this.addService = {
      cargoBasico: 0,
      descuento: 0,
      idPlan: addServiceId,
      tipo: '',

    };
  }

  adicionarServicioAdicionalDefault() {

    this.addService = {
      cargoBasico: 10000,
      descuento: 0,
      idPlan: 1,
      tipo: 'voz-sms',

    };

    this.newContract.addServices.push({ ... this.addService });

    this.addService = {
      cargoBasico: 0,
      descuento: 0,
      idPlan: 2,
      tipo: '',

    };
  }

  eliminarServicioAdicional(index: number) {
    this.newContract.addServices.splice(index, 1);
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

    if (this.newContract
      .addServices.length == 0) {
      return 0;
    }

    return this.newContract
      .addServices
      .map(a => a.cargoBasico)
      .reduce((a, b) => a + b);


  }


}
