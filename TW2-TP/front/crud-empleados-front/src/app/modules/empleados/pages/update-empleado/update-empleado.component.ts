import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  selector: 'app-update-empleado',
  imports: [ProgressSpinner, ButtonModule, RouterLink, ReactiveFormsModule, InputTextModule, SelectModule, Toast, FormEmpleadoComponent],
  providers: [MessageService],
  templateUrl: './update-empleado.component.html',
  styleUrl: './update-empleado.component.css'
})
export class UpdateEmpleadoComponent {

  spinner = true;

  messageService = inject(MessageService)

  empleadoService = inject(EmpleadoService)

  activatedRouter = inject(ActivatedRoute)

  id: number | null = null;

  empleado: Empleado | undefined;

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'))
    this.getEmpleado()
  }

  getEmpleado() {
    this.empleadoService.getEmpleado(this.id).subscribe(
      {
        next: (data) => {
          this.empleado = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.spinner = false;
        }
      }
    )
  }

  updateEmpleado(empleado: Empleado) {
    this.empleadoService.updateEmpleado(empleado).subscribe(
      {
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Empleado actualizado con exito' });
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
