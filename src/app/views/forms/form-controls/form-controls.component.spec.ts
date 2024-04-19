import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { FormControlsComponent } from './form-controls.component';

describe('FormControlsComponent', () => {
  let component: FormControlsComponent;
  let fixture: ComponentFixture<FormControlsComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardModule, GridModule, FormsModule, FormModule, ButtonModule, RouterTestingModule, FormControlsComponent],
    providers: [IconSetService]
})
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(FormControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
