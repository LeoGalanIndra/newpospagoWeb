import { AddServices } from "./add-services";
import { BillAccount } from "./bill-account";
import { Contrato } from "./contrato";
import { Device } from "./device";
import { Discount } from "./discount";
import { Linea } from "./linea";
import { Plan } from "./plan";
import { ServiceOrder } from "./serviceOrder";


export interface NewProductContract {

    contract : Contrato ;
    billAccounts : BillAccount [] ;
    discount  : Discount ;
    plans: Plan [] ;
    lineas: Linea[] ;
    devices: Device[] ;
    orders:ServiceOrder[];
}
