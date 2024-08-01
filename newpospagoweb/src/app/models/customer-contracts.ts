import { Contrato } from "./contrato";
import { Customer } from "./customer";

export interface CustomerContracts {

    customer?: Customer ; 

    contracts: Contrato[] ; 
    
}
