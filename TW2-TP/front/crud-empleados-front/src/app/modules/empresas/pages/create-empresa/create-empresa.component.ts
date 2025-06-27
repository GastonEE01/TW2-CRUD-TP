import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormEmpresaComponent } from "../../components/form-empresa/form-empresa.component";
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Empresa } from '../../interfaces/empresa.interface';
import { EmpresaService } from '../../../../api/services/empresa/empresa.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-empresa',
  imports: [FormEmpresaComponent, ButtonModule, ProgressSpinnerModule, RouterLink, ToastModule],
  templateUrl: './create-empresa.component.html',
  styleUrl: './create-empresa.component.css',
  providers : [MessageService]
})
export class CreateEmpresaComponent {

  empresaService = inject(EmpresaService)
  messageService: MessageService = inject(MessageService)

  empresa: Empresa | undefined;

  spinner: boolean = true;


  constructor() { }

  ngOnInit(): void {
    this.spinner = false;
  }

  ngOnDestroy(): void {
  }

  createEmpresa(empresa: Empresa) {
    console.log(empresa);
    
    this.empresaService.createEmpresa(empresa).subscribe({
      next: (data) => {

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'La empresa fue creada con exito' });
      }
    })
  }

}
