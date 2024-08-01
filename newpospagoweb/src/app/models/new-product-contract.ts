import { BillAccount } from "./bill-account";
import { Contrato } from "./contrato";
import { Discount } from "./discount";
import { Plan } from "./plan";

export interface NewProductContract {

    contract : Contrato ; 
    billAccounts : BillAccount [] ; 
    discount : Discount ; 
    plans: Plan [] ; 


}
