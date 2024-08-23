import { AddServices } from "./add-services";

export interface Linea {

    tipoLinea: string;
    numeroLinea: number;
    imsi: number;
    imei: string;
    operador: string;
    nuipValue : string ; 
    tipoPersona: string;
    tipoIdentificacion: string;
    numeroDocumento: number;
    nombre: string;
    fechaExpedicion: number;    
    idPlan: number ; 

    
    idCuentaFacturacion?: number, 
    tipoProducto?: string;
    familia?: string;
    producto?: string;
    plan?: string;
    
    valorUnitario?: number;
    valorDescuento?: number;
    motivoDescuento?: string;
    grupo?: string;

    idPromocionContinuo?: string ; 
    valorDescuentoPromocionContinuo?: number ; 

    idPromocionDiscontinuo? : string ; 
    valorDescuentoPromocionDiscontinuo?: number ;
    mesesPromocion? : string [] ;

    idDescuentoVolumenContinuo?: string ; 
    valorDescuentoVolumenContinuo?: number ; 

    idDescuentoVolumenDiscontinuo? : string ; 
    valorDescuentoVolumenDiscontinuo?: number ;
    mesesVolumen? : string [] ; 

    valorDescuentoDiscontinuo? : number  ;
    mesesPersonalizados? : string [] ;  


    valorTotal?: number ; 

    tipoEnvio?: string ; 
    addServices: AddServices[]; 
    idContract: number ; 
    
}
