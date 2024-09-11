export interface Contrato {

    idContract: number;
    estado: string;
    editar: boolean;
    informeVenta: boolean;
    seguimientoLineas: boolean;
    activacionLineas: boolean;
    eliminacionLineas: boolean;
    edicionLineas: boolean;
    idAccount : string ; 
    numeroContrato : string;
    tipoContrato: string;
    inicioVigencia: string;
    mesesContrato: number;
    finVigencia: string | null;
    codigoVendedor: number;
    valorBolsa: number;
    saldo: number;
    valorNoRedimible: number ; 
    fechaExpedicion?: string;
    digitoVerificacion?: number;
    tipoDocumentoRepresentanteLegal?: string;
    numeroDocumentoRepresentanteLegal?: number;
    fechaExpedicionRepresentanteLegal?: string;

}
