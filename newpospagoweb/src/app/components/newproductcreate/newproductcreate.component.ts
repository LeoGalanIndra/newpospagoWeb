import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef, Renderer2, RendererFactory2,ElementRef  } from '@angular/core';
import { NewProductContract } from '../../models/new-product-contract';
import { BillAccount } from '../../models/bill-account';
import { Plan } from '../../models/plan';
import { Variables } from '../../models/variables';

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
import { Portabilidad } from '../../models/portabilidad';
import { CesionContrato } from '../../models/cesion-contrato';

import { ServiceOrder } from '../../models/serviceOrder';

declare let bootstrap: any;



@Component({
  selector: 'app-newproductcreate',
  templateUrl: './newproductcreate.component.html',
  styleUrl: './newproductcreate.component.css'
})
export class NewproductcreateComponent implements OnInit, OnChanges, OnDestroy {


 // @ViewChild('infoContrato', { static: false }) infoContratoTab!: ElementRef;
  @ViewChild('infoCuentaFacturacion', { static: false }) infoCuentaFacturacion!: ElementRef;
  @ViewChild('infoOrdenServicio', { static: false }) infoOrdenServicio!: ElementRef;
  @ViewChild('infoCargueMasivo', { static: false }) infoCargueMasivo!: ElementRef;
  @ViewChild('infoProducto', { static: false }) infoProducto!: ElementRef;
  @ViewChild('infoEquipos', { static: false }) infoEquipos!: ElementRef;
  @ViewChild('infoResumen', { static: false }) infoResumen!: ElementRef;

  selectedLinea: Linea | null = null; // Inicializa como null
  descuentosAdicionales: { tipo: string; porcentaje: number; descripcion: string; mes: string []}[] = []; // Array para almacenar descuentos


  preciosPlanes: { [key: string]: number } = {
    'Plan Tigo Empresarial 6.0': 100,
    'Plan Tigo Empresarial 6.1': 200,
    'Plan Tigo Empresarial 6.2': 300,
    'Plan Tigo Empresarial 6.3': 400,
    'Plan Tigo Empresarial 6.4': 500
  };


   // Propiedades para el formulario
   newPlan1 = {
    plan: '',
    valorUnitario: ''
  };




  get planKeys() {
    return Object.keys(this.preciosPlanes);
  }



  updateValorUnitario() {

    console.log(this.newPlan.plan)

    if (this.newPlan.plan === 'Plan Tigo Empresarial 6.0'){
      this.newPlan.valorUnitario = 10084;
    }

    if (this.newPlan.plan === 'Plan Tigo Empresarial 6.1'){
      this.newPlan.valorUnitario = 15126;
    }

    if (this.newPlan.plan === 'Plan Tigo Empresarial 6.2'){
      this.newPlan.valorUnitario = 19328;
    }

    if (this.newPlan.plan === 'Plan Tigo Empresarial 6.3'){
      this.newPlan.valorUnitario = 25210;
    }

    if (this.newPlan.plan === 'Plan Tigo Empresarial 6.4'){
      this.newPlan.valorUnitario = 29412;
    }
  }

  updateRedencionNO() {

    console.log(this.newPlan.plan)

    if (this.nuevoEquipo.redencionEquipos === 'NO'){
      this.nuevoEquipo.porcentajeDescuento = 0;
      this.nuevoEquipo.porcentajeDescuento = 0;
    }

  }

  variables: Variables =  {
    esCargueMasivo : false,
    hayOrden: false
  }

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
      saldoBolsa: 0,
      finVigencia: null,
      codigoVendedor: NaN,
      valorNoRedimible: 0,
      fechaExpedicion: '',
      tipoDocumentoRepresentanteLegal: '',
      numeroDocumentoRepresentanteLegal: NaN,
      fechaExpedicionRepresentanteLegal: '',
    },
    billAccounts: [],
    discount: {
      esContinuo: false,
      meses: [],
      anio: "",
      mesesAnio: [],
      motivoDescuento: "",
      valorDescuento: 0,
      idContract: NaN
    },
    plans: [],
    lineas: [],
    devices: [],
    orders:[]
  };

  newServiceOrder: ServiceOrder={
      id: 0,
      agreementId: 0,
      billAccountId :0,
      serviceOrder: '',
      durationMonths: 0,
      startDate: '',
      finVigencia:'',
      bagRedemption: 0,
      bagValue: 0,
      discountValue: 0,
      discountReasonId: 0,
      sellerId: '',
      statusOrder:0
     }

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

  cesionContratoLinea : CesionContrato = {
    tipoDocumento: '',
    numeroDocumento: NaN,
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    departamento: '',
    ciudad: '',
  }

  portabilidadLinea : Portabilidad = {
      tipoDocumento: '',
      numeroDocumento: NaN,
      anioExpedicion: NaN,
      fechaExpedicion: '',
      digitoVerificacion: NaN,
      tipoDocumentoRepresentanteLegal: '',
      numeroDocumentoRepresentanteLegal: NaN,
      fechaExpedicionRepresentanteLegal: '',
      tipoTelefoniaActual : '',
      tipoSolicitante : '',
      operadorDonante : '',
      nip : '',
      esFechaCalendarizada : false,
      fechaSugeridaPortacion: '',
      lineaTemporal : '',
      tipoVenta : '',
      imei: '',
      cesionContrato : this.cesionContratoLinea
  }

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
    idContract: NaN,
    nuipValue: '',

    portabilidadInfo: this.portabilidadLinea

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
  documentTypeParam: any | null = null;
  legalNameParam: string | null = null;

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  @ViewChild('sucessModal', { read: ViewContainerRef })
  entrySucess!: ViewContainerRef;
  subSucess!: Subscription;

  enabledPanels: any = {
    billAccount: false,
    massiveLoad: false,
    product: false,
    devices: false,
    ordenServicio: false
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
      this.documentTypeParam = params.get('documentType');
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
    this.newServiceOrder.billAccountId = id.cuentaFacturacion;

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

  nothing() {
   this.variables.esCargueMasivo = true;
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

    this.newLinea.idCuentaFacturacion = mySelectedPlan.cuentaFacturacion ? mySelectedPlan.cuentaFacturacion : mySelectedPlan.idCuentaFacturacion;
    this.newLinea.idPromocionContinuo = mySelectedPlan.idPromocion;
    this.newLinea.motivoDescuento = mySelectedPlan.motivoDescuento;
    this.newLinea.producto = mySelectedPlan.producto;
    this.newLinea.plan = mySelectedPlan.plan;
    this.newLinea.tipoEnvio = mySelectedPlan.tipoEnvio;
    this.newLinea.valorUnitario = mySelectedPlan.valorUnitario;
    this.newLinea.valorDescuento = mySelectedPlan.valorDescuento;
    this.newLinea.valorDescuentoDiscontinuo = this.newContract.discount.valorDescuento ;
    this.newLinea.mesesPersonalizados = this.newContract.discount.mesesAnio ;
    this.newLinea.idContract = this.idContract;

    if (this.newLinea.tipoLinea === 'Portabilidad') {
      this.newLinea.portabilidadInfo!.tipoDocumento = this.documentTypeParam;
      this.newLinea.portabilidadInfo!.numeroDocumento = this.documentNumberParam;
      this.newLinea.portabilidadInfo!.fechaExpedicion = this.newContract.contract.fechaExpedicion;
      this.newLinea.portabilidadInfo!.tipoDocumentoRepresentanteLegal = this.newContract.contract.tipoDocumentoRepresentanteLegal;
      this.newLinea.portabilidadInfo!.numeroDocumentoRepresentanteLegal = this.newContract.contract.numeroDocumentoRepresentanteLegal;
      this.newLinea.portabilidadInfo!.fechaExpedicionRepresentanteLegal = this.newContract.contract.fechaExpedicionRepresentanteLegal;
    }

    if (this.newLinea.tipoLinea === 'Portabilidad Con Cesión De Contrato') {
      let cesionContrato: CesionContrato = {
        tipoDocumento: this.documentTypeParam,
        numeroDocumento: this.documentNumberParam,
        nombre: this.legalNameParam ? this.legalNameParam : '',
        apellido: 'prueba',
        email: 'test@gmail.com',
        direccion: 'Cra 7ma # 11 -1',
        departamento: 'Valle del Cauca',
        ciudad: 'Cali'
      }
      this.newLinea.portabilidadInfo!.cesionContrato = cesionContrato;
    }

    this.newContract.lineas.push({ ...this.newLinea });

    this.portableLines = this.newContract.lineas.filter(line => line.tipoLinea === 'Portabilidad' || line.tipoLinea === 'Portabilidad Con Cesión De Contrato');

    console.log(this.newContract.lineas);

    this.cesionContratoLinea = {
        tipoDocumento: '',
        numeroDocumento: NaN,
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        departamento: '',
        ciudad: '',
    }

    this.portabilidadLinea = {
        tipoDocumento: '',
        numeroDocumento: NaN,
        anioExpedicion: NaN,
        fechaExpedicion: '',
        digitoVerificacion: NaN,
        tipoDocumentoRepresentanteLegal: '',
        numeroDocumentoRepresentanteLegal: NaN,
        fechaExpedicionRepresentanteLegal: '',
        tipoTelefoniaActual : '',
        tipoSolicitante : '',
        operadorDonante : '',
        nip : '',
        esFechaCalendarizada : false,
        fechaSugeridaPortacion: '',
        lineaTemporal : '',
        tipoVenta : '',
        imei: '',
        cesionContrato : this.cesionContratoLinea
    }

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
      idContract: NaN,
      nuipValue: '',
      portabilidadInfo: this.portabilidadLinea
    };
  }

  aceptarFechas(): void {
    // Aquí puedes realizar cualquier lógica adicional que necesites
    console.log('Meses seleccionados:', this.newContract.discount.meses);
    console.log('Año seleccionado:', this.newContract.discount.anio);
    for (let i = 0; i < this.newContract.discount.meses.length; i++) {
      this.newContract.discount.mesesAnio?.push(this.newContract.discount.meses[i] + "-" + this.newContract.discount.anio);
    }
    this.newContract.discount.meses = [];
    this.newContract.discount.anio = "";
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

    //this.newContract.contract.saldoBolsa = this.newContract.contract.valorBolsa - this.calcularTotalValorEquipos();
    this.newContract.contract.saldoBolsa = -1; //Todo: Hacer cálculo nuevo de acuerdo a nuevo
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
    // Verificar que el tipo de contrato sea 'Negociado'
    if (this.newContract.contract.tipoContrato === 'Negociado') {
        // Comprobar que se ha definido una fecha de inicio y una duración válida
        if (this.newServiceOrder.startDate && this.newServiceOrder.durationMonths > 0) {
            // Convertir la fecha de inicio a un objeto Date
            const startDate = new Date(this.newServiceOrder.startDate);
            // Sumar los meses de duración a la fecha de inicio
            const newDate = new Date(startDate.setMonth(startDate.getMonth() + this.newServiceOrder.durationMonths));
            // Asignar la fecha calculada a finVigencia
            this.newServiceOrder.finVigencia = newDate.toDateString();
          }
        } else {
            console.log("Duración no válida; se usa duración predeterminada de 12 meses");
            // Asignar una duración predeterminada de 12 meses si no se especifica duración válida
            this.newServiceOrder.durationMonths = 12;
            const startDate = new Date(this.newServiceOrder.startDate);
            const newDate = new Date(startDate.setMonth(startDate.getMonth() + this.newServiceOrder.durationMonths));
            this.newServiceOrder.finVigencia = newDate.toDateString();
        }
    }


  calcularTotalCargosServiciosAdicionales() {

    if (!this.aplicaVozAndSMS) {
      return 0;
    }

    return this.vozAndSMSService.cargoBasico;

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

  changeEsFechaCalendarizada(){

  }

  crearContrato() {
    console.log("crearContrato ");

    console.log(this.newContract);

    this.newContract.contract.idAccount = this.idAccountParam ? this.idAccountParam : "-1";

    if (this.newContract.discount.mesesAnio!.length > 0) {
      this.newContract.discount.idContract = this.idContract;
    }

    this.contractService.saveNewContract(this.newContract);

    this.contractService.printDatasource();

    //this.enabledPanels.billAccount = false;

    if (this.newContract.contract.tipoContrato === 'Estandar' ){
      this.enabledPanels.billAccount = false;
    }

    if (this.newContract.contract.tipoContrato === 'Negociado' ){
      this.enabledPanels.serviceOrder = false;
    }


  }



  guardarContrato() {
    console.log("GUARDAR");
    console.log(this.newContract);

  }

  uploadFile() {

    this.variables.esCargueMasivo = true;

  }

  onFileChange(event: any) {

  }

  crearCuentasFacturacion() {
    console.log("crearCuentasFacturacion ");

    this.contractService.saveNewContract(this.newContract);

    this.contractService.printDatasource();

    this.newContract.billAccounts = this.contractService.getBillAccountsByIdContract(this.newContract.contract.idContract);

    this.enabledPanels.massiveLoad = false;

      // Llama al método para mostrar la ventana modal informativa
      //this.createModalInformativo(2);

  }

  cargarRegistrosMasivos() {
    this.enabledPanels.product = false;

  }

  guardarProducto() {
    console.log("crear productos y lineas  ");

    this.contractService.saveNewContract(this.newContract);

    this.contractService.printDatasource();

    this.enabledPanels.devices = false;
    // Llama al método para mostrar la ventana modal informativa
    //this.createModalInformativo(4);
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
          // Llama al método para mostrar la ventana modal informativa
          //this.createModalInformativo(5);
  }

  activarContrato() {

    this.newContract.contract.estado = "EN EJECUCION";
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

//mrmelor
orders: ServiceOrder [] = [];

saveOrder(){

  this.newServiceOrder.agreementId = this.newContract.contract.idContract;
  this.newServiceOrder.id = this.newServiceOrder.id + 1;
  this.newServiceOrder.billAccountId = this.selectedBillAccount.cuentaFacturacion; //se cambia orden de pestañas, ahora se debe actualizar cuando se seleccione la cuenta

  console.log("this.selectedBillAccount");
  console.log(this.selectedBillAccount);

  if (this.newContract.contract.tipoContrato === 'Estandar'){
    this.newServiceOrder.serviceOrder = this.newServiceOrder.id.toString();
  }


  this.orders.push({... this.newServiceOrder})
  this.variables.hayOrden = false;

    console.log(this.newServiceOrder);
    console.log(this.orders);

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
        body: 'A continuación, se guardará la información de los equipos a redimir y/o a comprar. \nEsta usted seguro de continuar?',

      },
      {
        id: 6,
        title: 'Activación del producto.',
        body: 'A continuación, se iniciará el proceso de activación de productos y líneas. \nEsta usted seguro de continuar?',

      },
      {
        id: 7,
        title: 'Ordenes de Servicio.',
        body: 'A continuación, se guardará información de las órdenes de servicio \nEsta usted seguro de continuar?',

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
            if (this.newContract.contract.tipoContrato==='Estandar'){
              this.saveOrder();
            }
            // Llama al método para mostrar la ventana modal informativa
            this.createModalInformativo(1);
            let tabElement: any;
            if (this.newContract.contract.tipoContrato==='Estandar'){

              tabElement = new bootstrap.Tab(this.infoCuentaFacturacion.nativeElement);
            }
            if (this.newContract.contract.tipoContrato==='Negociado'){
              tabElement = new bootstrap.Tab(this.infoOrdenServicio.nativeElement);
            }
            tabElement.show();
          }

          if (option === 2) {
            this.crearCuentasFacturacion();
            this.createModalInformativo(2);
            let tabElement: any;

            tabElement = new bootstrap.Tab(this.infoProducto.nativeElement);
            tabElement.show();
          }

          if (option === 3) {
            this.cargarRegistrosMasivos();

            //this.createModalInformativo(2);
            let tabElement: any;
            tabElement = new bootstrap.Tab(this.infoEquipos.nativeElement);
            tabElement.show();
          }

          if (option === 4) {
            this.guardarProducto()

            this.createModalInformativo(4);
            let tabElement: any;
            if (this.newContract.billAccounts.length>0) {
              tabElement = new bootstrap.Tab(this.infoEquipos .nativeElement);
            }

            if (this.newContract.billAccounts.length==0) {
              tabElement = new bootstrap.Tab(this.infoCargueMasivo.nativeElement);
            }

            tabElement.show();

          }

          if (option === 5) {

            this.guardarEquipos();

            this.createModalInformativo(5);
            let tabElement: any;
            tabElement = new bootstrap.Tab(this.infoResumen.nativeElement);
            tabElement.show();
          }

          if (option === 6) {
            this.activarContrato()

          }

          if (option === 7) {
            this.saveOrder();
            let tabElement: any;
            tabElement = new bootstrap.Tab(this.infoCuentaFacturacion.nativeElement);
            tabElement.show();

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

    //mrmelor
    formatCurrency(value: number): string {
      return value.toLocaleString('en-US',
        { style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
           maximumFractionDigits: 2 });
    }

  // Maneja la entrada del usuario
  onInput(event: Event, campo: string): void{
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      // Extrae solo los números del valor ingresado
      let value = inputElement.value.replace(/[^0-9.]/g, '');
      // Convierte el valor a número
      const numberValue = parseFloat(value) || 0;
      console.log("campo = " + campo);
      console.log( numberValue );
      console.log( "valor formateado" + this.formatCurrency(numberValue));

      if (campo ==="valorUnitario"){
        // Actualiza el modelo
        //this.newContract.contract.valorBolsa = numberValue;
        inputElement.value = this.formatCurrency(this.newPlan.valorUnitario);
      }
      if (campo ==="valorBolsa"){
          // Actualiza el modelo
          //this.newContract.contract.valorBolsa = numberValue;
          //inputElement.value = this.formatCurrency(this.newContract.contract.valorBolsa);
        }
      if (campo ==="saldo"){
          // Actualiza el modelo
          //this.newContract.contract.saldo = numberValue;
          //inputElement.value = this.formatCurrency(this.newContract.contract.saldo);
        }
           }
  }

    // Opcional: formatea el valor al salir del campo
    onBlur(event: Event,campo: string) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement) {
        if (campo ==="ValorUnitario"){
            inputElement.value = this.formatCurrency(this.newPlan.valorUnitario);
          }
        if (campo ==="valorBolsa"){
          //inputElement.value = this.formatCurrency(this.newContract.contract.valorBolsa);
          inputElement.value ="-1";
        }
        if (campo ==="saldo"){
          //inputElement.value = this.formatCurrency(this.newContract.contract.saldo);
          inputElement.value = "-1";
        }
      }
    }

    updateValue(value: string) {
      const numericValue = value.replace(/[^0-9.]/g, '');
      this.newPlan.valorUnitario = parseFloat(numericValue);
    }

  createModalInformativo(option: number) {

    let functionMapper = [
      {
        id: 1,
        title: 'Creación de contrato',
        body: 'Contrato creado con éxito',

      },
      {
        id: 2,
        title: 'Creación de cuentas de facturación',
        body: 'Cuenta de facturación creada con éxito',

      },
      {
        id: 3,
        title: 'Cargue Masivo de líneas',
        body: 'A continuación, se cargará un archivo Excel el cual contiene la configuración del producto y líneas. \nEsta usted seguro de continuar?',

      },
      {
        id: 4,
        title: 'Configuración del producto',
        body: 'Producto configurado con éxito',

      },
      {
        id: 5,
        title: 'Redención de equipos',
        body: 'Equipos redimidos con éxito',

      },
      {
        id: 6,
        title: 'Activación del producto.',
        body: 'Proceso de Activación Iniciado con éxito',

      }
    ];

    let myOptionObject = functionMapper.find(opt => opt.id === option);


    console.log("create modal informativo");
    this.sub = this.modalService
      .openAcceptModal(this.entry,
        myOptionObject?.title ? myOptionObject?.title : 'Confirmación del proceso',
        myOptionObject?.body ? myOptionObject.body : 'Desea continuar?')
      .subscribe((v1) => {
        //your logic
        console.log("your logic");
        console.log(v1);
        if (v1 === 'accept') {

          if (option === 10) {
            //this.crearContrato();
            let tabElement: any;
            tabElement = new bootstrap.Tab(this.infoOrdenServicio.nativeElement);
            tabElement.show();
          }

        }

      });
  }

  initContract(idContract : any ){

    let contract = this.contractService.getContractsByIdContract(idContract)[0];
    let billAccounts = this.contractService.getBillAccountsByIdContract(idContract);
    let discount = this.contractService.getDiscountByIdContract(idContract)[0];
    let plans = this.contractService.getProductsByIdContract(idContract);
    let lineas = this.contractService.getLinesByIdContract(idContract);
    let devices = this.contractService.getDevicesByIdContract(idContract);
   // let orders = this.contractService.  .contractService.getServiceOrderByIdContract(idContract);
    //this.contractService.getDevicesByIdContract(idContract);//temporal, mrmrlor se necesita corregir


    this.newContract = {
      contract: contract ,
      billAccounts: billAccounts,
      discount: discount,
      plans: plans,
      lineas: lineas,
      devices: devices,
      orders: []
    };


    this.enabledPanels = {
      billAccount: (!(billAccounts.length > 0 )),
      massiveLoad: (!(plans.length > 0)),
      product: (!(plans.length > 0)),
      devices: (!(devices.length > 0 )),
      ordenServicio: !this.variables.hayOrden
    };


  }

  isNewPlanEmpty(): boolean {

    console.log("Entra a isNewPlanEmpty()");
    console.log(this.newPlan);
    console.log(this.newPlan.tipoProducto);

    return this.newPlan.tipoProducto.trim() !== '';
  }

    // Método para seleccionar una línea basada en el imsi
    selectLineaByImsi(imsi: number): void {
      this.selectedLinea = this.newContract.lineas.find(linea => linea.imsi === imsi) || null;
    }


  openModal(): void {

    const modalElement = document.getElementById('verDetalleLineaNegociadoModal');
    if (modalElement) {

        this.buscarDescuentosAdicionales();

      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Método para obtener descuentos adicionales según el IMSI
  buscarDescuentosAdicionales() {
    console.log("buscarDescuentosAdicionales - Inicio");
    const descuento = this.newContract;

    if (descuento) {
        // Obtener el valorDescuentoDiscontinuo y mesesPersonalizados
        if (descuento.discount) {
            const meses = descuento.discount.meses || [];
            for (const mes of meses) {
              console.log("Guardar descuento");
                this.descuentosAdicionales.push({
                    tipo:  'Descuento Discontinuo',
                    porcentaje: descuento.discount.valorDescuento,
                    descripcion: descuento.discount.motivoDescuento,
                    mes: descuento.discount.meses
                });
            }
        }
    }
    console.log("buscarDescuentosAdicionales - Fin");
}

}
