import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankPessoalComponent } from './rank-pessoal.component';

describe('RankPessoalComponent', () => {
  let component: RankPessoalComponent;
  let fixture: ComponentFixture<RankPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankPessoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
