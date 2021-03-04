import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActualizarTipoEstadoPage } from './actualizar-tipo-estado.page';

describe('ActualizarTipoEstadoPage', () => {
  let component: ActualizarTipoEstadoPage;
  let fixture: ComponentFixture<ActualizarTipoEstadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarTipoEstadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarTipoEstadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
