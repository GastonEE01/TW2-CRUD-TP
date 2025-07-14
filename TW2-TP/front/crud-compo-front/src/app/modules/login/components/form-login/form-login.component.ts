// src/app/modules/login/components/form-login/form-login.component.ts
import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, PasswordModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  
  eventEmitterForm = output<{email: string, contrasenia: string}>();

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  sendForm() {
    if (this.form.valid) {
      this.eventEmitterForm.emit(this.form.value);
    }
  }
}