export interface Contrato {

    id: number;
    estado: string;
    editar: boolean;
    informeVenta: boolean;
    seguimientoLineas: boolean;
    activacionLineas: boolean;
    eliminacionLineas: boolean;
    edicionLineas: boolean;
    idAccount : number ; 
    numeroContrato : number;
    tipoContrato: string;
    inicioVigencia: string;
    mesesContrato: number;
    finVigencia: string;
    codigoVendedor: number;
    valorBolsa: number;
    saldo: number;


}
