import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioAdministracionPage } from './inicio-administracion.page';

describe('InicioAdministracionPage', () => {
  let component: InicioAdministracionPage;
  let fixture: ComponentFixture<InicioAdministracionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioAdministracionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioAdministracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
