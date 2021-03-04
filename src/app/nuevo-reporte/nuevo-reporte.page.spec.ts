import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoReportePage } from './nuevo-reporte.page';

describe('NuevoReportePage', () => {
  let component: NuevoReportePage;
  let fixture: ComponentFixture<NuevoReportePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoReportePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoReportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
