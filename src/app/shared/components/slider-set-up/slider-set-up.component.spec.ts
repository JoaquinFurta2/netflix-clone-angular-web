import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSetUpComponent } from './slider-set-up.component';

describe('SliderSetUpComponent', () => {
  let component: SliderSetUpComponent;
  let fixture: ComponentFixture<SliderSetUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderSetUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
