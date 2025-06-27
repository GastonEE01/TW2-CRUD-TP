import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Empresa } from '../../interfaces/empresa.interface';
import { EmpresaService } from '../../../../api/services/empresa/empresa.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { FormEmpresaComponent } from "../../components/form-empresa/form-empresa.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update-empresa',
  imports: [ProgressSpinner, ButtonModule, RouterLink, FormEmpresaComponent,ToastModule],
  providers: [MessageService],
  templateUrl: './update-empresa.component.html',
  styleUrl: './update-empresa.component.css'
})
export class UpdateEmpresaComponent implements OnInit, OnDestroy {

  empresaService = inject(EmpresaService)
  messageService: MessageService = inject(MessageService)

  activatedRouter = inject(ActivatedRoute)

  empresa: Empresa | undefined;

  spinner: boolean = true;


  constructor() { }

  ngOnInit(): void {
    this.getEmpresa(Number(this.activatedRouter.snapshot.paramMap.get('id')));
  }

  ngOnDestroy(): void {
  }


  getEmpresa(id: number) {
    this.empresaService.detailEmpresa(id).subscribe(
      {
        next: (data) => {
          this.empresa = data;
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

  updateEmpresa(empresa: Empresa) {
    this.empresaService.updateEmpresa(empresa).subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'La empresa fue actualizada con exito' });

      }
    })
  }

}
