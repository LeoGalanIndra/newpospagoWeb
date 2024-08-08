import { Injectable } from '@angular/core';

import { Customer } from './../models/customer';

import { Contrato } from './../models/contrato';

import { CustomerContracts } from './../models/customer-contracts';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerConstractsService {


  private customers: Customer[] = [];
  private contracts: Contrato[] = [];

  constructor(private dataService: DataService) {
    const data = this.dataService.generateCustomersAndContracts();
    this.customers = data.customers;
    this.contracts = data.contracts;
    console.log(this.customers);
    console.log(this.contracts);
  }

  getContractsByCustomer(customer: Customer): CustomerContracts {

    console.log("getContractsByCustomer");

    let customerContract: CustomerContracts = { contracts: [] };

    let foundCustomer = this
      .customers
      .filter(c => c.documentType === customer.documentType && c.documentNumber === customer.documentNumber);

    console.log(foundCustomer);

    if (foundCustomer.length === 0) {
      console.log(" sin datos ");
      return customerContract;
    }

    customerContract.customer = foundCustomer[0];

    let customerContracts = this.contracts.filter(contract => contract.idAccount === foundCustomer[0].idAccount);

    if (customerContracts.length > 0) {
      customerContract.contracts = customerContracts ; 
    }

    return customerContract;

  }
}
