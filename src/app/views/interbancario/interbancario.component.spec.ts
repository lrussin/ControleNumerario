import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterbancarioComponent } from './interbancario.component';

describe('InterbancarioComponent', () => {
  let component: InterbancarioComponent;
  let fixture: ComponentFixture<InterbancarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterbancarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterbancarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
