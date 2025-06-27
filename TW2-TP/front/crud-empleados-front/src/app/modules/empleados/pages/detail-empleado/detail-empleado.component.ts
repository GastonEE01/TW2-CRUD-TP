import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../../api/services/empleado/empleado.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Empleado } from '../../interfaces/empleado.interface';

@Component({
  selector: 'app-detail-empleado',
  imports: [ButtonModule,RouterLink,CardModule],
  templateUrl: './detail-empleado.component.html',
  styleUrl: './detail-empleado.component.css'
})
export class DetailEmpleadoComponent implements OnInit,OnDestroy{


  empleadoService = inject(EmpleadoService)

  activatedRouter = inject(ActivatedRoute)

  id:number | null = null;

  empleado:Empleado | undefined;

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'))
    this.getEmpleado();
  }

  ngOnDestroy(): void {
  }

  getEmpleado(){
    this.empleadoService.getEmpleado(this.id).subscribe(
      {
        next : (data)=>{
          this.empleado = data;
          console.log(data);
          
        },
        error : (err)=>{

        },
        complete : ()=>{

        }
      }
    )
  }

}
