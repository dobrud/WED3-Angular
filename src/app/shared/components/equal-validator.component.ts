import { Directive, Input, forwardRef} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';


@Directive({
  selector: '[equalTo][ngModel]',
  providers: [ {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualToValidator), multi: true } ]
})
export class EqualToValidator implements Validator {

  @Input()
  public equalTo: any;

  validate({value:modelValue}:AbstractControl): { [key: string]: any } {
    if (modelValue != this.equalTo) {
      return { equalTo: {expectedValue: this.equalTo }};
    }
    return null;
  }
}