import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  NGX_ERRORS_MATERIAL_DECLARATIONS,
  provideNgxErrorsConfig,
} from '@ngspot/ngx-errors-material';
import { Angulartics2 } from 'angulartics2';
import { catchError, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';

@Component({
  selector: 'nd-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NGX_ERRORS_MATERIAL_DECLARATIONS,
  ],
  providers: [
    provideNgxErrorsConfig({
      showErrorsWhenInput: 'touched',
    }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: <MatFormFieldDefaultOptions>{ appearance: 'fill' },
    },
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private _fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private angulartics2 = inject(Angulartics2);

  contactForm = this._fb.group({
    name: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  feedback = '';
  isLoading = false;

  contact() {
    this.feedback = '';
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.http
        .post(environment.contactEndpoint, this.contactForm.value)
        .pipe(
          tap(() => {
            this.feedback = 'Your message is on its way';
            this.contactForm.reset();
            this.angulartics2.eventTrack.next({ action: 'contact' });
            this.isLoading = false;
          }),
          catchError((err) => {
            this.feedback = 'Something went wrong';
            this.isLoading = false;
            console.log(err);
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.feedback = 'Please provide all required information';
    }
  }
}
