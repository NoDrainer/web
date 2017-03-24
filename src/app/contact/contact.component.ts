import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'nd-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  feedback: string;
  isLoading = false;

  constructor(private _fb: FormBuilder, private http: Http) { }

  ngOnInit() {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  contact() {
    this.feedback = '';
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.http.post(environment.contactEndpoint, this.contactForm.value)
        .subscribe(x => {
          if (x.status === 200) {
            this.feedback = 'Your message is on its way';
            this.contactForm.reset();
          } else {
            this.feedback = 'Something went wrong';
          }
          this.isLoading = false;
        }, (err) => {
          console.log(err);
          this.isLoading = true;
        });
    } else {
      this.feedback = 'Please provide all required information';
    }
  }
}
