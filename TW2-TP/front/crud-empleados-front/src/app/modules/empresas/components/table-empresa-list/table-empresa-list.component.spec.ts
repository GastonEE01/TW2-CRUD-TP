import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmpresaListComponent } from './table-empresa-list.component';

describe('TableEmpresaListComponent', () => {
  let component: TableEmpresaListComponent;
  let fixture: ComponentFixture<TableEmpresaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEmpresaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEmpresaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
