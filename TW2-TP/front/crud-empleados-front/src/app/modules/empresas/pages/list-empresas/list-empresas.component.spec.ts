import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmpresasComponent } from './list-empresas.component';

describe('ListEmpresasComponent', () => {
  let component: ListEmpresasComponent;
  let fixture: ComponentFixture<ListEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEmpresasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
