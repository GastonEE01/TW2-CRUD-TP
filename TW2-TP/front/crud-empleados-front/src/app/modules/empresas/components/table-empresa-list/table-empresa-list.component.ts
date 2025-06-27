import { Component, inject, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Empresa } from '../../interfaces/empresa.interface';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../../api/services/empresa/empresa.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table-empresa-list',
  imports: [TableModule,ButtonModule],
  providers : [MessageService],
  templateUrl: './table-empresa-list.component.html',
  styleUrl: './table-empresa-list.component.css'
})
export class TableEmpresaListComponent {

  empresas = input.required<Empresa[]>();

  empresaService = inject(EmpresaService)
  messageService = inject(MessageService)
  router = inject(Router)

  eventEmitterTable = output<boolean>();

  createEmpresa() {
    this.router.navigate(['/empresas/create-empresa'])
  }

  updateEmpresa(empresa: Empresa) {
    this.router.navigate(['/empresas/update-empresa', empresa.id])
  }

  detailEmpresa(empresa: Empresa) {
    this.router.navigate(['/empresas/detail-empresa', empresa.id])
  }

  eliminarEmpresa(empresa: Empresa) {
    this.empresaService.eliminarEmpresa(empresa)
      .subscribe(
        {
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'La empresa fue eliminada' });
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
