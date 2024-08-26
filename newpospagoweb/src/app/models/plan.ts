import { AddServices } from "./add-services";

export interface Plan {

    idPlan: number ; 
    idCuentaFacturacion: number, 
    cuentaFacturacion: number | null,
    tipoProducto: string;
    familia: string;
    producto: string;
    plan: string;
    cantidad: number;
    valorUnitario: number;
    valorDescuento: number;
    motivoDescuento: string;
    grupo: string;
    idPromocion: string ; 
    valorTotal: number ; 

    tipoEnvio: string ;  
    vozAndSMS: AddServices | null ;
    idContract: number ;  
    


}
