import { Injectable } from '@angular/core';

import { Customer } from './../models/customer';

import { Contrato } from './../models/contrato';

import { CustomerContracts } from './../models/customer-contracts';
import { DataService } from './data.service';
import { NewProductContract } from '../models/new-product-contract';
import { Device } from '../models/device';
import { Discount } from '../models/discount';
import { Linea } from '../models/linea';
import { Plan } from '../models/plan';

import { ServiceOrder } from '../models/serviceOrder';

@Injectable({
  providedIn: 'root'
})
export class CustomerConstractsService {

  constructor(private dataService: DataService) {

  }

  getContractsByCustomer(customer: Customer): CustomerContracts {

    console.log("getContractsByCustomer");

    let customerContract: CustomerContracts = { contracts: [] };

    let foundCustomer = this.dataService.getCustomersByIdAccount(customer.documentType, customer.documentNumber);

    console.log(foundCustomer);

    if (foundCustomer.length === 0) {
      console.log(" sin datos ");
      return customerContract;
    }

    customerContract.customer = foundCustomer[0];

    let customerContracts = this.dataService.getContractsByAccount(foundCustomer[0].idAccount);

    if (customerContracts.length > 0) {
      customerContract.contracts = customerContracts ;
    }

    return customerContract;

  }

  printDatasource(){
    this.dataService.printDatasource();
  }

  saveNewContract(newContract : NewProductContract){

    if(!newContract){
      return ;
    }

    if(!newContract.contract){
      return ;
    }

    this.dataService.saveContract(newContract.contract);

    if(newContract.billAccounts.length > 0){
      this.dataService.saveBillAccounts(newContract.billAccounts);
    }

    if(newContract.discount.mesesAnio!.length > 0){
      this.dataService.saveDiscounts(newContract.discount);
    }

    if(newContract.devices.length > 0){
      this.dataService.saveDevices(newContract.devices);
    }

    if(newContract.plans.length > 0){
      this.dataService.saveProduct(newContract.plans);
    }

    if(newContract.lineas.length > 0){
      this.dataService.saveLine(newContract.lineas);
    }


  }

  public getBillAccountsByIdContract(idContract : number){
    return this.dataService.getBillAccountsByIdContract(idContract);
  }

  public getContractsByIdContract(idContract: number): Contrato[] {
    return this.dataService.getContractsByIdContract(idContract);
  }

  public getProductsByIdContract(idContract: number): Plan[] {
    return this.dataService.getProductsByIdContract(idContract);
  }

  public getLinesByIdContract(idContract: number): Linea[] {
    return this.dataService.getLinesByIdContract(idContract);
  }

  public getDiscountByIdContract(idContract: number): Discount[] {
    return this.dataService.getDiscountByIdContract(idContract);
  }

  public getDevicesByIdContract(idContract: number): Device[] {
    return this.dataService.getDevicesByIdContract(idContract);
  }

  // Método para obtener una orden de servicio por idContract
  public getServiceOrderByIdContract(idContract: number): ServiceOrder[] {
    return this.dataService.getServiceOrdersByIdContract(idContract);

  }

  }
