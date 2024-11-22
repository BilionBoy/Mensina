import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankGlobalComponent } from './rank-global.component';

describe('RankGlobalComponent', () => {
  let component: RankGlobalComponent;
  let fixture: ComponentFixture<RankGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
