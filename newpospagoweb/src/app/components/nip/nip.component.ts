import { Component } from '@angular/core';
import { InfoNIP } from '../../models/info-nip';
import { ReporteNip } from '../../models/reporte-nip';

@Component({
  selector: 'app-nip',
  templateUrl: './nip.component.html',
  styleUrl: './nip.component.css'
})
export class NipComponent {

  operadorDonantes: string[] = ['Claro', 'Movistar', 'Wom'];
  estados: string[] = ['Exitoso', 'Denegado'];

  showCargaTXTNaturales: boolean = false;
  showCargaTXTJuridicos: boolean = false;
  showCargaLineaNatural: boolean = false;
  showCargaLineaJuridico: boolean = false;

  fileNatUploaded: boolean = false;
  fileJurUploaded: boolean = false;

  lineaNaturalCargada: boolean = false;
  lineaJuridicaCargada: boolean = false;
  lineasNaturalesCargadas: boolean = false;
  lineasJuridicasCargadas: boolean = false;

  ejecutarNip: boolean = false;

  infoNip : InfoNIP = {
    flujo: 'B2C',
    operadorDonante: '',
    msisdn: NaN,
    receptor: 'Tigo',
    accion: 'Solicitar NIP',
    cargaTXTJuridicos: true,
    cargaTXTNaturales: true,
    msisdnNat: NaN,
    msisdnJur: NaN,
    operadorDonanteNat: '',
    operadorDonanteJur: ''
  }

  reportNipNat: ReporteNip[] = 
  [
    {
      cliente: 'Cliente Nat 1',
      operadorDonante: this.getOperadorDonante(),
      linea: '11111',
      lineasSoportadas: [],
      tipoSolicitud: 'Natural',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: this.getEstado(),
      causaError: 'N/A'
    },
    {
      cliente: 'Cliente Nat 2',
      operadorDonante: this.getOperadorDonante(),
      linea: '22222',
      lineasSoportadas: [],
      tipoSolicitud: 'Natural',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: this.getEstado(),
      causaError: 'N/A'
    },
    {
      cliente: 'Cliente Nat 3',
      operadorDonante: this.getOperadorDonante(),
      linea: '33333',
      lineasSoportadas: [],
      tipoSolicitud: 'Natural',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: this.getEstado(),
      causaError: 'N/A'
    },
    {
      cliente: 'Cliente Nat 4',
      operadorDonante: this.getOperadorDonante(),
      linea: '44444',
      lineasSoportadas: [],
      tipoSolicitud: 'Natural',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: this.getEstado(),
      causaError: 'N/A'
    },
  ];

  reportNipJur: ReporteNip[] = 
  [
    {
      cliente: 'Cliente Jur 1',
      operadorDonante: this.getOperadorDonante(),
      linea: '11111',
      lineasSoportadas: ['11111222', '11111333', '11111444'],
      tipoSolicitud: 'Jurídico',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: this.getEstado(),
      causaError: 'N/A'
    },
    {
      cliente: 'Cliente Jur 2',
      operadorDonante: this.getOperadorDonante(),
      linea: '22222',
      lineasSoportadas: ['22222333', '22222444'],
      tipoSolicitud: 'Jurídico',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: this.getEstado(),
      causaError: 'N/A'
    },
    {
      cliente: 'Cliente Jur 3',
      operadorDonante: this.getOperadorDonante(),
      linea: '33333',
      lineasSoportadas: [],
      tipoSolicitud: 'Jurídico',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: this.getEstado(),
      causaError: 'N/A'
    },
    {
      cliente: 'Cliente Jur 4',
      operadorDonante: this.getOperadorDonante(),
      linea: '44444',
      lineasSoportadas: ['44444444333'],
      tipoSolicitud: 'Jurídico',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: this.getEstado(),
      causaError: 'N/A'
    },
  ];

  reporteNipFinal: ReporteNip[] = [];

  reporteNipNatIndividual: ReporteNip = {
    cliente: '',
    operadorDonante: '',
    linea: '',
    lineasSoportadas: []
  };

  reporteNipJurIndividual: ReporteNip = {
    cliente: '',
    operadorDonante: '',
    linea: '',
    lineasSoportadas: []
  };

  b2cReset() {
    this.infoNip = {
      flujo: 'B2C',
      operadorDonante: '',
      msisdn: 0,
      receptor: 'Tigo',
      accion: 'Solicitar NIP',
      cargaTXTJuridicos: true,
      cargaTXTNaturales: true,
      msisdnNat: NaN,
      msisdnJur: NaN,
      operadorDonanteNat: '',
      operadorDonanteJur: ''
    }
    this.showCargaLineaNatural = false;
    this.showCargaLineaJuridico = false;
    this.showCargaTXTNaturales = false;
    this.showCargaTXTJuridicos = false;
  }

  b2bReset() {
    this.infoNip = {
      flujo: 'B2B',
      operadorDonante: '',
      msisdn: 0,
      msisdnNat: NaN,
      msisdnJur: NaN,
      receptor: 'Tigo',
      accion: 'Solicitar NIP',
      cargaTXTJuridicos: true,
      cargaTXTNaturales: true,
      operadorDonanteNat: '',
      operadorDonanteJur: ''
    }
    this.showCargaLineaNatural = false;
    this.showCargaLineaJuridico = false;
    this.showCargaTXTNaturales = false;
    this.showCargaTXTJuridicos = false;
    this.fileNatUploaded = false;
    this.fileJurUploaded = false;
    const fileNatInput : HTMLInputElement = document.getElementById('fileNatInput') as HTMLInputElement;
    const fileJurInput : HTMLInputElement = document.getElementById('fileJurInput') as HTMLInputElement;
    fileJurInput.value = '';
    fileNatInput.value = '';
    this.lineaJuridicaCargada = false;
    this.lineaNaturalCargada = false;
    this.lineasJuridicasCargadas = false;
    this.lineasNaturalesCargadas = false;
    this.ejecutarNip = false;

    this.reporteNipFinal = [];
  }

  descargarReporte() {
    console.log("Se descarga el reporte en un .xlxs");
  }

  getOperadorDonante() {
    return this.operadorDonantes[Math.floor(Math.random() * 3)];
  }

  getEstado() {
    return this.estados[Math.floor(Math.random() * 2)];
  }

  uploadNatLine() {
    this.infoNip.operadorDonanteNat = this.getOperadorDonante();
    this.showCargaLineaJuridico = false;
    this.showCargaLineaNatural = true;
    this.showCargaTXTNaturales = false;
    this.showCargaTXTJuridicos = false;
    this.lineaNaturalCargada = true;
    this.lineasNaturalesCargadas = false;

    let estado = this.getEstado();
    let causaError = 'N/A';
    if (estado === 'Denegado') {
      causaError = 'Linea ya portada';
    }

    this.reporteNipNatIndividual = {
      cliente: 'Cliente natural',
      operadorDonante: this.infoNip.operadorDonanteNat,
      linea: this.infoNip.msisdnNat.toString(),
      lineasSoportadas: [],
      tipoSolicitud: 'Natural',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: estado,
      causaError: causaError

    };
  }

  uploadJurLine() {
    this.infoNip.operadorDonanteJur = this.getOperadorDonante();
    this.showCargaLineaJuridico = true;
    this.showCargaLineaNatural = false;
    this.showCargaTXTNaturales = false;
    this.showCargaTXTJuridicos = false;
    this.lineaJuridicaCargada = true;
    this.lineasJuridicasCargadas = false;

    let estado = this.getEstado();
    let causaError = 'N/A';
    if (estado === 'Denegado') {
      causaError = 'Linea ya portada';
    }

    this.reporteNipJurIndividual = {
      cliente: 'Cliente juridico',
      operadorDonante: this.infoNip.operadorDonanteJur,
      linea: this.infoNip.msisdnJur.toString(),
      lineasSoportadas: [],
      tipoSolicitud: 'Jurídico',
      fechaSolicitud: new Date(Date.now()).toLocaleDateString('es-ES'),
      estado: estado,
      causaError: causaError
    };
  }

  onFileNatChange(event: any) {
    this.fileNatUploaded = true;
    this.showCargaLineaJuridico = false;
    this.showCargaLineaNatural = false;
    this.showCargaTXTNaturales = false;
    this.showCargaTXTJuridicos = false;
    this.ejecutarNip = false;
  }

  onFileJurChange(event: any) {
    this.fileJurUploaded = true;
    this.showCargaLineaJuridico = false;
    this.showCargaLineaNatural = false;
    this.showCargaTXTNaturales = false;
    this.showCargaTXTJuridicos = false;
    this.ejecutarNip = false;
  }

  uploadNatFile() {
    this.showCargaLineaJuridico = false;
    this.showCargaLineaNatural = false;
    this.showCargaTXTNaturales = true;
    this.showCargaTXTJuridicos = false;
    this.lineaNaturalCargada = false;
    this.lineasNaturalesCargadas = true;
    this.ejecutarNip = false;
  }

  uploadJurFile() {
    this.showCargaLineaJuridico = false;
    this.showCargaLineaNatural = false;
    this.showCargaTXTNaturales = false;
    this.showCargaTXTJuridicos = true;
    this.lineaJuridicaCargada = false;
    this.lineasJuridicasCargadas = true;
    this.ejecutarNip = false;
  }

  ejecutarSolicitudNip() {
    this.reporteNipFinal = [];
    if (this.lineasJuridicasCargadas) {
      for (let i = 0; i < this.reportNipJur.length; i++) {
        if (this.reportNipJur[i].estado === 'Denegado') {
          this.reportNipJur[i].causaError = 'Linea ya portada';
        }
        this.reporteNipFinal.push(this.reportNipJur[i]);
      }
    }
    if (this.lineasNaturalesCargadas) {
      for (let i = 0; i < this.reportNipNat.length; i++) {
        if (this.reportNipNat[i].estado === 'Denegado') {
          this.reportNipNat[i].causaError = 'Linea ya portada';
        }
        this.reporteNipFinal.push(this.reportNipNat[i]);
      }
    }
    if (this.lineaJuridicaCargada) {
      this.reporteNipFinal.push(this.reporteNipJurIndividual);
    }
    if (this.lineaNaturalCargada) {
      this.reporteNipFinal.push(this.reporteNipNatIndividual);
    }

    this.showCargaLineaJuridico = false;
    this.showCargaLineaNatural = false;
    this.showCargaTXTNaturales = false;
    this.showCargaTXTJuridicos = false;
    this.ejecutarNip = true;
  }

}
