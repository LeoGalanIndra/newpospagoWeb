import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerConstractsService } from '../../services/customer-constracts.service';
import { InventoryService } from '../../services/inventory.service';
import { ModalService } from '../../services/modal/modal.service';
import { NewProductContract } from '../../models/new-product-contract';
import { Tax } from '../../models/tax';
import { Linea } from '../../models/linea';
import { Plan } from '../../models/plan';
import { AddServices } from '../../models/add-services';
import { Discount } from '../../models/discount';

@Component({
  selector: 'app-newproductdetail',
  templateUrl: './newproductdetail.component.html',
  styleUrl: './newproductdetail.component.css'
})
export class NewproductdetailComponent implements OnInit {

  idAccountParam: string | null = null;
  idContractParam: any | null = null;
  documentNumberParam: any | null = null;
  legalNameParam: string | null = null;

  newContract?: NewProductContract = {
    contract: {
      idAccount: '',
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
      esContinuo: false , 
      meses: [],
      motivoDescuento: "",
      valorDescuento: 0,
      idContract: NaN
    },
    plans: [],
    lineas: [],
    devices: []

  };

  ivaTax: Tax = {
    id: 0,
    name: 'IVA',
    value: 0.19
  };

  portableLines: Linea[] = [];

  plans: Plan[] = [];

  selectedLinea: Linea[] = [];

  editedLinea: Linea = {
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
    idContract: NaN,
    nuipValue: '' ,



  };

  selectedAction: string = '';

  msisdn: number | null = null;


  msisdnPortability: number | null = null;

  msisdnManagement: number | null = null;

  failedType: string = '';

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
    cuentaFacturacion: null,
    idContract: NaN
  };

  vozAndSMSService: AddServices = {
    cargoBasico: 10000,
    descuento: 0,
    idPlan: 1,
    tipo: 'VozAndSMS',
  };

  addService: AddServices = {
    cargoBasico: NaN,
    descuento: NaN,
    idPlan: NaN,
    tipo: '',


  };

  aplicaVozAndSMS: boolean = true;

  discount: Discount = {
    esContinuo: false , 
    meses: [],
    motivoDescuento: "",
    valorDescuento: 0,
    idContract: NaN
  };

  massiveDiscount: Discount = {
    esContinuo: true , 
    meses: [],
    motivoDescuento: "Descuento por volumen",
    valorDescuento: 8,
    idContract: NaN
  };

  promotionDiscount: Discount = {
    esContinuo: true , 
    meses: [],
    motivoDescuento: "Primer año del Nuevo Pospago B2B",
    valorDescuento: 9,
    idContract: NaN
  };

  massiveDiscreteDiscount: Discount = {
    esContinuo: false , 
    meses: ['ENE','JUN', 'AGO'],
    motivoDescuento: "",
    valorDescuento: 30,
    idContract: NaN
  };

  promotionDiscreteDiscount: Discount = {
    esContinuo: false , 
    meses: ['FEB','JUL', 'OCT'],
    motivoDescuento: "",
    valorDescuento: 5,
    idContract: NaN
  };

  constructor(private route: ActivatedRoute,
    private contractService: CustomerConstractsService,
    private router: Router) {

  }

  ngOnInit(): void {


    this.route.queryParamMap.subscribe(params => {

      console.log("recieve: " + params.get('documentNumber'));

      this.idAccountParam = params.get('idAccount');
      this.idContractParam = params.get('idContract');
      this.documentNumberParam = params.get('documentNumber');
      this.legalNameParam = params.get('legalName');

    });


    this.initContract(this.idContractParam);


    console.log("contract  ");
    console.log(this.newContract);


  }

  initContract(idContract: any) {

    this.contractService.printDatasource();

    console.log("contract id  ");
    console.log(idContract);

    let contract = this.contractService.getContractsByIdContract(idContract)[0];
    let billAccounts = this.contractService.getBillAccountsByIdContract(idContract);
    this.discount = this.contractService.getDiscountByIdContract(idContract)[0];
    this.plans = this.contractService.getProductsByIdContract(idContract);
    let lineas = this.contractService.getLinesByIdContract(idContract);
    let devices = this.contractService.getDevicesByIdContract(idContract);

    if(contract.tipoContrato==='Estandar'){

      lineas.forEach(
        c => {
          c.valorDescuentoPromocionContinuo = this.promotionDiscount.valorDescuento ; 
          c.valorDescuentoPromocionDiscontinuo = 0 ; 
          c.valorDescuentoVolumenContinuo = 0 ; 
          c.valorDescuentoVolumenDiscontinuo = 0 ; 
          c.valorTotal = c.valorDescuentoPromocionContinuo + (c.valorDescuento ? c.valorDescuento : 0 );
        }
      ); 

    }

    if(contract.tipoContrato==='Negociado'){

      lineas.forEach(
        c => {
          c.valorDescuentoPromocionContinuo = 0 ; 
          c.valorDescuentoPromocionDiscontinuo = 0 ; 
          c.valorDescuentoVolumenContinuo = this.massiveDiscount.valorDescuento ; 
          c.valorDescuentoVolumenDiscontinuo = 0 ; 
          c.valorTotal = c.valorDescuentoVolumenContinuo + (c.valorDescuento ? c.valorDescuento : 0 );
        }
      );
      
    }

    this.newContract = {
      contract: contract,
      billAccounts: billAccounts,
      discount: this.discount,
      plans: this.plans,
      lineas: lineas,
      devices: devices

    };

    console.log("Contract Info ");
    console.log(this.newContract);

  }

  consultarLinea() {

    console.log("MSISDN: ");
    console.log(this.msisdn);

    this.selectedLinea = this.newContract ?
      this.newContract
        .lineas
        .filter(c =>
          c.numeroLinea == this.msisdn) : [];

  }

  consultarPortabilidad() {

    console.log("MSISDN: ");
    console.log(this.msisdnPortability);

    this.portableLines = this.newContract ?
      this.newContract
        .lineas
        .filter(c =>
        ((c.tipoLinea === "Portabilidad" ||
          c.tipoLinea === "Portabilidad Con Cesión De Contrato")
          && c.numeroLinea === this.msisdnPortability)) : [];

  }

  consultarFallos() {

  }

  ejecutarServicio() {

    console.log("Id Contract:  " + this.idContractParam);

    if (this.selectedAction === 'changeBillAccount') {
      this.router.navigate(['/changebillaccount']);

    } else {
      this.router.navigate(['/createproduct'], {
        queryParams: {
          idAccount: this.idAccountParam,
          idContract: this.idContractParam,
          documentNumber: this.documentNumberParam,
          legalName: this.legalNameParam
        }
      });

    }

  }

  consultarGestionLinea() {

    console.log("MSISDN: ");
    console.log(this.msisdnManagement);


    let searchLines = this.newContract ?
      this.newContract
        .lineas
        .filter(c =>
          c.numeroLinea === this.msisdnManagement) : [];


    this.editedLinea = searchLines.length > 0 ? searchLines[0] : this.editedLinea;

    let searchPlan = this.newContract ? this.newContract.plans.filter(c => c.idPlan === this.editedLinea.idPlan && c.idContract === this.editedLinea.idContract) : [];

    this.newPlan = searchPlan.length > 0 ? searchPlan[0] : this.newPlan;

  }

  activarVozAndSMS() {

  }

  adicionarServicioAdicional() {
    this.editedLinea.addServices.push({ ... this.addService });

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
    this.editedLinea.addServices.splice(index, 1);
  }



}
