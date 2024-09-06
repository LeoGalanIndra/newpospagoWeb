import { Injectable } from '@angular/core';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private static inventarios: Inventory[] = [];

  constructor() {
    this.generarInventarios();
  }

  private generarInventarios() {
    const nombres = ['iPhone 12', 'Samsung Galaxy S21', 'Google Pixel 6', 'OnePlus 9', 'Xiaomi Mi 11', 'Sony Xperia 5', 'LG Velvet', 'Motorola Edge', 'Huawei P40', 'Nokia 8.3'];

    for (let i = 0; i < 10; i++) {
      const cantidad = Math.floor(Math.random() * 100) + 1;
      const precioUnitario = parseFloat((Math.random() * 1000000 + 500).toFixed(2));
      const precioTotal = parseFloat((precioUnitario * cantidad * 1.19).toFixed(2)); // Asumiendo un IVA del 19%

      InventoryService.inventarios.push({
        name: nombres[i],
        cantidad: cantidad,
        precioUnitario: precioUnitario,
        precioTotal: precioTotal
      });
    }
  }

  getInventarios(): Inventory[] {
    return InventoryService.inventarios;
  }
}
