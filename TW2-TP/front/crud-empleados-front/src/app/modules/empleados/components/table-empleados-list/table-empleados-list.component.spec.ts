import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmpleadosListComponent } from './table-empleados-list.component';

describe('TableEmpleadosListComponent', () => {
  let component: TableEmpleadosListComponent;
  let fixture: ComponentFixture<TableEmpleadosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEmpleadosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEmpleadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
