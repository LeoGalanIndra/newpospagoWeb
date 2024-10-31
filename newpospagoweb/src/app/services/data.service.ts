import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Contrato } from '../models/contrato';
import { NewProductContract } from '../models/new-product-contract';
import { BillAccount } from '../models/bill-account';
import { Discount } from '../models/discount';
import { Linea } from '../models/linea';
import { Device } from '../models/device';
import { Plan } from '../models/plan';

import { ServiceOrder } from '../models/serviceOrder';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static customers: Customer[] = [];
  private static contracts: Contrato[] = [];


  private static billAccounts: BillAccount[] = [];
  private static discounts: Discount[] = [];
  private static plans: Plan[] = [];
  private static lineas: Linea[] = [];
  private static devices: Device[] = [];

  private static servicesOrders: ServiceOrder[] = [];

  constructor() {
    this.randomCustomer();
    this.randomContracts();
    this.printDatasource();
  }

  // Método para inicializar los datos
  private randomCustomer(): void {
    // Generación de 20 customers
    DataService.customers = [
      { idAccount: "1", documentType: 'NIT', documentNumber: 12345678, legalName: 'Empresa Uno' },
      { idAccount: "2", documentType: 'NIT', documentNumber: 87654321, legalName: 'Empresa Dos' },
      { idAccount: "3", documentType: 'CC', documentNumber: 23456789, legalName: 'Empresa Tres' },
      { idAccount: "4", documentType: 'NIT', documentNumber: 98765432, legalName: 'Empresa Cuatro' },
      { idAccount: "5", documentType: 'CE', documentNumber: 34567890, legalName: 'Empresa Cinco' },
      { idAccount: "6", documentType: 'CC', documentNumber: 45678901, legalName: 'Empresa Seis' },
      { idAccount: "7", documentType: 'NIT', documentNumber: 12389045, legalName: 'Empresa Siete' },
      { idAccount: "8", documentType: 'CE', documentNumber: 56789012, legalName: 'Empresa Ocho' },
      { idAccount: "9", documentType: 'CC', documentNumber: 67890123, legalName: 'Empresa Nueve' },
      { idAccount: "10", documentType: 'NIT', documentNumber: 78901234, legalName: 'Empresa Diez' },
      { idAccount: "11", documentType: 'CE', documentNumber: 89012345, legalName: 'Empresa Once' },
      { idAccount: "12", documentType: 'CC', documentNumber: 90123456, legalName: 'Empresa Doce' },
      { idAccount: "13", documentType: 'NIT', documentNumber: 11234567, legalName: 'Empresa Trece' },
      { idAccount: "14", documentType: 'CE', documentNumber: 22345678, legalName: 'Empresa Catorce' },
      { idAccount: "15", documentType: 'CC', documentNumber: 33456789, legalName: 'Empresa Quince' },
      { idAccount: "16", documentType: 'NIT', documentNumber: 44567890, legalName: 'Empresa Dieciséis' },
      { idAccount: "17", documentType: 'CE', documentNumber: 55678901, legalName: 'Empresa Diecisiete' },
      { idAccount: "18", documentType: 'CC', documentNumber: 66789012, legalName: 'Empresa Dieciocho' },
      { idAccount: "19", documentType: 'NIT', documentNumber: 77890123, legalName: 'Empresa Diecinueve' },
      { idAccount: "20", documentType: 'CE', documentNumber: 88901234, legalName: 'Empresa Veinte' }
    ];
  }

  public getCustomers(): Customer[] {
    return DataService.customers;

  }

  public getCustomersByIdAccount(documentType: string, documentNumber: number): Customer[] {
    return DataService.customers.filter(c => c.documentType === documentType && c.documentNumber === documentNumber);

  }

  public getContracts(): Contrato[] {
    return DataService.contracts;

  }

  public getContractsByAccount(idAccount: string): Contrato[] {
    return DataService.contracts.filter(c => c.idAccount === idAccount);
  }

  public getContractsByIdContract(idContract: number): Contrato[] {
    return DataService.contracts.filter(c => c.idContract == idContract);
  }

  public getProductsByIdContract(idContract: number): Plan[] {
    return DataService.plans.filter(c => c.idContract == idContract);
  }

  public getLinesByIdContract(idContract: number): Linea[] {
    return DataService.lineas.filter(c => c.idContract == idContract);
  }

  public getDiscountByIdContract(idContract: number): Discount[] {
    return DataService.discounts.filter(c => c.idContract == idContract);
  }

  public getDevicesByIdContract(idContract: number): Device[] {
    return DataService.devices.filter(c => c.idContract == idContract);
  }

  public saveContract(contract: Contrato) {

    if (this.getContractsByIdContract(contract.idContract).length == 0) {
      DataService.contracts.push({ ...contract });
    } else {
      DataService
        .contracts
        .filter(c => c.idContract === contract.idContract)
        .forEach(c => {
          c.codigoVendedor = contract.codigoVendedor ;
          c.estado = contract.estado;
          c.editar= contract.editar;
          c.informeVenta= contract.informeVenta;
          c.seguimientoLineas= contract.seguimientoLineas;
          c.activacionLineas= contract.activacionLineas;
          c.eliminacionLineas= contract.eliminacionLineas;
          c.edicionLineas= contract.edicionLineas;
          c.idAccount = contract.idAccount;
          c.numeroContrato = contract.numeroContrato;
          c.tipoContrato= contract.tipoContrato;


          c.finVigencia= contract.finVigencia;
          c.codigoVendedor= contract.codigoVendedor;


          c.valorNoRedimible= contract.valorNoRedimible;


        });


    }

  }

  public getBillAccountsByIdContract(idContract: number) {
    return DataService.billAccounts.filter(c => c.idContract == idContract);
  }

  public saveBillAccounts(billAccount: BillAccount[]) {

    billAccount.forEach(
      bill => {
        bill.cicloFacturacion = bill.cicloFacturacion ? bill.cicloFacturacion : Math.floor(Math.random() * 10);
        bill.cuentaFacturacion = bill.cuentaFacturacion ? bill.cuentaFacturacion : Math.floor(100000000 + Math.random() * 900000000);
        bill.fechaCreacion = bill.fechaCreacion ? bill.fechaCreacion : "" + new Date();
        bill.idBill = bill.idBill === -1 ? Math.floor(100000000 + Math.random() * 900000000) : bill.idBill;

      }
    );

    billAccount.forEach(bill => {
      if (DataService.billAccounts.filter(temp => temp.idBill === bill.idBill).length > 0) {

        DataService
        .billAccounts
        .filter(temp => temp.idBill === bill.idBill)
        .forEach(temp => {
          temp.cicloFacturacion = bill.cicloFacturacion ;
          temp.cuentaFacturacion = bill.cuentaFacturacion ;
          temp.fechaCreacion = bill.fechaCreacion ;
        }) ;


      } else {
        DataService.billAccounts.push({ ...bill });
      }
    }

    );
  }

  public saveDiscounts(discount: Discount) {

    if (DataService.discounts.filter(d => d.idContract == discount.idContract).length === 0) {
      DataService.discounts.push({ ...discount });
    } else {
      DataService
      .discounts
      .filter(d => d.idContract == discount.idContract)
      .forEach(d => {
        d.mesesAnio = discount.mesesAnio ;
        d.motivoDescuento = discount.motivoDescuento ;
        d.valorDescuento = discount.valorDescuento ;
      });

    }

  }

  public saveDevices(devices: Device[]) {
    devices.forEach(
      device => {
        if(DataService.devices.filter(value => value.id === device.id ).length === 0){
          DataService.devices.push({ ...device });
        }else{

        }
      }

    );

  }

  public saveProduct(plans: Plan[]){

    plans.forEach(plan => {

      if(DataService.plans.filter(value => value.cuentaFacturacion === plan.cuentaFacturacion).length === 0){
        DataService.plans.push({ ... plan });
      }else{

      }

    }

    );


  }

  public saveLine(lineas: Linea[]){
    lineas.forEach(
      linea => {
        if(DataService.lineas.filter(value => value.numeroLinea === linea.numeroLinea).length === 0){
          DataService.lineas.push({ ... linea });
        }else{

        }
      }
    );


  }

  private randomContracts(): void {


    // Generar 60 contracts
    for (let i = 1; i <= 60; i++) {
      const idAccount = this.getRandomIdAccount(DataService.customers);
      DataService.contracts.push({
        idAccount: idAccount,
        idContract: i,
        estado: this.getRandomEstado(),
        editar: this.getRandomBoolean(),
        informeVenta: this.getRandomBoolean(),
        seguimientoLineas: this.getRandomBoolean(),
        activacionLineas: this.getRandomBoolean(),
        eliminacionLineas: this.getRandomBoolean(),
        edicionLineas: this.getRandomBoolean(),
        numeroContrato: '' + Math.floor(100 + Math.random() * 99),
        tipoContrato: this.getRandomTipoContrato(),


        finVigencia: null,
        codigoVendedor: 0,
        saldoBolsa: 0,
        valorNoRedimible: 0,
        saldo: 0, 
        valorBolsa: 0, 
        digitoVerificacion: 0, 
        fechaExpedicion: '', 
        fechaExpedicionRepresentanteLegal: '', 
        numeroDocumentoRepresentanteLegal: NaN, 
        tipoDocumentoRepresentanteLegal: ''

      });
    }

  }

  private getRandomTipoIdentificacion(): string {
    const tipos = ['CC', 'CE', 'NIT', 'TI'];
    return tipos[Math.floor(Math.random() * tipos.length)];
  }

  private getRandomNumeroIdentificacion(): number {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  private getRandomEstado(): string {
    const estados = ['ACTIVO', 'INACTIVO', 'PENDIENTE'];
    return estados[Math.floor(Math.random() * estados.length)];
  }

  private getRandomTipoContrato(): string {
    const contratos = ['Estandar', 'Negociado'];
    return contratos[Math.floor(Math.random() * contratos.length)];
  }

  private getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  private getRandomIdAccount(customers: Customer[]): string {
    return customers[Math.floor(Math.random() * customers.length)].idAccount;
  }


  public getServicesOrders(): ServiceOrder[] {
    return DataService.servicesOrders;
  }

  public setServicesOrders(servicesOrders: ServiceOrder[]): void {
    DataService.servicesOrders = servicesOrders;
  }

  // Método para añadir una orden de servicio a la lista
  public addServiceOrder(serviceOrder: ServiceOrder): void {
    DataService.servicesOrders.push(serviceOrder);
  }

  // Método para obtener una orden de servicio por ID
  public getServiceOrderById(id: number): ServiceOrder | undefined {
    return DataService.servicesOrders.find(order => order.id === id);
  }

  // Método para eliminar una orden de servicio por ID
  public removeServiceOrderById(id: number): void {
    DataService.servicesOrders = DataService.servicesOrders.filter(order => order.id !== id);
  }

  // Nuevo método para obtener órdenes de servicio por idContract
  public getServiceOrdersByIdContract(idContract: number): ServiceOrder[] {
    return DataService.servicesOrders.filter(order => order.agreementId === idContract);
  }

  // Nuevo método para setear órdenes de servicio por idContract
  public setServiceOrdersByIdContract(idContract: number, updatedOrders: ServiceOrder[]): void {
    // Filtramos las órdenes que NO corresponden al idContract dado
    const otherOrders = DataService.servicesOrders.filter(order => order.agreementId !== idContract);

    // Reemplazamos las órdenes de servicio con el idContract por las nuevas actualizadas
    DataService.servicesOrders = [...otherOrders, ...updatedOrders];
  }



  public printDatasource() {
    console.log("Datasource: ");
    console.log("customers: ");
    console.log(DataService.customers);
    console.log("Contracts: ");
    console.log(DataService.contracts);
    console.log("BIllsAccounts: ");
    console.log(DataService.billAccounts);
    console.log("Devices: ");
    console.log(DataService.devices);
    console.log("Discounts: ");
    console.log(DataService.discounts);
    console.log("Plan: ");
    console.log(DataService.plans);
    console.log("Lineas: ");
    console.log(DataService.lineas);

  }
}
