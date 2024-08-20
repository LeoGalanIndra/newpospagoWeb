import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerConstractsService } from '../../services/customer-constracts.service';
import { InventoryService } from '../../services/inventory.service';
import { ModalService } from '../../services/modal/modal.service';
import { NewProductContract } from '../../models/new-product-contract';
import { Tax } from '../../models/tax';
import { Linea } from '../../models/linea';

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

  initContract(idContract : any ){

    this.contractService.printDatasource();

    console.log("contract id  ");
    console.log(idContract);

    let contract = this.contractService.getContractsByIdContract(idContract)[0]; 
    let billAccounts = this.contractService.getBillAccountsByIdContract(idContract);
    let discount = this.contractService.getDiscountByIdContract(idContract)[0]; 
    let plans = this.contractService.getProductsByIdContract(idContract); 
    let lineas = this.contractService.getLinesByIdContract(idContract); 
    let devices = this.contractService.getDevicesByIdContract(idContract); 

    this.portableLines = lineas.filter(c => c.tipoLinea === "Portabilidad" || c.tipoLinea === "Portabilidad Con Cesión De Contrato"); 

    console.log(contract);
    console.log(billAccounts);
    console.log(discount);
    console.log(plans);
    console.log(lineas);
    console.log(devices);

    this.newContract = {
      contract: contract ,
      billAccounts: billAccounts,
      discount: discount,
      plans: plans,
      lineas: lineas,
      devices: devices
  
    };

    console.log(this.newContract);

  }


}
