import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'nd-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  contact() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }
}
