import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevainspeccionPage } from './nuevainspeccion.page';

describe('NuevainspeccionPage', () => {
  let component: NuevainspeccionPage;
  let fixture: ComponentFixture<NuevainspeccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevainspeccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevainspeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
