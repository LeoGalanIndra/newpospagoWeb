export interface ReporteNip {
    cliente: string;
    operadorDonante: string;
    linea: string;
    lineasSoportadas: string[];
    tipoSolicitud?: string;
    fechaSolicitud?: string;
    estado?: string;
    causaError?: string;
}