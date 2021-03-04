import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialTractosPage } from './historial-tractos.page';

describe('HistorialTractosPage', () => {
  let component: HistorialTractosPage;
  let fixture: ComponentFixture<HistorialTractosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialTractosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialTractosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
