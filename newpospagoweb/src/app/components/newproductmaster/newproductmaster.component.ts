import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { Contrato } from '../../models/contrato';
import { CustomerConstractsService } from '../../services/customer-constracts.service';
import { CustomerContracts } from '../../models/customer-contracts';


@Component({
  selector: 'app-newproductmaster',
  templateUrl: './newproductmaster.component.html',
  styleUrl: './newproductmaster.component.css'
})
export class NewproductmasterComponent {


  constructor(private customerService: CustomerConstractsService, private router: Router) {

  }

  customer: Customer = {
    documentNumber: NaN,
    documentType: "",
    idAccount: NaN
  };

  contratos: Contrato[] = [];

  documentNumber: number = 0;

  isExistAccount: boolean = false;

  isErrorMessage: boolean = false;

  searchAccount() {

    this.contratos = [];

    console.log("dato de entrada" + this.customer.documentType);
    console.log("dato de entrada" + this.customer.documentNumber);
    console.log("dato de entrada" + this.customer.idAccount);

    if (!(this.customer.documentType !== "" && this.customer.documentNumber > 0 )) {
      this.isErrorMessage = true;
    }

    this.isErrorMessage = false;
    

    let customerContract: CustomerContracts = this.customerService
      .getContractsByCustomer(this.customer);

    if(!customerContract.customer){
      this.isErrorMessage = true;
      console.log("no hay datos");
      return ; 
    }

    this.customer = customerContract.customer ; 
    this.isErrorMessage = false;
    this.isExistAccount = true;

    if(customerContract.contracts.length > 0){
      this.contratos = customerContract.contracts ; 
      
    }else {
      console.log("no hay contratos ");
      this.contratos = [];
    }

  }

  openNewContract(){

    console.log("sending " + this.customer.documentNumber); 
    this.router.navigate(['/createproduct'], { 
      queryParams: { 
        idAccount: this.customer.idAccount, 
        idContract: '-1',
        documentNumber: this.customer.documentNumber, 
        legalName: this.customer.legalName 
      }
    });

  }

}
