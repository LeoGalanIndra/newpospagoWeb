// number-format.directive.ts
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberFormat]'
})
export class NumberFormatDirective {

  private decimalSeparator = '.';
  private thousandSeparator = ',';

  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) { }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    if (value) {
      const numericValue = parseFloat(value.replace(new RegExp(`\\${this.thousandSeparator}`, 'g'), ''));
      if (!isNaN(numericValue)) {
        const formattedValue = numericValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
        this.control.control?.setValue(numericValue);
      }
    }
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    if (value) {
      const numericValue = parseFloat(value.replace(new RegExp(`\\${this.thousandSeparator}`, 'g'), ''));
      if (!isNaN(numericValue)) {
        this.renderer.setProperty(this.el.nativeElement, 'value', numericValue);
      }
    }
  }
}
