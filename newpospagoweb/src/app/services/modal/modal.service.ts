import { ComponentFactoryResolver, ComponentRef,  Injectable,  ViewContainerRef } from '@angular/core';
import { ConfirmationModalComponent } from '../../components/modals/confirmation-modal/confirmation-modal.component';
import { Subject } from 'rxjs';
import { SucessModalComponent } from '../../components/modals/sucess-modal/sucess-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRef!: ComponentRef<ConfirmationModalComponent>;
  private componentSubscriber!: Subject<string>;

  private componentRefSuccess!: ComponentRef<SucessModalComponent>;
  private componentSubscriberSucess!: Subject<string>;

  constructor(private resolver: ComponentFactoryResolver, 
    private resolverSucess: ComponentFactoryResolver
  ) {}

  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string) {
    let factory = this.resolver.resolveComponentFactory(ConfirmationModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }

  openSuccessModal(entry: ViewContainerRef, modalTitle: string, modalBody: string) {
    let factory = this.resolverSucess.resolveComponentFactory(SucessModalComponent);
    this.componentRefSuccess = entry.createComponent(factory);
    this.componentRefSuccess.instance.title = modalTitle;
    this.componentRefSuccess.instance.body = modalBody;
    this.componentRefSuccess.instance.closeMeEvent.subscribe(() => this.closeSucessModal());
    this.componentSubscriberSucess = new Subject<string>();
    return this.componentSubscriberSucess.asObservable();
  }

  closeSucessModal() {
    this.componentSubscriberSucess.next('confirm');
    this.componentSubscriberSucess.complete();
    this.componentRefSuccess.destroy();
  }

  
  
}
