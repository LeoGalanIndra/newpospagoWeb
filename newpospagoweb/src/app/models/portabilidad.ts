import { CesionContrato } from "./cesion-contrato";

export interface Portabilidad {
    tipoDocumento: string;
    numeroDocumento: number;
    anioExpedicion: number;
    fechaExpedicion?: string;
    digitoVerificacion?: number;
    tipoDocumentoRepresentanteLegal?: string;
    numeroDocumentoRepresentanteLegal?: number;
    fechaExpedicionRepresentanteLegal?: string;
    tipoTelefoniaActual : string;
    tipoSolicitante : string;
    operadorDonante : string;
    nip : string;
    esFechaCalendarizada : boolean;
    fechaSugeridaPortacion? : string;
    lineaTemporal : string;
    tipoVenta : string;
    imei? : string;

    cesionContrato? : CesionContrato;
}