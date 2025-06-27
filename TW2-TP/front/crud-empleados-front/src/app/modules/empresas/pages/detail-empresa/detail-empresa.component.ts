import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EmpresaService } from '../../../../api/services/empresa/empresa.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Empresa } from '../../interfaces/empresa.interface';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-detail-empresa',
  imports : [ProgressSpinner,ButtonModule,CardModule,RouterLink],
  providers : [MessageService],
  templateUrl: './detail-empresa.component.html',
  styleUrl: './detail-empresa.component.css'
})
export class DetailEmpresaComponent implements OnInit, OnDestroy {

  spinner:boolean = true;

  empresaService = inject(EmpresaService);
  messageService = inject(MessageService)

  router = inject(Router); 
  activatedRouter = inject(ActivatedRoute)

  empresa:Empresa | undefined
  id:number | null = null;

  constructor() { }

  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    this.getEmpresa(Number(this.activatedRouter.snapshot.paramMap.get('id')));
  }

  getEmpresa(id:number){
    console.log(id);
    
    this.empresaService.detailEmpresa(id).subscribe(
      {
        next : (data)=>{
          console.log(data);
          
          this.empresa = data;
        },
        error : (err)=> {
          console.log(err);
        },
        complete : ()=>{
          this.spinner = false;
        }
      }
    )
  }

}
