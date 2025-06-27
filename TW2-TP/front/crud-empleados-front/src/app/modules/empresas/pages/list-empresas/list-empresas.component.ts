import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { EmpresaService } from '../../../../api/services/empresa/empresa.service';
import { MessageService } from 'primeng/api';
import { Empresa } from '../../interfaces/empresa.interface';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TableEmpresaListComponent } from "../../components/table-empresa-list/table-empresa-list.component";

@Component({
  selector: 'app-list-empresas',
  imports: [ProgressSpinner, TableEmpresaListComponent],
  templateUrl: './list-empresas.component.html',
  styleUrl: './list-empresas.component.css',
  providers : [MessageService]
})
export class ListEmpresasComponent  implements OnInit,OnDestroy{


  empresaService = inject(EmpresaService)
  messageService = inject(MessageService)

  empresas = signal<Empresa[]>([]);

  spinner:boolean = true;

  constructor(){}

  ngOnInit(): void {
    this.listEmpresas();
  }

  ngOnDestroy(): void {
  }

  listEmpresas(){
    this.empresaService.listEmpresas().subscribe({
      next : (data)=>{
        console.log(data);
        
        this.empresas.set(data)
      },
      error : (err)=>{
        console.log(err);
      },
      complete : ()=>{
        this.spinner = false;
      }
    })
  }

}
