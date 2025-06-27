import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { EmpleadoService } from '../../../../api/services/empleado/empleado.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TableEmpleadosListComponent } from "../../components/table-empleados-list/table-empleados-list.component";
import { Empleado } from '../../interfaces/empleado.interface';

@Component({
  selector: 'app-list-empleados',
  imports: [TableModule, ButtonModule, ToastModule, ProgressSpinner, TableEmpleadosListComponent],
  templateUrl: './list-empleados.component.html',
  styleUrl: './list-empleados.component.css',
})
export class ListEmpleadosComponent implements OnInit, OnDestroy {

  empleadoService = inject(EmpleadoService)

  empleados = signal<Empleado[]>([]);

  spinner = true;

  ngOnInit(): void {
    this.listEmpleados();
  }

  ngOnDestroy(): void {
  }

  listEmpleados() {
    this.empleadoService.listEmpleados()
      .subscribe(
        {
          next: (data) => {
            this.empleados.set(data);
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

}
