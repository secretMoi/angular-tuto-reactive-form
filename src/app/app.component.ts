import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenNames= ['chris', 'anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [
          Validators.required,
          this.forbiddenNamesValidator.bind(this)
        ]),
        'email': new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmailsValidator
          ),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.hobbies.push(control);
  }

  // {[s: string]: boolean} clé->valeur
  forbiddenNamesValidator(control: FormControl): {[s: string]: boolean} {
    if(this.isInForbiddenNames(control.value)) {
      return {'nameIsForbidden': true};
    }

    return null;
  }

  forbiddenEmailsValidator(formControl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(((resolve, reject) => {
      setTimeout(() => {
        if(formControl.value === 'test@test.com') {
          resolve({'emailsIsForbidden': true});
        }
        else {
          resolve(null);
        }
      }, 1500)
    }));

    return promise;
  }

  isInForbiddenNames(name: string): boolean {
    return this.forbiddenNames.indexOf(name) !== -1;
  }

  get hobbies(): FormArray {
    return this.signupForm.get('hobbies') as FormArray;
  }
}
