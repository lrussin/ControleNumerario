import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPaComponent } from './details-pa.component';

describe('DetailsPaComponent', () => {
  let component: DetailsPaComponent;
  let fixture: ComponentFixture<DetailsPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
