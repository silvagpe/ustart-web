import { FormGroup } from "@angular/forms";

export class AssignFormHelper {

    public static assignFormValues<T>(form: FormGroup, object: T): void {
        if (form) {
            for (const i in form.controls) {                
                form.controls[i].markAsDirty();
                form.controls[i].updateValueAndValidity();

                //Caso exista FormGroup dentro de um form (componentes internos)
                if (form.controls[i] instanceof FormGroup) {
                    this.assignFormValues<T>(form.controls[i] as FormGroup, object);
                }
            }
            if (form.valid) {
                Object.assign(object, form.value);
            }
        }
    }
}

