import { Component, inject, OnDestroy, OnInit, InputSignal, input, signal, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
import { Empresa } from '../../interfaces/empresa.interface';
import { EmpleadoService } from '../../../../api/services/empleado/empleado.service';
import { Empleado } from '../../../empleados/interfaces/empleado.interface';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-empresa',
  imports: [ReactiveFormsModule,InputTextModule,MultiSelectModule,ButtonModule],
  templateUrl: './form-empresa.component.html',
  styleUrl: './form-empresa.component.css'
})
export class FormEmpresaComponent implements OnInit, OnDestroy {


  private fb = inject(FormBuilder);
  form!: FormGroup;

  empleadoService: EmpleadoService = inject(EmpleadoService)

  empresa: InputSignal<Empresa | undefined> = input<Empresa>();
  empleados = signal<Empleado[]>([]);

  eventEmitterForm = output<Empresa>();

  title = signal<string>('Crear Empresa')

  constructor() {

  }

  ngOnInit(): void {
    if(this.empresa()){
      this.title.set('Actualizar empresa')
    }

    this.form = this.fb.group({
      id: [this.empresa()?.id, []],
      nombre: [this.empresa()?.nombre.trim(), [Validators.required]],
      empleados: [this.empresa()?.empleados?.map((element) => { return element.id }), [Validators.required]],
    })

    this.getEmpleados()
  }

  getEmpleados() {
    this.empleadoService.listEmpleados()
      .subscribe(
        {
          next: (data) => {
            console.log(data);
            
            this.empleados.set(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
          }
        }
      )
  }

  ngOnDestroy(): void {

  }

  sendForm(){
    if(this.form.valid){
      const empresa:Empresa = {
        id : this.form.value.id,
        nombre : this.form.value.nombre,
        empleados : this.form.value.empleados,
      }

      this.eventEmitterForm.emit(empresa)
    }else{
      console.log("Formulario invalido");
    }
  }


}
