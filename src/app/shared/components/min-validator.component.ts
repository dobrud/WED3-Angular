import { Directive, Input, forwardRef} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';


@Directive({
  selector: '[min][ngModel]',
  providers: [ {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator), multi: true } ]
})
export class MinValidator implements Validator {
  @Input()
  public min: number;

  validate({value:modelValue}:AbstractControl): { [key: string]: any } {
    if (Number.parseFloat(modelValue) < this.min) {
      return { min: {minValue: this.min , actualValue: modelValue} };
    }
    return null;
  }
}