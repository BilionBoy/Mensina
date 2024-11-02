import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarDadosComponent } from './atualizar-dados.component';

describe('AtualizarDadosComponent', () => {
  let component: AtualizarDadosComponent;
  let fixture: ComponentFixture<AtualizarDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
