import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NewProductContract } from '../../models/new-product-contract';
import { BillAccount } from '../../models/bill-account';
import { Plan } from '../../models/plan';
import { AddServices } from '../../models/add-services';
import { Linea } from '../../models/linea';
import { Device } from '../../models/device';
import { ActivatedRoute, Router } from '@angular/router';
import { Tax } from '../../models/tax';
import { CustomerConstractsService } from '../../services/customer-constracts.service';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';
import { ModalService } from '../../services/modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-newproductcreate',
  templateUrl: './newproductcreate.component.html',
  styleUrl: './newproductcreate.component.css'
})
export class NewproductcreateComponent implements OnInit, OnChanges, OnDestroy {

  idContract: number = NaN;

  newContract: NewProductContract = {
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
    cuentaFacturacion: null,
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

  aplicaVozAndSMS: boolean = true;

  ivaTax: Tax = {
    id: 0,
    name: 'IVA',
    value: 0.19
  }

  selectedBillAccount: BillAccount = {
    cicloFacturacion: NaN,
    cuentaFacturacion: NaN,
    fechaCreacion: '',
    id: NaN,
    idContract: this.idContract,
    idBill: -1,
  }

  inventarios: Inventory[] = [];
  inventarioSeleccionado?: Inventory;
  deviceSelected: string | null = null;

  selectedPlanId: number | null = null;

  idAccountParam: string | null = null;
  idContractParam: any | null = null;
  documentNumberParam: any | null = null;
  legalNameParam: string | null = null;

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  @ViewChild('sucessModal', { read: ViewContainerRef })
  entrySucess!: ViewContainerRef;
  subSucess!: Subscription;

  enabledPanels: any = {
    billAccount: true,
    massiveLoad: true,
    product: true,
    devices: true,

  };

  constructor(private route: ActivatedRoute,
    private contractService: CustomerConstractsService,
    private inventarioService: InventoryService,
    private modalService: ModalService,
    private router: Router) {

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

    this.newContract.contract.estado = this.idContractParam == "-1" ? 'PENDIENTE' : '';

    if(this.idContractParam != "-1"){
      this.initContract(this.idContractParam);
    }       

    this.idContract = this.idContractParam == "-1" ? (Math.floor(100000000 + Math.random() * 900000000)) : this.idContractParam;

    this.newContract.contract.idContract = this.idContract;


    this.adicionarServicioAdicionalDefault();

    this.inventarios = this.inventarioService.getInventarios();




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
      fechaCreacion: '',
      idBill: -1
    };

    this.newContract.billAccounts.push({ ...newBillAccount });

  }

  eliminarCuenta(index: number) {
    this.newContract.billAccounts.splice(index, 1);
  }

  selectAccount(id: BillAccount) {
    let selectedAccountId = id.id;
    this.selectedBillAccount = id;
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
    let cuentaFacturacionValue = this.selectedBillAccount.cuentaFacturacion;

    this.newPlan.idCuentaFacturacion = idCuentaFacturacion ? idCuentaFacturacion : NaN;
    this.newPlan.valorUnitario += this.calcularTotalCargosServiciosAdicionales();
    this.newPlan.vozAndSMS = this.aplicaVozAndSMS ? this.vozAndSMSService : null;
    this.newPlan.cuentaFacturacion = cuentaFacturacionValue;
    this.newPlan.idContract = this.idContract;

    this.newContract.plans.push({ ...this.newPlan });

    this.showedPlans = this.newContract.plans.filter(c => c.idCuentaFacturacion === idCuentaFacturacion);

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
    this.showedPlans = this.newContract.plans.filter(c => c.idCuentaFacturacion === this.selectedBillAccount.id);
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

    this.newLinea.idCuentaFacturacion = mySelectedPlan.idCuentaFacturacion;
    this.newLinea.idPromocion = mySelectedPlan.idPromocion;
    this.newLinea.motivoDescuento = mySelectedPlan.motivoDescuento;
    this.newLinea.producto = mySelectedPlan.producto;
    this.newLinea.plan = mySelectedPlan.plan;
    this.newLinea.tipoEnvio = mySelectedPlan.tipoEnvio;
    this.newLinea.valorUnitario = mySelectedPlan.valorUnitario;
    this.newLinea.valorDescuento = mySelectedPlan.valorDescuento;
    this.newLinea.idContract = this.idContract;

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
    this.nuevoEquipo.idContract = this.idContract;
    this.nuevoEquipo.id = (Math.floor(100000000 + Math.random() * 900000000));

    this.nuevoEquipo.equipo = this.inventarioSeleccionado?.name ? this.inventarioSeleccionado?.name : '';
    this.nuevoEquipo.valorEquipo = this.inventarioSeleccionado?.precioUnitario ? this.inventarioSeleccionado?.precioUnitario : 0;

    this.nuevoEquipo.valorDescontado = (this.nuevoEquipo.cantidad * this.nuevoEquipo.valorEquipo * (this.nuevoEquipo.porcentajeDescuento / 100));

    this.newContract.devices.push({ ...this.nuevoEquipo });

    this.newContract.contract.saldo = this.newContract.contract.valorBolsa - this.calcularTotalValorEquipos();
    this.newContract.contract.valorNoRedimible = this.calcularTotalValorEquiposNoRedimible();

    this.deviceSelected = '';

    this.inventarioSeleccionado = { cantidad: 0, name: '', precioTotal: 0, precioUnitario: 0 };

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

    return this.vozAndSMSService.cargoBasico;

    /** return this.newContract
      .addServices
      .map(a => a.cargoBasico)
      .reduce((a, b) => a + b);*/


  }

  calcularTotalValorEquipos(): number {

    return this.newContract
      .devices
      .map(a => {

        return a.redencionEquipos === 'SI' ? a.cantidad * a.valorEquipo * (1 - (a.porcentajeDescuento / 100)) : 0;
      })
      .reduce((a, b) => a + b);
  }

  calcularTotalValorEquiposNoRedimible(): number {

    return this.newContract
      .devices
      .map(a => {

        return a.redencionEquipos === 'SI' ? a.cantidad * a.valorEquipo * ((a.porcentajeDescuento / 100)) : (a.cantidad * a.valorEquipo);
      })
      .reduce((a, b) => a + b);
  }

  activarVozAndSMS() {

  }

  crearContrato() {
    console.log("crearContrato ");

    console.log(this.newContract);

    this.newContract.contract.idAccount = this.idAccountParam ? this.idAccountParam : "-1";

    if (this.newContract.discount.meses.length > 0) {
      this.newContract.discount.idContract = this.idContract;
    }


    this.contractService.saveNewContract(this.newContract);

    this.contractService.printDatasource();

    this.enabledPanels.billAccount = false;

  }

  guardarContrato() {
    console.log("GUARDAR");
    console.log(this.newContract);

  }

  uploadFile() {

  }

  onFileChange(event: any) {

  }

  crearCuentasFacturacion() {
    console.log("crearCuentasFacturacion ");

    this.contractService.saveNewContract(this.newContract);

    this.contractService.printDatasource();

    this.newContract.billAccounts = this.contractService.getBillAccountsByIdContract(this.newContract.contract.idContract);

    this.enabledPanels.massiveLoad = false;

  }

  cargarRegistrosMasivos() {
    this.enabledPanels.product = false;

  }

  guardarProducto() {
    console.log("crear productos y lineas  ");

    this.contractService.saveNewContract(this.newContract);

    this.contractService.printDatasource();

    this.enabledPanels.devices = false;

  }

  onSeleccionarEquipo(event: Event): void {
    // const nombreEquipo = (event.target as HTMLSelectElement).value;
    console.log(this.deviceSelected);
    // console.log(nombreEquipo); 
    this.inventarioSeleccionado = this.inventarios.find(inventario => inventario.name === this.deviceSelected);
    console.log(this.inventarioSeleccionado);
  }

  guardarEquipos() {
    this.contractService.saveNewContract(this.newContract);

    this.contractService.printDatasource();
  }

  activarContrato() {

    this.newContract.contract.estado = "EN ALISTAMIENTO";
    this.contractService.saveNewContract(this.newContract);

    this.contractService.printDatasource();

    this.subSucess = this.modalService
      .openSuccessModal(this.entrySucess,
        'Activación Contrato',
        'Se procede a activar la nueva oferta.')

      .subscribe((v) => {
        //your logic   
        this.router.navigate(['/']);
      });

  }

  createModal(option: number) {

    let functionMapper = [
      {
        id: 1,
        title: 'Creación de contrato',
        body: 'A continuación, se guardara la información asociada al contrato. \nEsta usted seguro de continuar?',

      },
      {
        id: 2,
        title: 'Creación de cuentas de facturación',
        body: 'A continuación, se crearán las cuentas de facturación ingresadas. \nEsta usted seguro de continuar?',

      },
      {
        id: 3,
        title: 'Cargue Masivo de líneas',
        body: 'A continuación, se cargará un archivo Excel el cual contiene la configuración del producto y líneas. \nEsta usted seguro de continuar?',

      },
      {
        id: 4,
        title: 'Configuración del producto',
        body: 'A continuación, se guardará la información de la configuración del producto y líneas. \nEsta usted seguro de continuar?',

      },
      {
        id: 5,
        title: 'Redención de equipos',
        body: 'A continuación, se guardará la información de los equipos a redimir y a comprar. \nEsta usted seguro de continuar?',

      },
      {
        id: 6,
        title: 'Activación del producto.',
        body: 'A continuación, se iniciará el proceso de activación de productos y líneas. \nEsta usted seguro de continuar?',

      }
    ];

    let myOptionObject = functionMapper.find(opt => opt.id === option);


    console.log("create modal");
    this.sub = this.modalService
      .openModal(this.entry,
        myOptionObject?.title ? myOptionObject?.title : 'Confirmación del proceso',
        myOptionObject?.body ? myOptionObject.body : 'Desea continuar?')

      .subscribe((v) => {
        //your logic

        if (v === 'confirm') {

          if (option === 1) {
            this.crearContrato();
          }

          if (option === 2) {
            this.crearCuentasFacturacion();
          }

          if (option === 3) {
            this.cargarRegistrosMasivos();
          }

          if (option === 4) {
            this.guardarProducto()
          }

          if (option === 5) {

            this.guardarEquipos();
          }

          if (option === 6) {
            this.activarContrato()

          }

        }

      });
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();

    if (this.subSucess)
      this.subSucess.unsubscribe();
  }


  initContract(idContract : any ){

    let contract = this.contractService.getContractsByIdContract(idContract)[0]; 
    let billAccounts = this.contractService.getBillAccountsByIdContract(idContract);
    let discount = this.contractService.getDiscountByIdContract(idContract)[0]; 
    let plans = this.contractService.getProductsByIdContract(idContract); 
    let lineas = this.contractService.getLinesByIdContract(idContract); 
    let devices = this.contractService.getDevicesByIdContract(idContract); 


    this.newContract = {
      contract: contract ,
      billAccounts: billAccounts,
      discount: discount,
      plans: plans,
      lineas: lineas,
      devices: devices
  
    };
    

  }





}
