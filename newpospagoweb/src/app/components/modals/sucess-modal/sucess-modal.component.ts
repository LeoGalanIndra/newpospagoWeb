import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sucess-modal',
  templateUrl: './sucess-modal.component.html',
  styleUrl: './sucess-modal.component.css'
})
export class SucessModalComponent {

  constructor() {}

  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter();
  //indmrmelor
  @Input() acceptButtonText: string = 'Aceptar'; // Propiedad para el texto del botón "Aceptar"

  @Output() acceptEvent = new EventEmitter<void>(); // Evento para el botón "Aceptar"

  ngOnInit(): void {
    console.log('Sucess init');
  }

  closeMe() {
    console.log('Sucess close');
    this.closeMeEvent.emit();
  }

 ngOnDestroy(): void {
    console.log('Sucess end.');
  }

}
