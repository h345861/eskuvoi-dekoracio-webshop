import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VelemenyekComponent } from './velemenyek.component';

describe('VelemenyekComponent', () => {
  let component: VelemenyekComponent;
  let fixture: ComponentFixture<VelemenyekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VelemenyekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VelemenyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
