import { Component, TemplateRef } from '@angular/core';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newpospagoweb';

  constructor(private modalService: ModalService) {}



}
