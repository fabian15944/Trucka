import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialReportesPage } from './historial-reportes.page';

describe('HistorialReportesPage', () => {
  let component: HistorialReportesPage;
  let fixture: ComponentFixture<HistorialReportesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialReportesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
