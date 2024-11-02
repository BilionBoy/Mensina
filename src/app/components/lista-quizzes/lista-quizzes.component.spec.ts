import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaQuizzesComponent } from './lista-quizzes.component';

describe('ListaQuizzesComponent', () => {
  let component: ListaQuizzesComponent;
  let fixture: ComponentFixture<ListaQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaQuizzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
