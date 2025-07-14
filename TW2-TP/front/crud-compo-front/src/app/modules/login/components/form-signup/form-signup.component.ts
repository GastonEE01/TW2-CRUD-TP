// src/app/modules/login/components/form-signup/form-signup.component.ts
import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-form-signup',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, PasswordModule],
  templateUrl: './form-signup.component.html',
  styleUrl: './form-signup.component.css'
})
export class FormSignupComponent {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  
  eventEmitterForm = output<Usuario>();

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(5)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  sendForm() {
    if (this.form.valid) {
      this.eventEmitterForm.emit(this.form.value);
    }
  }
}