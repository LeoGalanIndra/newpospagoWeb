export interface Linea {

    tipoLinea: string;
    numeroLinea: number;
    imsi: number;
    imei: string;
    operador: string;
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
    idPromocion?: string ; 
    valorTotal?: number ; 

    tipoEnvio?: string ;
}
