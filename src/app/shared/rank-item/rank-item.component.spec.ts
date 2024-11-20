import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankItemComponent } from './rank-item.component';

describe('RankItemComponent', () => {
  let component: RankItemComponent;
  let fixture: ComponentFixture<RankItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
