import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointServiceComponent } from './point-service.component';

describe('PointServiceComponent', () => {
  let component: PointServiceComponent;
  let fixture: ComponentFixture<PointServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
