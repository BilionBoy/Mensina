import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarQuizzComponent } from './realizar-quizz.component';

describe('RealizarQuizzComponent', () => {
  let component: RealizarQuizzComponent;
  let fixture: ComponentFixture<RealizarQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarQuizzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
