import { Component, inject, input, InputSignal, OnDestroy, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { EmpleadoService } from '../../../../api/services/empleado/empleado.service';
import { EmpresaService } from '../../../../api/services/empresa/empresa.service';
import { Empleado } from '../../interfaces/empleado.interface';

@Component({
  selector: 'app-form-empleado',
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, SelectModule],
  providers: [MessageService],
  templateUrl: './form-empleado.component.html',
  styleUrl: './form-empleado.component.css'
})
export class FormEmpleadoComponent implements OnInit, OnDestroy {


  form!: FormGroup;

  private fb = inject(FormBuilder)
  messageService = inject(MessageService)

  empleadoService = inject(EmpleadoService)
  empresaService = inject(EmpresaService)

  empresas: any = [];

  empleado: InputSignal<Empleado | undefined> = input<Empleado>();
  labelSubmitButton: InputSignal<string> = input.required<string>();

  eventEmitterForm = output<Empleado>();

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.listEmpresas()

    this.form = this.fb.group({
      id: [this.empleado()?.id, []],
      nombre: [this.empleado()?.nombre.trim(), [Validators.required]],
      empresa: [this.empleado()?.id_empresa, [Validators.required]]
    })
  }

  listEmpresas() {
    console.log('Llamando a listEmpresas...');
    this.empresaService.listEmpresas().subscribe(
      {
        next: (data) => {
          console.log('Empresas recibidas:', data);
          this.empresas = data;
        },
        error: (err) => {
          console.error('Error al obtener empresas:', err);
        },
        complete: () => {
          console.log('Completado listEmpresas');
        }
      }
    )
  }


  sendForm() {

    if (this.form.valid) {
      const empleado: Empleado = {
        id: this.form.value.id,
        nombre: this.form.value.nombre,
        id_empresa: this.form.value.empresa
      }
      this.eventEmitterForm.emit(empleado);
    } else {
      this.messageService.add({ severity: 'success', summary: '????', detail: '¿Qué haces flaco?' });
    }

  }

}
