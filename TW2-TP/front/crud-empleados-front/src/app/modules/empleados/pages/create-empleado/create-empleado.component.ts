import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { FormEmpleadoComponent } from "../../components/form-empleado/form-empleado.component";
import { Empleado } from '../../interfaces/empleado.interface';

@Component({
  selector: 'app-create-empleado',
  imports: [ProgressSpinner, ButtonModule, RouterLink, ReactiveFormsModule, InputTextModule, SelectModule, Toast, FormEmpleadoComponent],
  providers: [MessageService],
  templateUrl: './create-empleado.component.html',
  styleUrl: './create-empleado.component.css',
})
export class CreateEmpleadoComponent implements OnInit, OnDestroy {

  spinner = true;

  messageService = inject(MessageService)

  empleadoService = inject(EmpleadoService)

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.spinner = false;
  }

  createEmpleado(empleado: Empleado) {
    this.empleadoService.createEmpleado(empleado).subscribe(
      {
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Empleado creado con exito' });
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {

        }
      }
    )

  }

}
