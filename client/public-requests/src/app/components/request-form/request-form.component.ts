import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RequestFormComponent {
  @Output() addRequest = new EventEmitter<any>();
  requestForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      content: ['']
    });
  }

  submitForm() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }
    this.addRequest.emit(this.requestForm.value);
    this.requestForm.reset();
  }
}
