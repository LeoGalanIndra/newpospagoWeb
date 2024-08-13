import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Contrato } from '../models/contrato';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  generateCustomersAndContracts(): { customers: Customer[], contracts: Contrato[] } {
    const customers: Customer[] = [];
    const contracts: Contrato[] = [];

    // Generar 20 customers
    for (let i = 1; i <= 20; i++) {
      customers.push({
        idAccount: i,
        documentType: this.getRandomTipoIdentificacion(),
        documentNumber: this.getRandomNumeroIdentificacion(), 
        legalName: "Empresa " + i  
      });
    }

    // Generar 60 contracts
    for (let i = 1; i <= 60; i++) {
      const idAccount = this.getRandomIdAccount(customers);
      contracts.push({
        idAccount: idAccount,
        idContract: i,
        estado: this.getRandomEstado(),
        editar: this.getRandomBoolean(),
        informeVenta: this.getRandomBoolean(),
        seguimientoLineas: this.getRandomBoolean(),
        activacionLineas: this.getRandomBoolean(),
        eliminacionLineas: this.getRandomBoolean(),
        edicionLineas: this.getRandomBoolean(), 
        numeroContrato: '' + Math.floor(100 + Math.random() * 99),
        tipoContrato: this.getRandomTipoContrato(),
        inicioVigencia: '',
        mesesContrato: 0,
        finVigencia: null,
        codigoVendedor: 0,
        valorBolsa: 0,
        saldo: 0, 
        valorNoRedimible: 0 
      });
    }

    return { customers, contracts };
  }

  private getRandomTipoIdentificacion(): string {
    const tipos = ['CC', 'CE', 'NIT', 'TI'];
    return tipos[Math.floor(Math.random() * tipos.length)];
  }

  private getRandomNumeroIdentificacion(): number {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  private getRandomEstado(): string {
    const estados = ['Activo', 'Inactivo'];
    return estados[Math.floor(Math.random() * estados.length)];
  }

  private getRandomTipoContrato(): string {
    const contratos = ['Estandar', 'Negociado'];
    return contratos[Math.floor(Math.random() * contratos.length)];
  }

  private getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  private getRandomIdAccount(customers: Customer[]): number {
    return customers[Math.floor(Math.random() * customers.length)].idAccount;
  }
}
