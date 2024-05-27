import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParameterComponent } from './modal-parameter.component';

describe('ModalParameterComponent', () => {
  let component: ModalParameterComponent;
  let fixture: ComponentFixture<ModalParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalParameterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
