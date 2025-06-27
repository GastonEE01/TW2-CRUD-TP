import { Component, inject, input, Input, output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EmpleadoService } from '../../../../api/services/empleado/empleado.service';
import { Empleado } from '../../interfaces/empleado.interface';

@Component({
  selector: 'app-table-empleados-list',
  imports: [TableModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './table-empleados-list.component.html',
  styleUrl: './table-empleados-list.component.css'
})
export class TableEmpleadosListComponent {

  // @Input() empleados: Empleado[] = [];

  empleados = input<Empleado[]>([]);

  empleadoService = inject(EmpleadoService)

  messageService = inject(MessageService)

  router = inject(Router)

  eventEmitterTable = output<boolean>();

  createEmpleado() {
    this.router.navigate(['/empleados/create-empleado'])
  }

  updateEmpleado(empleado: Empleado) {
    this.router.navigate(['/empleados/update-empleado', empleado.id])
  }

  detailEmpleado(empleado: Empleado) {
    this.router.navigate(['/empleados/detail-empleado', empleado.id])
  }

  eliminarEmpleado(empleado: Empleado) {
    this.empleadoService.eliminarEmpleado(empleado)
      .subscribe(
        {
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'El empleado fue eliminado' });
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.eventEmitterTable.emit(true)
          }
        }
      )
  }

}
