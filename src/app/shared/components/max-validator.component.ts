import { Directive, Input, forwardRef} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';


@Directive({
  selector: '[max][ngModel]',
  providers: [ {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator), multi: true } ]
})
export class MaxValidator implements Validator {

  @Input()
  public max: number;

  validate({value:modelValue}:AbstractControl): { [key: string]: any } {
    if (Number.parseFloat(modelValue) > this.max) {
      return { max: {maxValue: this.max, actualValue: modelValue }};
    }
    return null;
  }
}